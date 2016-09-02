exports.printAllRepositories = function(repositories, env, options) {

    console.log("**************************************************************************");
    console.log("Repositories of organization " + options.organization + " in provider " + options.provider);
    console.log(options.info);
    for (var i = 0; i < repositories.length; i++) {
        printRepository(repositories[i], options.info);
    }
    console.log("**************************************************************************");
}


function printRepository(repository, extended, showCommit) {
    console.log("---------------------------------------------");
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
    console.log("---------------------------------------------");
}

exports.printRepository = printRepository;
