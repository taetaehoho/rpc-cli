#!/usr/bin/env node
const axios = require("axios");
const vrf = require("./vrf");
const cheerio = require("cheerio");
const fs = require("fs");
const chainId = require("./chainId");
require("dotenv").config();

const POKT_PORTAL_ID = process.env.POKT_PORTAL_ID || "";

var argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <cmd> [options]") // usage string of application.
  .command("RPC", "fetches all RPC URLs of specified networks")
  .command("vrf", "fetch vrf addresses")
  .command(
    "pricefeed",
    "fetch price feed addresses - only supports popular ones"
  )
  .option("networks", {
    array: true,
    description:
      "an array of network names [goerli | mainnet | mumbai | avax ...etc ]",
    default: [],
    alias: "n",
    demandOption: true,
    choices: [
      "algo",
      "avax",
      "bsc",
      "bsc-archival",
      "boba",
      "avax-dfk",
      "eth",
      "eth-archival",
      "eth-kovan",
      "eth-rinkeby",
      "eth-ropsten",
      "eth-trace",
      "evmos",
      "fantom",
      "fuse",
      "fuse-archival",
      "gnosishain",
      "harmony-0",
      "iotex",
      "klaytn",
      "moonbeam",
      "moonriver",
      "near",
      "optimism",
      "osmosis",
      "pokt",
      "poly",
      "mumbai",
      "solana-mainnet",
      "goerli",
    ],
  })
  .option("private", {
    description: "use private RPC URL",
    default: false,
    alias: "p",
  })
  .option("vrf", {
    alias: "v",
    description: "fetch vrf addresses",
    default: false,
  })
  .options("pricefeed", {
    alias: "pf",
    description: "fetches chainlink pricefeed addresses",
    default: [],
    array: true,
  })
  .option("h", {
    alias: "help",
    description: "display help message",
  })
  .boolean("private")
  .boolean("vrf")
  .string("pricefeed")
  .help("help")
  .version("1.0.1", "version", "display version information") // the version string.
  .alias("version", "v")
  .example(
    "./pokt.js --networks gorli mumbai mainnet solana --vrf --pricefeed eth/usd"
  )
  .showHelpOnFail(false, "whoops, something went wrong! run with --help").argv;

if (argv.networks.length > 0) {
  const private = "/v1/lb/" + POKT_PORTAL_ID;
  argv.networks.forEach(async (network) => {
    const ret = await axios.get("https://docs.pokt.network/use/public-rpc/");
    const $ = cheerio.load(ret.data);
    $("table > tbody > tr > td")
      .find("a")
      .each((i, link) => {
        const url = $(link).text();
        if (url.includes("pokt") && url.includes(network.concat("-rpc"))) {
          let urlWrite = `${network}`.toUpperCase() + "_RPC_URL=" + `${url} \n`;
          if (argv.private) {
            urlWrite =
              `${network}`.toUpperCase() +
              "_RPC_URL=" +
              `${url}` +
              `${private} \n`;
          }
          if (
            process.env[network.toUpperCase() + "_RPC_URL"] === undefined ||
            argv.private
          ) {
            fs.appendFileSync(".env", urlWrite, (error) => {
              return error;
            });
          }
        }
      });
  });
}

if (argv.vrf) {
  const vrflist = {};
  for (const network of argv.networks) {
    if (vrf[network] === undefined) {
    }
    vrflist[network] = vrf[network];
  }
  let vrfWrite = "const vrfConfig = " + JSON.stringify(vrflist);

  fs.appendFileSync("config.js", vrfWrite, "utf8", (error) => {
    return error;
  });
}

if (argv.pricefeed.length > 0) {
  const do2 = axios.get("https://data.chain.link/popular").then((ret) => {
    const $ = cheerio.load(ret.data);
    const priceStrings = [];
    $("table > tbody > tr").each((i, link) => {
      priceStrings.push(
        $(link).text().split("0x")[0].toLowerCase().replace(/ /g, ""),
        $(link).attr("id").split("_")
      );
    });

    let chain = [];

    for (const network of argv.networks) {
      for (let i = 0; i < chainId.length; i++) {
        if (chainId[i].name.toLowerCase().includes(network)) {
          chain.push(chainId[i].chainId);
        }
      }
    }

    let chainlinkpricefeed = [];
    let finalchain;
    for (pricefeed of argv.pricefeed) {
      let index = getAllIndexes(priceStrings, pricefeed);
      for (i of index) {
        for (j of chain) {
          if (priceStrings[i + 1][0] == j) {
            finalchain = j;
            chainlinkpricefeed.push(priceStrings[i + 1][1]);
          }
        }
      }
    }

    let pricefeedWrite =
      "const priceFeedConfig = {" +
      `${finalchain}` +
      ":" +
      `"${chainlinkpricefeed}"` +
      "}";

    console.log(pricefeedWrite);

    fs.appendFileSync("config.js", pricefeedWrite, (error) => {
      return error;
    });
  });
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}
