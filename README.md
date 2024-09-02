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
   chmod +x run_migration_airdrop.sh
   ```

2. Run the script:
   ```sh
   ./run_migration_airdrop.sh
   ```

This script will automatically perform the following steps:
- MongoDB Snapshot and Migration
- Myriad Address Extraction
- Airdrop Process

### 3. Manual Process (if needed)

If you prefer to run the steps manually or need to troubleshoot, follow these steps:

#### MongoDB Snapshot and Migration
```sh
cd scripts/mongo-migration
pnpm install
pnpm run setup
pnpm start
pnpm run teardown
cd ../..
```

#### Myriad Address Extraction
```sh
cd scripts/myriad-address-snapshotter
pnpm install
pnpm start
cd ../..
```

#### Airdrop Process
```sh
cd scripts/rococo-airdrop
pnpm install
# Update airdropList.ts with extracted addresses from myriad_addresses.json
pnpm start
cd ../..
```

## 📜 Key Files Explanation
- `run_migration_airdrop.sh`: Automation script for the entire process
- `scripts/mongo-migration/`: Scripts for MongoDB snapshot and migration
- `scripts/myriad-address-snapshotter/`: Scripts for extracting Myriad addresses
- `scripts/rococo-airdrop/`: Scripts for performing the airdrop

## ⚠️ Notes
- Always ensure you have the necessary backups before performing migrations in a production environment.
- Test the process on a testnet before running it on a mainnet.
- Keep your seed phrases and private keys secure and never share them.

## 🔧 Troubleshooting
If you encounter issues:
1. Ensure all dependencies are correctly installed.
2. Verify network permissions and access.
3. Check that MongoDB and blockchain node URLs are correct.
4. Review console output for specific error messages.

For persistent problems, please open an issue in this repository with a detailed description.

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
[MIT](https://choosealicense.com/licenses/mit/)