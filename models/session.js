// models/session.js

const http = require('http');


exports.login = function factoryLogin(env, username, password) {
  if (env == 'github')
    githubLogin(username, password);
};

function githubLogin(username, password) {
  console.log('loggin wiht git');
    // const options = {
    //     host: 'https://api.github.com',
    //     // This is the only line that is new. `headers` is an object with the headers to request
    //     headers: {
    //         'afontainec'}
    // };
    //
    //
    // const req = http.request(options, function callback() {
    //     let str = '';
    //     response.on('data', function(chunk) {
    //         str += chunk;
    //     });
    //
    //     response.on('end', function() {
    //         console.log(str);
    //     });
    // });
    // req.end();
}
