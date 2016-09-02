#!/usr/bin/env node

const program = require('commander');

const interpreter = require('../Layer 1: Business Logic/interpreter');

program
    .version('0.0.1');


// / RF2

program
    .command('repositories [env]')
    .alias('repos')
    .description('get all the repositories of a particular organization')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-i, --info [info]', 'show full info or not')
    .option('-c, --commit [commit]', 'show last commit or not')
    .action(function (env, options) {
      interpreter.allRepositories(env, options);
    });

// RF3

program
    .command('has-repository [env]')
    .alias('has-repo')
    .description('indicates if an organization has the repo')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-r, --repository [repository]', 'repository to check if it exists in organization')
    .action((options) => {
      interpreter.findRepository(options);
    });



program
    .on('--help', () => {
      console.log('  Examples:');
      console.log();
      console.log('    $ saffie login github -u user -p pass');
      console.log('    $ saffie logout github');
      console.log();
    });

program
    .command('*')
    .action((env) => {
      console.log('Command does not exists "%s"', env);
    });

program.parse(process.argv);
