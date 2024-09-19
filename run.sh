#!/bin/bash

set -e

echo "Starting Migration and Airdrop Process"

# Function to prompt for input with a default value
prompt_input() {
    local prompt="$1"
    local default="$2"
    local input
    read -p "$prompt [$default]: " input
    echo "${input:-$default}"
}

# Get user input for MongoDB and WebSocket connections
MONGO_URL=$(prompt_input "Enter MongoDB URL" "mongodb://localhost:27017")
WSS_URL=$(prompt_input "Enter WebSocket URL" "wss://ws-rpc.testnet.myriad.social")
ROCOCO_WSS_URL=$(prompt_input "Enter Rococo WebSocket URL" "wss://ws-rpc.devnet.myriad.social/websocket/")
SUDO_SEED=$(prompt_input "Enter Sudo Seed" "bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice")

# 1. Myriad Address Snapshotter
echo "Step 1: Myriad Address Snapshotter"
cd scripts/myriad-address-snapshotter
pnpm install
pnpm start "$MONGO_URL" "$WSS_URL"

# 2. Substrate Address Extractor
echo "Step 2: Substrate Address Extractor"
cd ../substrate-address-extractor
pnpm install
pnpm start "$WSS_URL"

# 3. Rococo Airdrop
echo "Step 3: Rococo Airdrop"
cd ../rococo-airdrop
pnpm install
# Update airdropList.ts with extracted addresses
cp ../myriad-address-snapshotter/myriad_addresses.json ./airdropList.ts
sed -i '1s/^/export const airdropAddresses = /' ./airdropList.ts
echo ";" >> ./airdropList.ts
pnpm start "$ROCOCO_WSS_URL" "$MONGO_URL" "$SUDO_SEED"

echo "Migration and Airdrop Process Completed"