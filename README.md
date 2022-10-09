Get your multichain RPC urls, chainlink VRF constructors and your chainlink pricefeeds all in one command!
No more time spent snooping around chainlink docs and pokt dashboard copying and pasting over constants into your
.env or hardhat.helper.config!

```
npm install
node pokt.js
./pokt.js --networks goerli mumbai solana-mainnet avax --vrf --pricefeed eth/usd matic/usd
```

No commas between network names! If the pricefeed doesn't exist then it will not be generated. There are also
some issues with the chainId.js data.

If you want your private POKT URLs you need your POKT_ID which is your Portal ID on your POKT portal

<img width="1278" alt="Screen Shot 2022-10-08 at 5 25 17 PM" src="https://user-images.githubusercontent.com/75167060/194729963-b242fb2f-fca3-49ab-8dee-f9aa4af48e96.png">

```
./pokt.js --networks goerli mumbai solana-mainnet -p
```
