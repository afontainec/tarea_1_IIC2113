const requestify = require('requestify');


// const providers = {
//  github: { host: 'https://api.github.com' }
// };


exports.allRepositories = function(options) {
    const URL = 'https://api.github.com/orgs/' + options.organization + '/repos';
    console.log('******* Searching in github... *******************************************');
    console.log('**************************************************************************');
    console.log('Repositories of organization: ' + options.organization);
    requestify.get(URL).then(function(response) {
        // Get the response body
        const body = response.getBody();
        for (var i = 0; i < body.length; i++) {
            console.log('  ' + (i + 1) + '- Name: ' + body[i].name);
            if (body[i].private)
                console.console.log('    This is a private repository');
            console.log('    This is a public repository');
            console.log('    Description: ' + body[i].description);
            console.log('    Created: ' + body[i].created_at);
            console.log('    Clone URL: ' + body[i].clone_url);;
            console.log('    Number of stargazers: ' + body[i].stargazers_count);
            console.log('    Number of watchers: ' + body[i].watchers_count);
            console.log('    Number of open issues: ' + body[i].open_issues_count);
            console.log('    Number of forks: ' + body[i].forks_count);
        }
        if (body.length == 0) {
            console.log('  ...');
            console.log('  ' + options.organization + ' has no repoositories in github.');
        }
        console.log('**************************************************************************');
    }).fail(function(error) {
        console.log('  the request failed with status: ' +
            error.getHeaders().status);
        console.log('  ' + error.getBody().message);
        console.log('**************************************************************************');
    });
};
