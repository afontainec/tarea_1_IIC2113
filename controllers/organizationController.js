const requestify = require('requestify');


// const providers = {
//  github: { host: 'https://api.github.com' }
// };


exports.allRepositories = function (options) {
  const URL = 'https://api.github.com/orgs/' + options.organization + '/repos';

  requestify.get(URL).then(function (response) {
            // Get the response body
    const body = response.getBody();
    console.log('Repositories of organization: ' + options.organization);
    for (var i = 0; i < body.length; i++) {
      console.log((i + 1) + '- ' + body[i].name);
    }
    // console.log(response.getBody());
  });
};
