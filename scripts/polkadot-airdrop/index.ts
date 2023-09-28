import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

async function initiateApiPromise(nodeUrl: string): Promise<ApiPromise> {
    const wsProvider = new WsProvider(nodeUrl);
    return await ApiPromise.create({ provider: wsProvider });
}

async function getEligigbleAddresses(api: ApiPromise, accounts: string[]): Promise<{ address: string, balance: string }[]> {
    const eligibleAddresses: { address: string, balance: string }[] = [];

    for (let address of accounts) {
        const { nonce, data: balance } = (await api.query.system.account(address)) as any;
        if (balance.free.gt(api.consts.balances.existentialDeposit)) {
            eligibleAddresses.push({
                address,
                balance: balance.free.toString()
            });
        }
    }

    return eligibleAddresses;
}

async function sendAirdrop(api: ApiPromise, eligibleAddresses: { address: string, balance: string }[]) {
    const sudoSeed = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice'; // Alice's seed in dev mode
    const keyring = new Keyring({ type: 'sr25519' });
    const sudoAccount = keyring.addFromUri(sudoSeed);

    for (let dest of eligibleAddresses) {
        const transferExtrinsic = api.tx.balances.transfer(dest.address, dest.balance);

        try {
            const hash = await transferExtrinsic.signAndSend(sudoAccount, { nonce: -1 });
            console.log(`Airdropped to ${dest.address}. Transaction hash: ${hash.toHex()}`);
        } catch (error) {
            console.error(`Error airdropping to ${dest.address}:`, error);
        }
    }
}

// async function initiateMongoConnection() {
//     const mongoUrl = 'mongodb://yourMongoDbUrl:port';
//     const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

//     await client.connect();
//     return client.db('yourDbName');
// }

// async function getAccountsFromMongoDB(): Promise<string[]> {
//     const db = await initiateMongoConnection();
//     const collection = db.collection('yourCollectionName');
//     const accounts = await collection.find({}).toArray();
//     return accounts.map(acc => acc.address);
// }

// async function storeAirdroppedAddresses(addresses: { address: string, balance: string }[]) {
//     const db = await initiateMongoConnection();
//     const collection = db.collection('airdroppedAddresses');
//     await collection.insertMany(addresses);
// }

async function airdropToAccounts() {
    const nodeUrl = 'ws://localhost:9944'; // Octopus Appchain
    const api = await initiateApiPromise(nodeUrl);

    // Sample list of accounts you'd like to check.
    // In reality, you might need a more complex approach to fetch all accounts.
    // TODO: Get from MongoDB Offchain DB the list of addresses registered for available airdrop
    const accounts = ['5HmXRcRc656J9QDDPnvC186E1rav4ydPS3LJ9vXy5QZTxtLK']; 

    const eligibleAddresses = await getEligigbleAddresses(api, accounts);
    await api.disconnect();

    console.log("Eligible addresses for airdrop:", eligibleAddresses);

    const nodeUrl2 = 'ws://localhost:9944'; // Rococo Testnet
    const api2 = await initiateApiPromise(nodeUrl2);

    await sendAirdrop(api2, eligibleAddresses);
    await api2.disconnect();

    // TODO: Create a collection of addresses of assets airdropped from this migration script
}

airdropToAccounts()
    .then(() => {
        console.log('Airdrop process completed!');
    })
    .catch((error) => {
        console.error('Error during the airdrop process:', error);
    });
