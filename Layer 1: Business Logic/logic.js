//Layer 1: Business Logic/logic

const requestify = require('requestify');
const q = require('q');
const Provider = require('../Layer 2: Data-access/providerAccess');


exports.getRepositories = function(provider, options, callback) {

    var deferrer = q.defer();

    const URL = Provider.getUrl("all_repositories", provider, options);
    requestify.get(URL).then(function(response) {
        // Get the response body
        const value = Provider.getValue("all_repositories", provider, options);
        console.log(value);
        if (value)
            deferrer.resolve(response.getBody()[value]);
        else
            deferrer.resolve(response.getBody());
    }).fail(function(response) {
        error = {
            status: response.getHeaders().status,
            message: response.getBody().message
        }

        deferrer.reject(error);
    });

    deferrer.promise.nodeify(callback);
    return deferrer.promise;
}
