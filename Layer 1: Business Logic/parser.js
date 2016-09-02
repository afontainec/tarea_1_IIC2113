////Layer 1: Business Logic/parser.js



function parseRepository(input_json, params, options) {
    let output_json = {
        name: input_json[params[0]],
        description: input_json[params[1]],
        private: input_json[params[2]]
    };

    if (options.info) {
        let extended = {
            created_at: input_json[params[3]],
            clone_url: input_json[params[4]],
            stargazers_count: input_json[params[5]],
            watchers_count: input_json[params[6]],
            open_issues_count: input_json[params[7]],
            forks_count: input_json[params[8]]
        };

        for (var key in extended) {
            output_json[key] = extended[key];
        }
    }

    return output_json;
}

exports.parseRepositories = function(input_array, params, options) {
    let output_array = [];

    for (var i = 0; i < input_array.length; i++) {
        output_array.push(parseRepository(input_array[i], params, options));
    }

    return output_array;
}
