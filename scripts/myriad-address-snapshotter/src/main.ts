import { MongoClient } from 'mongodb';
import { writeFile } from 'fs/promises';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToU8a } from '@polkadot/util';
import { encodeAddress } from '@polkadot/util-crypto';

function hexToSubstrateAddress(hex: string, ss58Format?: number): string {
    // Convert hex string to Uint8Array
    const u8a = hexToU8a(hex);

    // Encode to SS58 format
    return encodeAddress(u8a, ss58Format);
}

const DB_URL = 'mongodb://localhost:27017';

async function fetchAllMyriadAddresses(): Promise<{ address: string, networkId: string }[]> {
    const client = new MongoClient(DB_URL);
    await client.connect();
    const db = client.db('myriad');
    const walletsCollection = db.collection('wallets');

    const cursor = walletsCollection.find({ networkId: 'myriad' }, { projection: { _id: 1, networkId: 1 } });

    const addresses: { address: string, networkId: string }[] = [];

    console.log("Getting balance for MYRIA addresses...");

    await cursor.forEach(doc => {
        addresses.push({
            address: hexToSubstrateAddress(doc._id.toString()),
            networkId: doc.networkId
        });
    });

    await client.close();

    console.log(`We found a couple of addressess: ${addresses.length}`);

    return addresses;
}

async function initiateApiPromise(nodeUrl: string): Promise<ApiPromise> {
    const wsProvider = new WsProvider(nodeUrl);
    return await ApiPromise.create({ provider: wsProvider });
}

async function getEligibleAddresses(nodeUrl: string): Promise<{ address: string, balance: string, networkId: string }[]> {
    const api = await initiateApiPromise(nodeUrl);
    const addresses = await fetchAllMyriadAddresses();
    const eligibleAddresses: { address: string, balance: string, networkId: string }[] = [];

    console.log("Getting balance for eligible addressess...");

    for (let item of addresses) {
        const { nonce, data: balance } = (await api.query.system.account(item.address)) as any;
        if (balance.free.gt(api.consts.balances.existentialDeposit)) {
            eligibleAddresses.push({
                address: item.address,
                balance: balance.free.toString(),
                networkId: item.networkId,
            });
        }
    }

    await writeFile('myriad_addresses.json', JSON.stringify(eligibleAddresses, null, 2), 'utf8');

    return eligibleAddresses;
}

const nodeUrl = 'wss://ws-rpc.testnet.myriad.social';
getEligibleAddresses(nodeUrl).then(addresses => {
    console.log('Total unique addresses:', addresses.length);
    console.log('Addresses:', addresses);
}).catch(error => {
    console.error('Error fetching addresses:', error);
});
