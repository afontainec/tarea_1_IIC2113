exports.provider_map = {
    github: {
      host: "https://api.github.com",
      //rf2 and rf4
      all_repositories{
        path_before: "/orgs/",
        path_after: "/repos",
        path: "/orgs/:organization/repos"
        params: ["name", "description", "private"],
        //for rf4
        extended_params: ['created_at', 'clone_url', 'stargazers_count',
                          'watchers_count', 'open_issues_count', 'forks_count'],
      },
    commits{
      path_before: "/repos/",
      path_after: "/commits",
      params: [],
    }
      //


    },

    bitbucket: {
      host: '',
      all_repositories: {
        path_before: '',
        path_after: '',
        // path: '/orgs/{ORG}/repos',
        params: ['', '', ''],
        extended_params: ['', '', '',
                          '', '', ''],
      },
    },

}
