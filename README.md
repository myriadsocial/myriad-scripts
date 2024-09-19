# Myriad Scripts Repository

This repository hosts two essential scripts for MongoDB data migration and Polkadot asset airdrops. Refer to each project's respective directory for detailed instructions.

Directory structure:

```
├── .gitignore
├── directory_structure.txt
├── README.md
├── scripts
│   ├── substrate-address-extractor
│   │   ├── src
│   │   │   └── main.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── mongo-migration
│   │   ├── setup.ts
│   │   ├── package.json
│   │   ├── docker-compose.yml
│   │   ├── README.md
│   │   ├── tsconfig.json
│   │   └── index.ts
│   ├── myriad-address-snapshotter
│   │   ├── src
│   │   │   └── main.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── myriad_addresses.json
│   ├── extracted.txt
│   └── rococo-airdrop
│       ├── airdropList.ts
│       ├── package.json
│       ├── docker-compose.yml
│       ├── README.md
│       ├── tsconfig.json
│       ├── failed_airdrops.json
│       ├── index.ts
│       └── logs
│           └── devnet-airdrop-execution.logs.txt
├── .git
└── raw.txt
```

The scripts are for MongoDB data migration, Myriad address extraction, and Polkadot asset airdrops. The process includes taking a snapshot of the current MongoDB database, extracting Myriad addresses, and performing an airdrop on a new chain.

## 📋 Prerequisites
- Docker & Docker Compose
- Node.js
- [pnpm](https://pnpm.io/)
- Git

## 🚀 Getting Started

### 1. Clone & Navigate

```sh
git clone git@github.com:myriadsocial/myriad-scripts.git
cd myriad-scripts
```

### 2. Run the Automation Script

We've provided a shell script that automates the entire process. To use it:

1. Make the script executable:
   ```sh
   chmod +x run.sh
   ```

2. Run the script:
   ```sh
   ./run.sh
   ```

This script will prompt you for the following information:
- MongoDB URL (default: mongodb://localhost:27017)
- WebSocket URL for Myriad network (default: wss://ws-rpc.testnet.myriad.social)
- WebSocket URL for Rococo network (default: wss://ws-rpc.devnet.myriad.social/websocket/)

The script will automatically perform the following steps:
1. Myriad Address Snapshotter
2. MongoDB Migration
3. Substrate Address Extractor
4. Rococo Airdrop

### 3. Manual Process (if needed)

If you prefer to run the steps manually or need to troubleshoot, follow these steps:

#### 1. Myriad Address Snapshotter
```sh
cd scripts/myriad-address-snapshotter
pnpm install
pnpm start
cd ../..
```

#### 2. Substrate Address Extractor
```sh
cd scripts/substrate-address-extractor
pnpm install
pnpm start
cd ../..
```

#### 3. Rococo Airdrop
```sh
cd scripts/rococo-airdrop
pnpm install
pnpm start
cd ../..
```

## 📜 Key Files Explanation
- `run.sh`: Automation script for the entire process
- `scripts/myriad-address-snapshotter/`: Scripts for extracting Myriad addresses
- `scripts/substrate-address-extractor/`: Scripts for extracting Substrate addresses
- `scripts/rococo-airdrop/`: Scripts for performing the airdrop on Rococo network

## ⚠️ Notes
- Always ensure you have the necessary backups before performing migrations in a production environment.
- Test the process on a testnet before running it on a mainnet.
- Keep your seed phrases and private keys secure and never share them.

## 🔧 Troubleshooting
If you encounter issues:
1. Ensure all dependencies are correctly installed.
2. Verify network permissions and access.
3. Check that MongoDB and WebSocket URLs are correct in all relevant files.
4. Review console output for specific error messages.

For persistent problems, please open an issue in this repository with a detailed description.

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
[MIT](https://choosealicense.com/licenses/mit/)