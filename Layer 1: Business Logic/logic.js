//Layer 1: Business Logic/logic

const requestify = require('requestify');
const q = require('q');
const Provider = require('../Layer 2: Data-access/providerAccess');


exports.getRepositories = getAllRepositories;

function getAllRepositories(provider, options, callback) {

    var deferrer = q.defer();


    const URL = Provider.getUrl("all_repositories", provider, options);
    requestify.get(URL, {
        auth: {
            username: 'afontainec',
            password: ''
        }
    }).then(function(response) {
        // Get the response body
        const value = Provider.getValue("all_repositories", provider, options);
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



exports.findRepository = function(provider, options, callback) {

    var deferrer = q.defer();

    const URL = Provider.getUrl("all_repositories", provider, options);
    requestify.get(URL, {
        auth: {
            username: 'afontainec',
            password: ''
        }
    }).then(function(response) {
        // Get the response body
        const value = Provider.getValue("all_repositories", provider, options);
        let repositories = [];
        if (value)
            repositories = response.getBody()[value];
        else
            repositories = response.getBody();

        for (var i = 0; i < repositories.length; i++) {
            if (repositories[i].name == options.repository) {
                deferrer.resolve(repositories[i]);
            }
        }
        deferrer.resolve(false);
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


exports.getLastCommits = function(env, options, callback) {

    var deferrer = q.defer();

    getAllRepositories(env, options, function(err, repositories) {

        if (err) {
            deferrer.reject(err);
        }
        let finished = 0;
        let results = [];
        const length_of_array = repositories.length;
        for (var i = 0; i < repositories.length; i++) {
            getLastCommitOfRepository(repositories[i], env, options, function(err, last_commit) {
                if (err) {
                    deferrer.reject(err);
                }
                results.push(last_commit);
                finished += 1;
                if (finished == length_of_array) {
                    deferrer.resolve(results);
                }
            });
        }

    });
    deferrer.promise.nodeify(callback);
    return deferrer.promise;
}






function getLastCommitOfRepository(repository, provider, options, callback) {

    var deferrer = q.defer();

    options.repository = repository.name;
    const URL = Provider.getUrl("commits", provider, options);
    requestify.get(URL, {
        auth: {
            username: 'afontainec',
            password: ''
        }
    }).then(function(response) {
        // Get the response body
        const value = Provider.getValue("commits", provider, options);
        let repository_with_last_commit = repository;

        let commits = [];
        if (value)
            commits = response.getBody()[value];
        else
            commits = response.getBody();
        repository_with_last_commit.last_commit = commits[0];
        deferrer.resolve(repository_with_last_commit);
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
