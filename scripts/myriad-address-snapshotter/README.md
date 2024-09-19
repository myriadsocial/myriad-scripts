# Myriad Address Snapshotter

This script connects to a MongoDB database and a Substrate-based blockchain node to snapshot addresses with balances above the existential deposit.

## 📋 Overview

The Myriad Address Snapshotter performs the following steps:

1. Connects to a MongoDB database to fetch all Myriad addresses.
2. Connects to a Substrate node to check the balance of each address.
3. Filters addresses based on whether their balance is above the existential deposit.
4. Outputs the eligible addresses and their balances to a JSON file.

[![Myriad Address Snapshotter Process Flow](https://mermaid.ink/img/pako:eNp1ksFuwjAMhl8l8glQaZw4IMSAw0477bQHqNzUhahtHDkuG0K8-yh0FNjOtv_P-m07ObAyEhSo1eg4wEep-OpD2winFDAwxjQECd_Du9NrqEqoKLjjjAns8wuUy4U8evokOjgXKSVOgN5CySOyYZqmqVypY9tgpWQgzJv24bpoPq5A1b7xmAXwz_OM3cMCjsdDitFLyYFqDc6ng482ugCY8ZEga_7DaG2I1on1frw15mnqNQdqz-Snbo6ZnvFh8bxOx_QFZkDPGXRa4de25lvC1hbcFEUSshlMrZqIJ3R2HsOiGUCrLJlIq6IsdyzCchGtNN8yeodlY6qtF49VKW2mncIgvrFhs-1_mMpD-ZR1ER3HTDf_6BaGBw?type=png)](https://mermaid.live/edit#pako:eNp1ksFuwjAMhl8l8glQaZw4IMSAw0477bQHqNzUhahtHDkuG0K8-yh0FNjOtv_P-m07ObAyEhSo1eg4wEep-OpD2winFDAwxjQECd_Du9NrqEqoKLjjjAns8wuUy4U8evokOjgXKSVOgN5CySOyYZqmqVypY9tgpWQgzJv24bpoPq5A1b7xmAXwz_OM3cMCjsdDitFLyYFqDc6ng482ugCY8ZEga_7DaG2I1on1frw15mnqNQdqz-Snbo6ZnvFh8bxOx_QFZkDPGXRa4de25lvC1hbcFEUSshlMrZqIJ3R2HsOiGUCrLJlIq6IsdyzCchGtNN8yeodlY6qtF49VKW2mncIgvrFhs-1_mMpD-ZR1ER3HTDf_6BaGBw)

## 🚀 Setup

1. Ensure you have Node.js and pnpm installed on your machine.
2. Clone this repository:

```sh
git clone git@github.com:myriadsocial/myriad-scripts.git
cd myriad-scripts/scripts/myriad-address-snapshotter
```

3. Install dependencies:

```sh
pnpm install
```

4. Update the following variables in `src/main.ts`:
   - `DB_URL`: MongoDB connection string
   - `nodeUrl`: WebSocket URL for the Substrate node

## 📜 Usage

Execute the script using pnpm:

```sh
pnpm start
```

After execution, the script will:

- Output the total number of eligible addresses
- Log all eligible addresses and their balances
- Create a `myriad_addresses.json` file with the snapshot data

## 📊 Key Files Explanation

- `src/main.ts`: Contains the main logic for connecting to MongoDB, the Substrate node, and generating the snapshot.
- `package.json`: Defines project metadata and dependencies.
- `tsconfig.json`: TypeScript compiler configuration.
- `myriad_addresses.json`: Output file containing the snapshot data (generated after running the script).

## ⚠️ Notes

- Ensure you have the necessary permissions to access both the MongoDB database and the Substrate node.
- The script may take some time to run depending on the number of addresses in the database and the responsiveness of the Substrate node.
- Make sure your MongoDB instance is running and accessible before executing the script.

## 🛠 Customization

You can modify the `getEligibleAddresses` function in `src/main.ts` to change the eligibility criteria or to extract additional information as needed for your specific use case.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
