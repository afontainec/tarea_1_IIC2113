//Layer 1 - Business Logic/interpreter.js

const logic = require('./logic');
const Provider = require('../Layer 2 - Data Access/providerAccess');
const Parser = require('./parser');
const Printer = require('../Layer 0 - User Interface/printer');



exports.allRepositories = function getAllRepositories(env, options, password) {

    logic.getRepositories(env, options, password, function(err, response) {
        if (err) {
            // FIXME: PRINT ERROR
            Printer.Error(err);
            return err;
        }

        const params = Provider.getParams("all_repositories", env, options.info);
        const parsed_response = Parser.parseRepositories(response, params, options);

        Printer.printAllRepositories(parsed_response, env, options);


    });
};

exports.findRepository = function getAllRepositories(env, options, password) {

    logic.findRepository(env, options, password, function(err, response) {
        if (err) {
            Printer.Error(err);
            return err;
        }

        if (!response) {
            Printer.NoRepository(env, options);
            return;
        }

        const params = Provider.getParams("all_repositories", env, false);
        const parsed_response = Parser.parseRepository(response, params, options);

        Printer.printOneRepository(parsed_response, env, options);


    });
};

exports.lastCommits = function(env, options, password) {
    logic.getLastCommits(env, options, password, function(err, response) {
        if (err) {
            Printer.Error(err);
            return err;
        }

        const params = Provider.getParams("all_repositories", env, false);
        const commit_params = Provider.getParams("commits", env, false);

        const parsed_response = Parser.parseRepositoriesWithCommit(response, params, commit_params, options);

        Printer.printRepositoriesWithCommit(parsed_response, env, options);



    });
}

exports.issues = function(env, options, password) {

    logic.getIssues(env, options, password, function(err, response) {
        if (err) {
            Printer.Error(err);

            return err;
        }

        if (options.repository && !response){
            Printer.NoRepository(env, options);
            return;
        }

        const params = Provider.getParams("all_repositories", env, false);
        const issues_params = Provider.getParams("issues", env, false);
        const label_params = Provider.getParams("labels", env, false);

        const parsed_response = Parser.parseRepositoriesWithIssues(response, params, issues_params, label_params, options);

        Printer.printRepositoriesWithIssues(parsed_response, env, options);



    });
}

exports.pulls = function(env, options, password) {

    logic.getPulls(env, options, password, function(err, response) {
        if (err) {
            Printer.Error(err);
            return err;
        }

        if (options.repository && !response){
            Printer.NoRepository(env, options);
            return;
        }

        const params = Provider.getParams("all_repositories", env, false);
        const pulls_params = Provider.getParams("pulls", env, false);

        const parsed_response = Parser.parseRepositoriesWithPulls(response, params, pulls_params, options);

        Printer.printRepositoriesWithPulls(parsed_response, env, options);



    });
}
