#!/usr/bin/env node
const axios = require("axios");
const vrf = require("./vrf");
const cheerio = require("cheerio");
const fs = require("fs");
require("dotenv").config();

const POKT_PRIVATE_KEY = process.env.POKT_PRIVATE_KEY || "";

var argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <cmd> [options]") // usage string of application.
  .command("RPC", "fetches all RPC URLs of specified networks")
  .command("chainlink", "fetch vrf addresses")
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
  .option("chainlink", {
    alias: "c",
    description: "fetch vrf addresses",
    default: [],
    array: true,
  })
  .option("h", {
    alias: "help",
    description: "display help message",
  })
  .boolean("private")
  .help("help")
  .version("1.0.1", "version", "display version information") // the version string.
  .alias("version", "v")
  .example("./pokt.js --networks gorli mumbai mainnet solana --chainlink vrf")
  .showHelpOnFail(false, "whoops, something went wrong! run with --help").argv;

if (argv.networks.length > 0) {
  const private = "/v1/lb/" + POKT_PRIVATE_KEY;
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
          if (process.env[network.toUpperCase() + "_RPC_URL"] === undefined) {
            fs.appendFileSync(".env", urlWrite, (error) => {
              return error;
            });
          }
        }
      });
  });
}

if (argv.chainlink.length > 0) {
  if (argv.chainlink.includes("vrf")) {
    const vrflist = {};
    for (const network of argv.networks) {
      if (vrf[network] === undefined) {
        break;
      }
      vrflist[network] = vrf[network];
    }
    let vrfWrite = "const vrfConfig = " + JSON.stringify(vrflist);

    fs.appendFileSync("config.js", vrfWrite, "utf8", (error) => {
      return error;
    });
  }
}
