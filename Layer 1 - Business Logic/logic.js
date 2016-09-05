//Layer 1 - Business Logic/logic

const requestify = require('requestify');
const q = require('q');
const Provider = require('../Layer 2 - Data Access/providerAccess');

const Parser = require('./parser');
const path = require('path');
//add User only if exists
let User;
try {
    User = require('../Layer 3 - Data/user')
} catch (e) {}





exports.getRepositories = getAllRepositories;

function getAllRepositories(provider, options, password, callback) {

    var deferrer = q.defer();


    const URL = Provider.getUrl("all_repositories", provider, options.organization, options.repository);

    const JSON = getAuthJSON(options.username, password);

    requestify.get(URL, JSON).then(function(response) {
        // Get the response body
        const value = Provider.getValue("all_repositories", provider, options);

        let repositories = undefined;
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

exports.findRepository = findOneRepository;

function findOneRepository(provider, options, password, callback) {

    var deferrer = q.defer();

    const URL = Provider.getUrl("all_repositories", provider, options.organization, options.repository);
    const JSON = getAuthJSON(options.username, password);
    requestify.get(URL, JSON).then(function(response) {
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


exports.getLastCommits = function(env, options, password, callback) {
    var deferrer = q.defer();

    getAllRepositories(env, options, password, function(err, repositories) {

        if (err) {
            deferrer.reject(err);
        } else {
            let finished = 0;
            let results = [];

            const length_of_array = repositories.length;
            for (var i = 0; i < repositories.length; i++) {
                getLastCommitOfRepository(repositories[i], env, options, password, function(err, last_commit) {
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
        }
    });
    deferrer.promise.nodeify(callback);
    return deferrer.promise;
}






function getLastCommitOfRepository(repository, provider, options, password, callback) {

    var deferrer = q.defer();

    options.repository = repository.name;
    const URL = Provider.getUrl("commits", provider, options.organization, options.repository);
    const JSON = getAuthJSON(options.username, password);
    requestify.get(URL, JSON).then(function(response) {
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





exports.getIssues = function(env, options, password, callback) {

    var deferrer = q.defer();

    if (options.repository) {
        // get issues from the selected repository if it exists
        findOneRepository(env, options, password, function(err, repository) {
            if (err) {
                deferrer.reject(err);
            } else {
                if (!repository) {
                    deferrer.resolve(false);
                }
                let results = [];
                getIssuesOfRepository(repository, env, options, password, function(err, issues) {
                    if (err) {
                        empty_issues = [];
                        results.push(empty_issues);
                        deferrer.resolve(results);
                    } else {
                        results.push(issues);
                        deferrer.resolve(results);
                    }
                });
            }
        });
        deferrer.promise.nodeify(callback);
        return deferrer.promise;
    } else {
        // get issues from all repositories
        getAllRepositories(env, options, password, function(err, repositories) {

            if (err) {
                deferrer.reject(err);
            } else {
                let finished = 0;
                let results = [];
                const length_of_array = repositories.length;
                for (var i = 0; i < repositories.length; i++) {
                    getIssuesOfRepository(repositories[i], env, options, password, function(err, issues) {
                        if (err) {
                            empty_issues = [];
                            results.push(empty_issues);
                            finished += 1;
                            if (finished == length_of_array) {
                                deferrer.resolve(results);
                            }
                        } else {
                            results.push(issues);
                            finished += 1;
                            if (finished == length_of_array) {
                                deferrer.resolve(results);
                            }
                        }
                    });
                }

            }
        });
        deferrer.promise.nodeify(callback);
        return deferrer.promise;
    }

}


function getIssuesOfRepository(repository, provider, options, password, callback) {

    var deferrer = q.defer();

    const URL = Provider.getUrl("issues", provider, options.organization, repository.name);
    const JSON = getAuthJSON(options.username, password);
    requestify.get(URL, JSON).then(function(response) {
        // Get the response body
        const value = Provider.getValue("issues", provider, options);
        let repository_with_issues = repository;

        let issues = [];
        if (value)
            issues = response.getBody()[value];
        else
            issues = response.getBody();

        repository_with_issues.number_of_issues = issues.length;
        repository_with_issues.issues = issues;
        deferrer.resolve(repository_with_issues);
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

exports.getPulls = function(env, options, password, callback) {

    var deferrer = q.defer();

    if (options.repository) {
        // get pulls from the selected repository if it exists
        findOneRepository(env, options, password, function(err, repository) {
            if (err) {
                deferrer.reject(err);
            } else {
                if (!repository) {
                    deferrer.resolve(false);
                }
                let results = [];
                getPullsOfRepository(repository, env, options, password, function(err, pulls) {
                    if (err) {
                        empty_pulls = [];
                        results.push(empty_pulls);
                        deferrer.resolve(results);
                    } else {
                        results.push(pulls);
                        deferrer.resolve(results);
                    }
                });
            }
        });
        deferrer.promise.nodeify(callback);
        return deferrer.promise;
    } else {
        // get pulls from all repositories
        getAllRepositories(env, options, password, function(err, repositories) {

            if (err) {
                deferrer.reject(err);
            } else {
                let finished = 0;
                let results = [];
                const length_of_array = repositories.length;
                for (var i = 0; i < repositories.length; i++) {
                    getPullsOfRepository(repositories[i], env, options, password, function(err, pulls) {
                        if (err) {
                            deferrer.reject(err);
                        } else {
                            results.push(pulls);
                            finished += 1;
                            if (finished == length_of_array) {
                                deferrer.resolve(results);
                            }
                        }
                    });
                }
            }
        });
        deferrer.promise.nodeify(callback);
        return deferrer.promise;
    }

}

function getPullsOfRepository(repository, provider, options, password, callback) {

    var deferrer = q.defer();

    const URL = Provider.getUrl("pulls", provider, options.organization, repository.name);
    const JSON = getAuthJSON(options.username, password);
    requestify.get(URL, JSON).then(function(response) {
        // Get the response body
        const value = Provider.getValue("pulls", provider, options);
        let repository_with_pulls = repository;

        let pulls = [];
        if (value)
            pulls = response.getBody()[value];
        else
            pulls = response.getBody();
        repository_with_pulls.number_of_pulls = pulls.length;
        repository_with_pulls.pulls = pulls;
        deferrer.resolve(repository_with_pulls);
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

exports.getCollaborator = function getMaxCollaborator(env, options, password, callback) {
    var deferrer = q.defer();
    getAllCommitsOfRepositories(env, options, password, function selectCollaborator(err, commits) {

        if (err) {
            deferrer.reject(err);

        } else {

            const collaborator_params = Provider.getCollaboratorParams(env, false);
            let collaborators = {};
            let max_collaborator = {
                count: -1
            };
            for (var i = 0; i < commits.length; i++) {
                const username = Parser.getParamFromJson(commits[i], collaborator_params[2]);
                const name = Parser.getParamFromJson(commits[i], collaborator_params[0]);
                const mail = Parser.getParamFromJson(commits[i], collaborator_params[1]);
                //Check if username has been added already
                if (!collaborators[username]) {
                    collaborators[username] = {
                        count: 0
                    };
                }
                collaborators[username].count = collaborators[username].count + 1;
                collaborators[username].name = name;
                collaborators[username].mail = mail;

                //check if it is the max collaborator
                if (max_collaborator.count < collaborators[username].count) {
                    max_collaborator.count = collaborators[username].count;
                    max_collaborator.name = name;
                    max_collaborator.mail = mail;
                    max_collaborator.username = username;
                }
            }
              deferrer.resolve(max_collaborator);
        }
    });
    deferrer.promise.nodeify(callback);
    return deferrer.promise;

}

function getAllCommitsOfRepositories(env, options, password, callback) {
    var deferrer = q.defer();
    getAllRepositories(env, options, password, function(err, repositories) {

        if (err) {
            deferrer.reject(err);
        } else {
            let finished = 0;
            let results = [];

            const length_of_array = repositories.length;
            for (var i = 0; i < repositories.length; i++) {
                getAllCommitsOfRepository(repositories[i], env, options, password, function(err, repository_with_commits) {
                    if (err) {
                        deferrer.reject(err);
                    } else {
                        results = results.concat(repository_with_commits.commits);
                        finished += 1;
                        if (finished == length_of_array) {
                            deferrer.resolve(results);
                        }
                    }
                });
            }
        }
    });
    deferrer.promise.nodeify(callback);
    return deferrer.promise;
}

function getAllCommitsOfRepository(repository, provider, options, password, callback) {

    var deferrer = q.defer();

    options.repository = repository.name;
    const URL = Provider.getUrl("commits", provider, options.organization, options.repository);
    const JSON = getAuthJSON(options.username, password);
    requestify.get(URL, JSON).then(function(response) {
        // Get the response body
        const value = Provider.getValue("commits", provider, options);
        let repository_with_commits = repository;

        let commits = [];
        if (value)
            commits = response.getBody()[value];
        else
            commits = response.getBody();
        repository_with_commits.commits = commits;
        deferrer.resolve(repository_with_commits);
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

function getAuthJSON(username, password) {
    if (username) {
        return {
            auth: {
                username: username,
                password: password
            }
        };
    }
    return {};
}
