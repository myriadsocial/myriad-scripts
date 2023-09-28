# Myriad Scripts Repository

This repository hosts two essential scripts for MongoDB data migration and Polkadot asset airdrops. Refer to each project's respective directory for detailed instructions.

## MongoDB Data Migration Tool

**Description:**  
Facilitates data migration between MongoDB instances and ensures data consistency.

**Usage:**  
- Clone the repository, navigate to the `mongo-migration` directory.
- Install dependencies: `pnpm install`
- Setup and start MongoDB: `pnpm run setup`
- Migrate and validate: `pnpm start`
- Teardown (optional): `pnpm run teardown`

## Polkadot Airdrop Script

**Description:**  
Connects to Polkadot.js API and performs an airdrop using MongoDB snapshot data.

**Setup:**  
1. Clone the repository, navigate to the `polkadot-airdrop` directory.
2. Install dependencies: `pnpm install`
3. Update `index.ts` with relevant information.
4. Execute the script: `pnpm run start`

**Contributing:**  
Pull requests are welcome. For significant changes, open an issue first.
