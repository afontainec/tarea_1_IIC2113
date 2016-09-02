//Layer 1: Business Logic/interpreter.js

const logic = require('./logic');
const Provider = require('../Layer 2: Data-access/providerAccess');
const Parser = require('./parser');
const Printer = require('../Layer 0: user_interface/printer');



exports.allRepositories = function getAllRepositories(env, options) {

    logic.getRepositories(env, options, function(err, response) {
        if (err) {
            // FIXME: PRINT ERROR
            console.log(err);
            return err;
        }

        const params = Provider.getParams("all_repositories", env, options.info);
        const parsed_response = Parser.parseRepositories(response, params, options);

        Printer.printAllRepositories(parsed_response, env, options);


    });
};

exports.findRepository = function getAllRepositories(env, options) {

    logic.findRepository(env, options, function(err, response) {
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

exports.lastCommits = function(env, options) {

    logic.getLastCommits(env, options, function(err, response) {
        if (err) {
            console.log(Printer.Error(err));
            return err;
        }

        const params = Provider.getParams("all_repositories", env, false);
        const commit_params = Provider.getParams("commits", env, false);

        const parsed_response = Parser.parseRepositoriesWithCommit(response, params, commit_params, options);

        Printer.printRepositoriesWithCommit(parsed_response, env, options);



    });
}
