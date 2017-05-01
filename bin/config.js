#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var _= require('lodash');
var appname = "undefined"


//Evaluate args command line skit->config
var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('transform:', 'Transformation app.config.json files')
    .demandCommand(1,chalk.yellow("No command was provided!"))
    .example('$0 transform -file config -env prod -mode optimize -out generated tranformation', 'transform the settings in the given file')
    //tranform command
    //path parameter
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Load the config file for apply transformation')
    .demandOption(['f'])
    //env parameter
    .alias('e', 'env')
    .nargs('e', 1)
    .describe('e', 'environment [prod|uat|dev] applied in the given file')
    .demandOption(['e'])
     //mode parameter
    .alias('m', 'mode')
    .nargs('m', 1)
    .describe('m', 'optimize|debug applied in the given file')
    .demandOption(['m'])

    //out parameter
    .alias('o', 'out')
    .nargs('o', 1)
    .describe('o', 'output file path generated after transformation applied in the given file')

    //parse command
    .command('parse:', 'Parse skit app.config.json files')
    .command('debug:', 'Debug mode')

    .help('h')
    .alias('h', 'help')
    .epilog(chalk.white.bold.bgGreen('by david.yanez v1.0.0 UBS.AG'))
    .argv;

process.env.NODE_ENV = argv.env
var config = require('config')

if(config.has("name")){
     appname = config.get("name")
}


fs.writeFile(argv.out ? argv.out : argv.file, JSON.stringify(config,null, 4), function (err) {
  if (err) return console.log(chalk.white.bgRed(err));
  console.log("==================================================")
  console.log(chalk.white.bgBlue('skit/config:transform=>app: ' + appname))
  console.log(chalk.white.bgBlue('skit/config:transform=>file: ' + argv.file));
  console.log(chalk.white.bgBlue('skit/config:transform=>env: ' + argv.env));
  console.log(chalk.white.bgBlue('skit/config:transform=>mode: ' + argv.mode));
  console.log("==================================================")
});



