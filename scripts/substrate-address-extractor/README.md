# Substrate Address Extractor

This script connects to a Substrate-based blockchain node and extracts unique addresses by scanning through all blocks and extrinsics.

## 📋 Overview

The process begins by connecting to a specified Substrate node, then iterates through all blocks, collecting unique addresses from extrinsics. This is particularly useful for creating snapshots or analyzing address data.

[![Address Extraction Process Flow](https://mermaid.ink/img/pako:eNptkc9uwjAMxl8l8glNAk4cEGLAYYed9gCVm7gQtYkjx2VDiHcfhY5_YoeT_X0_f7aTAysjQYFajY4DfJSKrz60jXBKAQNjTEOQ8D28O72GqoSKgjvOmMA-v0C5XMijp0-ig3ORUuIE6C2UPCIbpmmaypU6tg1WSgbCvGkfrovm4wpU7RuPWQD_PM_YPSzgeDykGL2UHKjW4Hw6-GijC4AZHwmy5j-M1oZonVjvx1tjnqZec6D2TH7q5pjpGR8Wz-t0TF9gBvScQacVfm1rviVsbcFNUSQhm8HUqol4QmfnMSyaAbTKkom0KspyxzwsF9FK8y2jd1g2ptp68ViV0mbaKQzim2s22_6XqTyWT1kX0XHMdPMPDTh9Cg?type=png)](https://mermaid.live/edit#pako:eNptkc9uwjAMxl8l8glNAk4cEGLAYYed9gCVm7gQtYkjx2VDiHcfhY5_YoeT_X0_f7aTAysjQYFajY4DfJSKrz60jXBKAQNjTEOQ8D28O72GqoSKgjvOmMA-v0C5XMijp0-ig3ORUuIE6C2UPCIbpmmaypU6tg1WSgbCvGkfrovm4wpU7RuPWQD_PM_YPSzgeDykGL2UHKjW4Hw6-GijC4AZHwmy5j-M1oZonVjvx1tjnqZec6D2TH7q5pjpGR8Wz-t0TF9gBvScQacVfm1rviVsbcFNUSQhm8HUqol4QmfnMSyaAbTKkom0KspyxzwsF9FK8y2jd1g2ptp68ViV0mbaKQzim2s22_6XqTyWT1kX0XHMdPMPDTh9Cg)

## 🚀 Setup

1. Ensure you have Node.js and pnpm installed on your machine.
2. Clone this repository:

```sh
git clone git@github.com:myriadsocial/myriad-scripts.git
cd myriad-scripts/scripts/substrate-address-extractor
```

3. Install dependencies:

```sh
pnpm install
```

4. Update the `nodeUrl` in `src/main.ts` with the appropriate Substrate node WebSocket URL.

## 📜 Usage

Execute the script using pnpm:

```sh
pnpm start
```

After execution, the script will output:
- The total number of unique addresses found
- A list of all unique addresses

## 📊 Key Files Explanation

- `src/main.ts`: Contains the main logic for connecting to the Substrate node and extracting addresses.
- `package.json`: Defines project metadata and dependencies.
- `tsconfig.json`: TypeScript compiler configuration.

## ⚠️ Notes

- The script may take a considerable amount of time to run on chains with a large number of blocks.
- Ensure a stable connection to the node while the script is running.
- The current implementation assumes balance transfers use the `balances.transfer` extrinsic. Modify if your chain uses different methods.

## 🛠 Customization

You can modify the `fetchAllAddresses` function in `src/main.ts` to extract additional information or apply different filtering criteria as needed for your specific use case.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.