const axios = require("axios");
const cheerio = require("cheerio");
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
  .option("h", {
    alias: "help",
    description: "display help message",
  })
  .string("networks")
  .help("help")
  .version("1.0.1", "version", "display version information") // the version string.
  .alias("version", "v")
  .example("node index.js --networks [gorli, mumbai, mainnet]")
  .showHelpOnFail(false, "whoops, something went wrong! run with --help").argv;

if (argv.networks.length > 0) {
  argv.networks.forEach(async (network) => {
    try {
      const ret = await axios
        .get("https://docs.pokt.network/use/public-rpc/")
        .then((res) => {
          const $ = cheerio.load(res);

          $(".highlight").each(() => {
            let text = $(value).text();
            let link = $(value).attr("href");
            console.log(text, link);
            if (link) {
              console.log(link);
            }
          });

          console.log("done!");
        });
    } catch (error) {
      console.log(error);
    }
  });
} else {
  throw Error("Must pass in at least one network");
}
