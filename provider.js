// providers.js

const providers = require('./providerConfig');


exports.allRepositoriesURL = function getUrlFromProviderForAllRepositories(provider, organization) {
  console.log(providers.providers[provider].host +
    providers.providers[provider].all_repositories.path_before
    + organization + providers.providers[provider].all_repositories.path_after);
};
