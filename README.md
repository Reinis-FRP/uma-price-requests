# UMA DVM price request scripts

[umip-16.sql](./umip-16.sql) is derived `bigquery-public-data.crypto_ethereum.transactions` SQL query from [UMIP-16](https://github.com/UMAprotocol/UMIPs/blob/master/UMIPs/umip-16.md) adapted to work without GCP billing account.

[GasEthQuery.js](./GasEthQuery.js) is derived script from [UMA](https://github.com/UMAprotocol/protocol/blob/master/packages/core/scripts/local/GasEthQuery.js) adapted to work without GCP billing account, though it lacks checking for minimum block amount.
