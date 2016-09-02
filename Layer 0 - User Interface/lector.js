#!/usr/bin/env node

const program = require('commander');

const interpreter = require('../Layer 1 - Business Logic/interpreter');

program
    .version('0.0.1');


// / RF2 and RF4

program
    .command('repositories [env]')
    .alias('repos')
    .description('get all the repositories of a particular organization')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-i, --info [info]', 'show full info or not')
    .action(function(env, options) {
        interpreter.allRepositories(env, options);
    });

// RF3

program
    .command('has-repository [env]')
    .alias('has-repo')
    .description('indicates if an organization has the repo')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-r, --repository [repository]', 'repository to check if it exists in organization')
    .action((env, options) => {
        interpreter.findRepository(env, options);
    });

//RF 5
program
    .command('last-commits [env]')
    .alias('commits')
    .description('get the last commit of every repositories of a particular organization')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .action(function(env, options) {
        interpreter.lastCommits(env, options);
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
