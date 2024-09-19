# Polkadot Airdrop Script

This project connects to the Polkadot.js API and performs an airdrop of assets using a snapshot from a MongoDB database. Assets from the snapshot are airdropped to the corresponding addresses on a new chain.

## 📋 Overview

The process begins by taking a snapshot of the current MongoDB database, retrieving all addresses and their balances. The snapshot data is then fed into the script, which executes the airdrop. Finally, assets are reimbursed or airdropped on the new chain.

[![Airdrop Process Flow](https://mermaid.ink/img/pako:eNpFkbFuwyAQhl_lxNApUXcPleLYqTp0ibuZDGc4x0j2geDcqrLy7iVu3G6Avv_7D1iU8ZZUoa4RwwAflWbNh7YRjFJAwxjS4AV8D--er74qwaJgh4kusN-_QLmcSaKjT4KDtZFSogTIFkockQ2lm-ZyJY9tg5mSgSBt2rvrovm4AlX7xmEWwD_PE3QPCzgWD8lEFyQHqjVQLwcXbfQBMOOSICP_YTTGR-v4ej_eGvM09Zo9tWdyUzfHRM_4sHhep2P6AjOg41x0WuHXtmZbwNZm_BRGErIZUDs1UZzQ2fyGi2YArbJkIq2KvLTU4zyKVppvGZ1DvjHV1omPqpA4007hLL75ZrPtf5nKYf6RSRU9joluP3Tfk0Q?type=png)](https://mermaid.live/edit#pako:eNpFkbFuwyAQhl_lxNApUXcPleLYqTp0ibuZDGc4x0j2geDcqrLy7iVu3G6Avv_7D1iU8ZZUoa4RwwAflWbNh7YRjFJAwxjS4AV8D--er74qwaJgh4kusN-_QLmcSaKjT4KDtZFSogTIFkockQ2lm-ZyJY9tg5mSgSBt2rvrovm4AlX7xmEWwD_PE3QPCzgWD8lEFyQHqjVQLwcXbfQBMOOSICP_YTTGR-v4ej_eGvM09Zo9tWdyUzfHRM_4sHhep2P6AjOg41x0WuHXtmZbwNZm_BRGErIZUDs1UZzQ2fyGi2YArbJkIq2KvLTU4zyKVppvGZ1DvjHV1omPqpA4007hLL75ZrPtf5nKYf6RSRU9joluP3Tfk0Q)

## 🚀 Setup

1. Ensure you have Docker and docker-compose installed on your machine.
2. Clone this repository:

```sh
git clone git@github.com:myriadsocial/myriad-scripts.git
cd polkadot-airdrop
```

3. Use `pnpm` to install necessary dependencies:

```sh
pnpm install
```

4. Update the `index.ts` with the appropriate Polkadot/WebSocket node URL, replace the placeholder seed phrase with your sudo account's seed phrase, and the destination account's address placeholder with the actual address.

5. Execute the script using `pnpm`:

```sh
pnpm run start
```

## 📜 Dependencies

- Polkadot.js API
- Polkadot.js Keyring
- TypeScript
- ts-node
- Docker

## ⚠️ Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
