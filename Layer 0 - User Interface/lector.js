#!/usr/bin/env node

const program = require('commander');

const co = require('co');
const prompt = require('co-prompt');
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
    .option('-u, --username [username]', 'username to authenticate, if not present it will not authenticate.')
    .action(function(env, options) {
        if (options.username) {
            co(function*() {
                var password = yield prompt.password('password: ');
                interpreter.allRepositories(env, options, password);
            });
        } else {
            interpreter.allRepositories(env, options);
        }

    });

// RF3

program
    .command('has-repository [env]')
    .alias('has-repo')
    .description('indicates if an organization has the repo')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-r, --repository [repository]', 'repository to check if it exists in organization')
    .option('-u, --username [username]', 'username to authenticate, if not present it will not authenticate.')
    .action((env, options) => {
        if (options.username) {
            co(function*() {
                const password = yield prompt.password('password: ');
                interpreter.findRepository(env, options, password);
            })
        } else {
            interpreter.findRepository(env, options);
        }
    });

//RF 5
program
    .command('last-commits [env]')
    .alias('commits')
    .description('get the last commit of every repositories of a particular organization')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-u, --username [username]', 'username to authenticate, if not present it will not authenticate.')
    .action(function(env, options) {
        if (options.username) {
            co(function*() {
                const password = yield prompt.password('password: ');
                interpreter.lastCommits(env, options, password);
            })
        } else {
            interpreter.lastCommits(env, options);
        }
    });

//RF 6
program
    .command('issues [env]')
    .description('obtain and filter the issues of an organization')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-r, --repository [repository]', 'filter by this repository')
    .option('-a, --author [author]', 'author of the issue')
    .option('-d, --date [date]', 'date of the issue')
    .option('-s, --state [state]', 'state of the issue')
    .option('-l, --label [label]', 'label of the issue')
    .option('-u, --username [username]', 'username to authenticate, if not present it will not authenticate.')
    .action(function(env, options) {
        if (options.username) {
            co(function*() {
                const password = yield prompt.password('password: ');
                interpreter.issues(env, options, password);
            })
        } else {
            interpreter.issues(env, options);
        }
    });

//RF 7
program
    .command('pull-requests [env]')
    .alias('pulls')
    .description('obtain and filter the pull requests of an organization')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-r, --repository [repository]', 'filter by this repository')
    .option('-s, --state [state]', 'state of the pull request')
    .option('-b, --basebranch [basebranch]', 'base branch of the pull request')
    .option('-u, --username [username]', 'username to authenticate, if not present it will not authenticate.')
    .action(function(env, options) {
        if (options.username) {
            co(function*() {
                const password = yield prompt.password('password: ');
                interpreter.pulls(env, options, password);
            })
        } else {
            interpreter.pulls(env, options);
        }
    });

//RF 9
program
    .command('max-collaborator [env]')
    .alias('collaborator')
    .description('obtain and filter the pull requests of an organization')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-u, --username [username]', 'username to authenticate, if not present it will not authenticate.')
    .action(function(env, options) {
        if (options.username) {
            co(function*() {
                const password = yield prompt.password('password: ');
                interpreter.collaborator(env, options, password);
            })
        } else {
            interpreter.collaborator(env, options);
        }
    });


program
    .on('--help', () => {
        console.log('  For the RF requested:');
        console.log();
        console.log(' RF2:');
        console.log('    $ saffie repositories github -o rails');
        console.log(' RF3:');
        console.log('    $ saffie has-repository github -o rails');
        console.log('    $ saffie last-commits github -o github');
        console.log();
    });

program
    .command('*')
    .action((env) => {
        console.log('Command does not exists "%s"', env);
    });

program.parse(process.argv);
