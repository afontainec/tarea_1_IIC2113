exports.map = {
    github: {
      host: "https://api.github.com",
      //rf2 and rf4
      all_repositories: {
        path: "/orgs/%organization%/repos",
        value: false,
        params: ["name", "description", "private"],
        //for rf4
        extended_params: ['clone_url', 'stargazers_count',
                          'watchers_count', 'open_issues_count', 'forks_count'],
      },
    commits: {
      path_before: "/repos/",
      path_after: "/commits",
      params: [],
    }
      //


    },

    bitbucket: {
      host: 'https://api.bitbucket.org',
      all_repositories: {
        path: "/2.0/repositories/%organization%",
        value: "values",
        // path: '/orgs/{ORG}/repos',
        params: ['name', '', 'is_private'],
        extended_params: ['', '', '',
                          '', '', ''],
      },
    },

}
