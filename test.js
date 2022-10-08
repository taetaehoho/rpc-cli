// a fairly complex CLI defined using the yargs 3.0 API:
var argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <cmd> [options]") // usage string of application.
  .command("RPC", "fetches all RPC URLs of specified networks") // describe commands available.
  .command(
    "chainlink",
    "fetches all chainlink addresses of specified networks and depedencies"
  )
  .option("network", {
    // document options.
    array: true, // even single values will be wrapped in [].
    description:
      "an array of network names [gorli | mainnet | mumbai | polygon ...etc ]",
    default: "gorli",
    alias: "n",
  })
  .option("h", {
    alias: "help",
    description: "display help message",
  })
  .string(["user", "pass"])
  .implies("user", "pass") // if 'user' is set 'pass' must be set.
  .help("help")
  .demand("q") // fail if 'q' not provided.
  .version("1.0.1", "version", "display version information") // the version string.
  .alias("version", "v")
  // show examples of application in action.
  .example("npm install npm@latest -g", "install the latest version of npm")
  // final message to display when successful.
  .epilog("for more information visit https://github.com/chevex/yargs")
  // disable showing help on failures, provide a final message
  // to display for errors.
  .showHelpOnFail(false, "whoops, something went wrong! run with --help").argv;

// the parsed data is stored in argv.
console.log(argv);
