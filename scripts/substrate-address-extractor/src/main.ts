import { ApiPromise, WsProvider } from '@polkadot/api';
import * as fs from 'fs';

interface UniqueAddressesData {
  numberOfUniqueAddresses: number;
  uniqueAddresses: string[];
}

async function fetchAllAddresses(
  nodeUrl: string,
): Promise<UniqueAddressesData> {
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

      // New address!
      if (!addressSet.has(address)) {
        console.log('New unique address found: ', address);
        addressSet.add(address);
      }

      if (
        extrinsic.method.section === 'balances' &&
        extrinsic.method.method === 'transfer'
      ) {
        const destAddress = extrinsic.args[0].toString();

        // New address!
        if (!addressSet.has(destAddress)) {
          console.log('New unique address found: ', destAddress);
          addressSet.add(destAddress);
        }
      }
    }
  }

  provider.disconnect();

  const uniqueAddresses = [...addressSet];
  return {
    numberOfUniqueAddresses: uniqueAddresses.length,
    uniqueAddresses: uniqueAddresses,
  };
}

const nodeUrl = 'wss://ws-rpc.testnet.myriad.social';
fetchAllAddresses(nodeUrl)
  .then((data) => {
    const fileContent = `
interface UniqueAddressesData {
    numberOfUniqueAddresses: number;
    uniqueAddresses: string[];
}

const uniqueAddressesData: UniqueAddressesData = ${JSON.stringify(data, null, 2)};
`;

    fs.writeFileSync('uniqueAddresses.ts', fileContent);
    console.log('Data saved to uniqueAddresses.ts');
  })
  .catch((error) => {
    console.error('Error fetching addresses:', error);
  });
