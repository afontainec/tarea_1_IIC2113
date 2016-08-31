
const requestify = require('requestify');


// const providers = {
//  github: { host: 'https://api.github.com' }
// };


exports.allRepositories = function getAllRepositories(options) {
  const URL = 'https://api.github.com/orgs/' + options.organization + '/repos';
  console.log('******* Searching in github... *******************************************');
  console.log('**************************************************************************');
  console.log('Repositories of organization: ' + options.organization);
  requestify.get(URL).then(function (response) {
        // Get the response body
    const body = response.getBody();
    for (let i = 0; i < body.length; i++) {
      printRepository(body[i], (i + 1), options.info);
    }
    if (body.length == 0) {
      console.log('  ...');
      console.log('  ' + options.organization + ' has no repoositories in github.');
    }
    console.log('**************************************************************************');
  }).fail(function (error) {
    console.log('  the request failed with status: ' +
            error.getHeaders().status);
    console.log('  ' + error.getBody().message);
    console.log('**************************************************************************');
  });
};


exports.findRepository = function (options) {
  const URL = 'https://api.github.com/orgs/' + options.organization + '/repos';
  console.log('******* Searching in github... *******************************************');
  console.log('**************************************************************************');

  requestify.get(URL).then(function (response) {
    const body = response.getBody();
    let exists = false;
    for (let i = 0; i < body.length; i++) {
      if (body[i].name == options.repository) {
        console.log('Organization ' + options.organization + ' has repository: ');
        printRepository(body[i], '', false);
        exists = true;
      }
    }
    if (!exists) {
      console.log('' + options.organization + ' does not contain repository ' + options.repository);
    }
    console.log('**************************************************************************');
  }).fail(function (error) {
    console.log('  the request failed with status: ' +
            error.getHeaders().status);
    console.log('  ' + error.getBody().message);
    console.log('**************************************************************************');
  });
};


function printRepository(repository, j, extended) {
  console.log('----------------------------------------------------------------------------------------------------------------');
  console.log('  ' + (j) + '- Name: ' + repository.name);
  if (repository.private)
    console.console.log('    This is a private repository');
  console.log('    This is a public repository');
  console.log('    Description: ' + repository.description);
  if (extended) {
    console.log('    Created: ' + repository.created_at);
    console.log('    Clone URL: ' + repository.clone_url);
    console.log('    Number of stargazers: ' + repository.stargazers_count);
    console.log('    Number of watchers: ' + repository.watchers_count);
    console.log('    Number of open issues: ' + repository.open_issues_count);
    console.log('    Number of forks: ' + repository.forks_count);
  }
}
