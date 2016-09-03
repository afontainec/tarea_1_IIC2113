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

function printIssues(repository) {
    console.log("Issues:");
    if (repository.issues.length == 0){
        console.log(" No issues in this repository");
    } else {
        for (var i = 0 ; i < repository.issues.length; i++){
            console.log(" Issue "+i);
            printIssue(repository.issues[i]);
        }
    }

}

function printIssue(issue){
    console.log("  Title: "+issue.title);
    console.log("  Created Date: "+issue.date);
    console.log("  Author: "+issue.author);
    console.log("  State: "+issue.state);
    console.log("  Labels: ");
    if (issue.labels.length == 0){
        console.log("   This issue has no labels");
    } else{
        for (var i = 0; i < issue.labels.length; i++){
            console.log("   Label "+i);
            printLabel(issue.labels[i]);
        }
    }
}

function printLabel(label){
    console.log("    Name: "+label.name);
    console.log("    Color: "+label.color);
}

function printPulls(repository) {
    console.log("Pull Requests:");
    if (repository.pulls.length == 0){
        console.log(" No pull requests in this repository");
    } else {
        for (var i = 0 ; i < repository.pulls.length; i++){
            console.log(" Pull Request "+i);
            printPull(repository.pulls[i]);
        }
    }

}

function printPull(pull){
    console.log("  Title: "+pull.title);
    console.log("  Created Date: "+pull.date);
    console.log("  User: "+pull.user);
    console.log("  State: "+pull.state);
    console.log("  Base Branch: "+pull.basebranch);
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

exports.error = function Error(error) {
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

exports.printRepositoriesWithIssues = function(repositories, env, options) {
    console.log("**************************************************************************");
    console.log("Repositories with the issues of organization " + options.organization + " in provider " + env);
    if (options.repository){
        console.log(" In repository "+options.repository);
    }
    if (options.author){
        console.log(" By "+options.author);
    }
    if (options.date){
        console.log(" On "+options.date);
    }
    if (options.state){
        console.log(" With state "+options.state);
    }
    if (options.label){
        console.log(" With label "+options.label);
    }
    for (var i = 0; i < repositories.length; i++) {
        console.log("---------------------------------------------");
        printRepository(repositories[i], false);
        printIssues(repositories[i]);
        console.log("---------------------------------------------");
    }
    console.log("**************************************************************************");
}

exports.printRepositoriesWithPulls = function(repositories, env, options) {
    console.log("**************************************************************************");
    console.log("Repositories with the pulls of organization " + options.organization + " in provider " + env);
    if (options.repository){
        console.log(" In repository "+options.repository);
    }
    if (options.author){
        console.log(" By "+options.author);
    }
    if (options.state){
        console.log(" With state "+options.state);
    }
    if (options.basebranch){
        console.log(" In base branch "+options.basebranch);
    }
    for (var i = 0; i < repositories.length; i++) {
        console.log("---------------------------------------------");
        printRepository(repositories[i], false);
        printPulls(repositories[i]);
        console.log("---------------------------------------------");
    }
    console.log("**************************************************************************");
}
