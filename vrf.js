const vrf = {
  eth: {
    "LINK Token": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    "VRF Coordinator": "0x271682DEB8C4E0901D1a1550aD2e64D568E69909",
    "200 gwei Key Hash":
      "0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef",
    "500 gwei Key Hash":
      "0xff8dedfbfa60af186cf3c830acbc32c05aae823045ae5ea7da1e45fbfaba4f92",
    "1000 gwei Key Hash":
      "0x9fe0eebf5e446e3c998ec9bb19951541aee00bb90ea201ae456421a2ded86805",
    Premium: 0.25,
    "Max Gas Limit": 2500000,
    "Minimum Confirmations": 3,
    "Maximum Confirmations": 200,
    "Maximum Random Values": 500,
  },
  goerli: {
    "LINK Token": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    "VRF Coordinator": "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    "30 gwei Key Hash":
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    Premium: 0.25,
    "Max Gas Limit": 2500000,
    "Minimum Confirmations": 3,
    "Maximum Confirmations": 200,
    "Maximum Random Values": 500,
  },
  bsc: {
    "LINK Token": "0x404460C6A5EdE2D891e8297795264fDe62ADBB75",
    "VRF Coordinator": "0xc587d9053cd1118f25F645F9E08BB98c9712A4EE",
    "200 gwei Key Hash":
      "0x114f3da0a805b6a67d6e9cd2ec746f7028f1b7376365af575cfea3550dd1aa04",
    "500 gwei Key Hash":
      "0xba6e730de88d94a5510ae6613898bfb0c3de5d16e609c5b7da808747125506f7",
    "1000 gwei Key Hash":
      "0x17cd473250a9a479dc7f234c64332ed4bc8af9e8ded7556aa6e66d83da49f470",
    Premium: 0.005,
    "Max Gas Limit": 2500000,
    "Minimum Confirmations": 3,
    "Maximum Confirmations": 200,
    "Maximum Random Values": 500,
  },
  poly: {
    "LINK Token": "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
    "VRF Coordinator": "0xAE975071Be8F8eE67addBC1A82488F1C24858067",
    "200 gwei Key Hash":
      "0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93",
    "500 gwei Key Hash":
      "0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd",
    "1000 gwei Key Hash":
      "0xd729dc84e21ae57ffb6be0053bf2b0668aa2aaf300a2a7b2ddf7dc0bb6e875a8",
    Premium: 0.0005,
    "Max Gas Limit": 2500000,
    "Minimum Confirmations": 3,
    "Maximum Confirmations": 200,
    "Maximum Random Values": 500,
  },
  mumbai: {
    "LINK Token": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    "VRF Coordinator": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    "500 gwei Key Hash": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    Premium: 0.0005,
    "Max Gas Limit": 2500000,
    "Minimum Confirmations": 3,
    "Maximum Confirmations": 200,
    "Maximum Random Values": 500,
  },
  avax: {
    "LINK Token": "0x5947BB275c521040051D82396192181b413227A3",
    "VRF Coordinator": "0xd5D517aBE5cF79B7e95eC98dB0f0277788aFF634",
    "200 gwei Key Hash":
      "0x83250c5584ffa93feb6ee082981c5ebe484c865196750b39835ad4f13780435d",
    "500 gwei Key Hash":
      "0x89630569c9567e43c4fe7b1633258df9f2531b62f2352fa721cf3162ee4ecb46",
    "1000 gwei Key Hash":
      "0x06eb0e2ea7cca202fc7c8258397a36f33d88568d2522b37aaa3b14ff6ee1b696",
    Premium: 0.005,
    "Max Gas Limit": 2500000,
    "Minimum Confirmations": 1,
    "Maximum Confirmations": 200,
    "Maximum Random Values": 500,
  },
  fantom: {
    "LINK Token": "0x6F43FF82CCA38001B6699a8AC47A2d0E66939407",
    "VRF Coordinator": "0xd5D517aBE5cF79B7e95eC98dB0f0277788aFF634",
    "200 gwei Key Hash":
      "0xb4797e686f9a1548b9a2e8c68988d74788e0c4af5899020fb0c47784af76ddfa",
    "500 gwei Key Hash":
      "0x5881eea62f9876043df723cf89f0c2bb6f950da25e9dfe66995c24f919c8f8ab",
    "1000 gwei Key Hash":
      "0x64ae04e5dba58bc08ba2d53eb33fe95bf71f5002789692fe78fb3778f16121c9",
    Premium: 0.0005,
    "Max Gas Limit": 2500000,
    "Minimum Confirmations": 3,
    "Maximum Confirmations": 200,
    "Maximum Random Values": 500,
  },
};

module.exports = vrf;
