exports.providers = {
  github: {
    host: 'https://api.github.com',
    all_repositories: {
      path_before: '/orgs/',
      path_after: '/repos',
      // path: '/orgs/{ORG}/repos',
      params: ['name', 'private', 'description'],
      extended_params: ['created_at', 'clone_url', 'stargazers_count',
                        'watchers_count', 'open_issues_count', 'forks_count'],
    },
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
};
