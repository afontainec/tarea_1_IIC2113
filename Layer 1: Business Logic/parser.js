////Layer 1: Business Logic/parser.js


function parseRepository(input_json, params, options) {
    let output_json = {
        name: getParam(input_json, params[0]),
        description: getParam(input_json, params[1]),
        private: getParam(input_json, params[2])
    };

    if (options.info) {
        let extended = {
            created_at: getParam(input_json, params[3]),
            clone_url: getParam(input_json, params[4]),
            stargazers_count: getParam(input_json, params[5]),
            watchers_count: getParam(input_json, params[6]),
            open_issues_count: getParam(input_json, params[7]),
            forks_count: getParam(input_json, params[8])
        };

        for (var key in extended) {
            output_json[key] = extended[key];
        }
    }

    return output_json;
}




function getParam(json, param_path) {

    const keys = param_path.split('&');

    let param = json;
    for (var i = 0; i < keys.length; i++) {
        param = param[keys[i]];
    }

    return param;

}

exports.parseRepository = parseRepository;

exports.parseRepositories = function(input_array, params, options) {
    let output_array = [];

    for (var i = 0; i < input_array.length; i++) {
        output_array.push(parseRepository(input_array[i], params, options));
    }

    return output_array;
}

exports.parseRepositoriesWithCommit = function(input_array, params, commit_params, options) {
    let output_array = [];

    for (var i = 0; i < input_array.length; i++) {
        output_array.push(parseRepositoryWithCommit(input_array[i], params, commit_params, options));
    }

    return output_array;
}

function parseRepositoryWithCommit(input_json, params, commit_params, options) {
    options.info = false;
    output_json = parseRepository(input_json, params, options);
    output_json.commit = {
        sha: getParam(input_json, "last_commit&" + commit_params[0]),
        name: getParam(input_json, "last_commit&" + commit_params[1]),
        date: getParam(input_json, "last_commit&" + commit_params[2]),
    };

    console.log(output_json);

    return output_json;
}
