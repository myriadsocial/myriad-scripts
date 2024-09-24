import { MongoClient } from 'mongodb';
import { Keyring } from '@polkadot/keyring';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { airdropAddresses } from './airdropList';
import { writeFile } from 'fs/promises';

async function initiateApiPromise(nodeUrl: string): Promise<ApiPromise> {
  console.log('Initiating ApiPromise...');
  const wsProvider = new WsProvider(nodeUrl);
  return await ApiPromise.create({ provider: wsProvider });
}

async function getEligigbleAddresses(): Promise<
  { address: string; balance: string }[]
> {
  console.log('Retrieving eligible addresses...');
  return [...airdropAddresses];
}

async function sendAirdrop(
  api: ApiPromise,
  eligibleAddresses: { address: string; balance: string }[],
) {
  const sudoSeed =
    'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice'; // Alice's seed in dev mode
  const keyring = new Keyring({ type: 'sr25519' });
  const sudoAccount = keyring.addFromUri(sudoSeed);
  console.log('Create Sudo account...');
  const failedAirdrops: { address: string; balance: string }[] = [];

  for (let dest of eligibleAddresses) {
    console.log(`Processing Airdrop for ${dest.address}.`);
    const transferExtrinsic = api.tx.balances.transferKeepAlive(
      dest.address,
      dest.balance,
    );

    try {
      const hash = await transferExtrinsic.signAndSend(sudoAccount, {
        nonce: -1,
      });
      console.log(
        `Airdropped to ${dest.address}. Transaction hash: ${hash.toHex()}`,
      );

      // TODO: FIX ME cannot connect to DB and blockchain at the same time.
      // Either that or execute from inside server
      // await storeAirdroppedAddresses(dest);
    } catch (error) {
      console.error(`Error airdropping to ${dest.address}:`, error);

      failedAirdrops.push(dest);
    }
  }

  return failedAirdrops;
}

const DB_URL = 'mongodb://localhost:27017';

async function initiateMongoConnection() {
  const client = new MongoClient(DB_URL);
  await client.connect();
  return client.db('myriad');
}

async function storeAirdroppedAddresses(addresses: {
  address: string;
  balance: string;
}) {
  const db = await initiateMongoConnection();
  const collection = db.collection('airdroppedAddressesPaseo');
  await collection.insertOne(addresses);
}

async function airdropToAccounts() {
  const eligibleAddresses = await getEligigbleAddresses();

  console.log('Eligible addresses for airdrop:', eligibleAddresses);

  const nodeUrl = 'wss://ws-rpc.paseo.myriad.social/'; // Rococo Devnet
  const api = await initiateApiPromise(nodeUrl);

  const failedAirdrops = await sendAirdrop(api, eligibleAddresses);
  await api.disconnect();

  await writeFile(
    'failed_airdrops.json',
    JSON.stringify(failedAirdrops, null, 2),
    'utf8',
  );
}

airdropToAccounts()
  .then(() => {
    console.log('Airdrop process completed!');
  })
  .catch((error) => {
    console.error('Error during the airdrop process:', error);
  });
