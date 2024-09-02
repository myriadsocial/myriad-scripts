#!/bin/bash

set -e

echo "Starting Migration and Airdrop Process"

# 1. MongoDB Snapshot and Migration
echo "Step 1: MongoDB Snapshot and Migration"
cd scripts/mongo-migration
pnpm install
pnpm run setup
pnpm start
pnpm run teardown

# 2. Myriad Address Extraction
echo "Step 2: Myriad Address Extraction"
cd ../myriad-address-snapshotter
pnpm install
pnpm start

# 3. Airdrop Process
echo "Step 3: Airdrop Process"
cd ../rococo-airdrop
pnpm install

# Update airdropList.ts with extracted addresses
cp ../myriad-address-snapshotter/myriad_addresses.json ./airdropList.ts
sed -i '1s/^/export const airdropAddresses = /' ./airdropList.ts
echo ";" >> ./airdropList.ts

pnpm start

echo "Migration and Airdrop Process Completed"