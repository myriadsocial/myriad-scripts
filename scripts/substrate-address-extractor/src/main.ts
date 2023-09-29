import { ApiPromise, WsProvider } from '@polkadot/api';

async function fetchAllAddresses(nodeUrl: string): Promise<string[]> {
    const provider = new WsProvider(nodeUrl);
    const api = await ApiPromise.create({ provider });

    const head = await api.rpc.chain.getHeader();
    const latestBlockNumber = head.number.toNumber();

    const addressSet: Set<string> = new Set();

    for (let blockNumber = 0; blockNumber <= latestBlockNumber; blockNumber++) {
        const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
        const signedBlock = await api.rpc.chain.getBlock(blockHash);

        for (const extrinsic of signedBlock.block.extrinsics) {
            const address = extrinsic.signer.toString();
            console.log(address, latestBlockNumber);
            addressSet.add(address);

            // Assuming the extrinsic is a balance transfer, record the destination address
            if (extrinsic.method.section === 'balances' && extrinsic.method.method === 'transfer') {
                const destAddress = extrinsic.args[0].toString();
                addressSet.add(destAddress);
            }
        }
    }

    provider.disconnect();

    return [...addressSet];
}

const nodeUrl = 'wss://ws-rpc.testnet.myriad.social';
fetchAllAddresses(nodeUrl).then(addresses => {
    console.log('Total unique addresses:', addresses.length);
    console.log('Addresses:', addresses);
}).catch(error => {
    console.error('Error fetching addresses:', error);
});
