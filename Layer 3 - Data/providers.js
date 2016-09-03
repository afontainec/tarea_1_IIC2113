exports.map = {
    github: {
        host: "https://api.github.com",
        //rf2 and rf4
        all_repositories: {
            path: "/orgs/%organization%/repos",
            value: false,
            params: ["name", "description", "private"],
            //for rf4
            extended_params: ['created_at', 'clone_url', 'stargazers_count',
                'watchers_count', 'open_issues_count', 'forks_count'
            ],
        },
        commits: {
            path: "/repos/%organization%/%repository%/commits",
            value: false,
            params: ['sha', 'commit&author&name', 'commit&author&date']
        },
        issues: {
            path: "/repos/%organization%/%repository%/issues?state=all",
            value: false,
            params:['title', 'created_at', 'state' ,'user&login']
        }
    },

    bitbucket: {
        host: 'https://api.bitbucket.org',
        all_repositories: {
            path: "/2.0/repositories/%organization%",
            value: "values",
            // path: '/orgs/{ORG}/repos',
            params: ['values&name', '', 'values&is_private'],
            extended_params: ['', '', '',
                '', '', ''
            ],
        },
    },

}
