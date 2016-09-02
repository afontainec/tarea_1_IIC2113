exports.printAllRepositories = function(repositories, env, options) {

    console.log("**************************************************************************");
    console.log("Repositories of organization " + options.organization + " in provider " + env);
    for (var i = 0; i < repositories.length; i++) {
        console.log("---------------------------------------------");
        printRepository(repositories[i], options.info);
        console.log("---------------------------------------------");
    }
    console.log("**************************************************************************");
}


function printRepository(repository, extended, showCommit) {
    console.log("Name: " + repository.name);
    console.log("Description: " + repository.description);
    if (repository.private)
        console.log('This is a private repository');
    else
        console.log('This is a public repository');

    if (extended) {
        console.log("More info:");
        console.log(' Created: ' + repository.created_at);
        console.log(' Clone URL: ' + repository.clone_url);
        console.log(' Number of stargazers: ' + repository.stargazers_count);
        console.log(' Number of watchers: ' + repository.watchers_count);
        console.log(' Number of open issues: ' + repository.open_issues_count);
        console.log(' Number of forks: ' + repository.forks_count);;
    }

}

function printCommit(repository) {
    console.log("Last Commit:");
    console.log(" Name: " + repository.commit.name);
    console.log(" Hash: " + repository.commit.sha);
    console.log(" Date: " + repository.commit.date);

}

exports.printOneRepository = function(repository, env, options) {
    console.log("**************************************************************************");
    console.log("Repository " + options.repository + " exists in organization " + options.organization + " in provider " + env);
    printRepository(repository, false, false);
    console.log("**************************************************************************");
}

exports.NoRepository = function(env, options) {

    console.log("**************************************************************************");
    console.log("Repository " + options.repository + " does not exist in organization " + options.organization + " in provider " + env);
    console.log("**************************************************************************");

}

exports.error = function error(error) {
    console.log("**************************************************************************");
    console.error("There has been an error");
    console.error(error);
    console.log("**************************************************************************");
};

exports.printRepositoriesWithCommit = function(repositories, env, options) {
    console.log("**************************************************************************");
    console.log("Repositories with last commit of organization " + options.organization + " in provider " + env);
    for (var i = 0; i < repositories.length; i++) {
        console.log("---------------------------------------------");
        printRepository(repositories[i], false);
        printCommit(repositories[i]);
        console.log("---------------------------------------------");
    }
    console.log("**************************************************************************");
}
