import { MongoClient } from 'mongodb';
import { writeFile } from 'fs/promises';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToU8a } from '@polkadot/util';
import { encodeAddress } from '@polkadot/util-crypto';

function hexToSubstrateAddress(hex: string, ss58Format?: number): string {
  const u8a = hexToU8a(hex);
  return encodeAddress(u8a, ss58Format);
}

async function fetchAllMyriadAddresses(
  dbUrl: string,
): Promise<{ address: string; networkId: string }[]> {
  const client = new MongoClient(dbUrl);
  await client.connect();
  const db = client.db('myriad');
  const walletsCollection = db.collection('wallets');

  const cursor = walletsCollection.find(
    { networkId: 'myriad' },
    { projection: { _id: 1, networkId: 1 } },
  );

  const addresses: { address: string; networkId: string }[] = [];

  console.log('Getting balance for MYRIA addresses...');

  await cursor.forEach((doc) => {
    addresses.push({
      address: hexToSubstrateAddress(doc._id.toString()),
      networkId: doc.networkId,
    });
  });

  await client.close();

  console.log(`We found a couple of addresses: ${addresses.length}`);

  return addresses;
}

async function initiateApiPromise(nodeUrl: string): Promise<ApiPromise> {
  const wsProvider = new WsProvider(nodeUrl);
  return await ApiPromise.create({ provider: wsProvider });
}

async function getEligibleAddresses(
  dbUrl: string,
  nodeUrl: string,
): Promise<{ address: string; balance: string; networkId: string }[]> {
  const api = await initiateApiPromise(nodeUrl);
  const addresses = await fetchAllMyriadAddresses(dbUrl);
  const eligibleAddresses: {
    address: string;
    balance: string;
    networkId: string;
  }[] = [];

  console.log('Getting balance for eligible addresses...');

  for (let item of addresses) {
    const { nonce, data: balance } = (await api.query.system.account(
      item.address,
    )) as any;
    console.log(item.address);
    if (balance.free.gt(api.consts.balances.existentialDeposit)) {
      eligibleAddresses.push({
        address: item.address,
        balance: balance.free.toString(),
        networkId: item.networkId,
      });
    }
  }

  await writeFile(
    'myriad_addresses.json',
    JSON.stringify(eligibleAddresses, null, 2),
    'utf8',
  );

  return eligibleAddresses;
}

// Get command-line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: pnpm start <MONGO_URL> <WSS_URL>');
  process.exit(1);
}

const [dbUrl, nodeUrl] = args;

getEligibleAddresses(dbUrl, nodeUrl)
  .then((addresses) => {
    console.log('Total unique addresses:', addresses.length);
    console.log('Addresses:', addresses);
  })
  .catch((error) => {
    console.error('Error fetching addresses:', error);
  });
