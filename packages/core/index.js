

const pkg = require("./package.json");
const cli = require('./globalConfig')

const list = {}
list.command = "list [name]";
list.aliases = ["ls", "la", "ll"];
list.describe = "List local packages";
list.builder = (yargs) => {
  yargs.option('name', {type: 'string', describe: 'log name', alias: 'n'})
};
list.handler = function handler(argv) {
  console.log(argv.name)
};

module.exports = main;
function main(argv) {
  const context = {
    xueVersion: pkg.version,
  };
  

  return cli()
    .command(list)
    // .command(bootstrapCmd)
    // .command(changedCmd)
    // .command(cleanCmd)
    // .command(createCmd)
    // .command(diffCmd)
    // .command(execCmd)
    // .command(importCmd)
    // .command(infoCmd)
    // .command(initCmd)
    // .command(linkCmd)
    // .command(listCmd)
    // .command(publishCmd)
    // .command(runCmd)
    // .command(versionCmd)
    .parse(argv, context);
}