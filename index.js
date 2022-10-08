const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
require("dotenv").config();

const POKT_PRIVATE_KEY = process.env.POKT_PRIVATE_KEY || "";

var argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <cmd> [options]") // usage string of application.
  .command("RPC", "fetches all RPC URLs of specified networks") // describe commands available.
  .command(
    "chainlink",
    "fetches all chainlink addresses of specified networks and depedencies"
  )
  .option("networks", {
    array: true,
    description:
      "an array of network names [gorli | mainnet | mumbai | polygon ...etc ]",
    default: [],
    alias: "n",
    demandOption: true,
  })
  .option("private", {
    description: "use private RPC URL",
    default: false,
    alias: "p",
  })
  .option("h", {
    alias: "help",
    description: "display help message",
  })
  .string("networks")
  .boolean("private")
  .help("help")
  .version("1.0.1", "version", "display version information") // the version string.
  .alias("version", "v")
  .example("node index.js --networks [gorli, mumbai, mainnet]")
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
          fs.appendFileSync("urls.txt", urlWrite, (error) => {
            if (error) {
              return error;
            }
          });
        }
      });
  });
} else {
  throw Error("Must pass in at least one network");
}
