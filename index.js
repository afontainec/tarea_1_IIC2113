#!/usr/bin/env node

const program = require('commander');

const sessionController = require('./controllers/sessionController');
const organizationController = require('./controllers/organizationController');

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
      console.log(env);
      organizationController.allRepositories(options);
    });

// RF3

program
    .command('has-repository [env]')
    .alias('has-repo')
    .description('indicates if an organization has the repo')
    .option('-o, --organization [organization]', 'organization to which get repositories')
    .option('-r, --repository [repository]', 'repository to check if it exists in organization')
    .action((options) => {
      organizationController.findRepository(options);
    });


program
    .command('login [env]')
    .description('generate login')
    .option('-u, --username [username]', 'username for the login')
    .option('-p, --password [password]', 'password for the login')
    .action((env, options) => {
      sessionController.login(env, options);
    });

program
    .command('logout [env] ')
    // .alias('logout [env]')
    .description('logout from github or bitbucket ')
    .action((env) => {
      console.log('logging out from %s', env);
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
