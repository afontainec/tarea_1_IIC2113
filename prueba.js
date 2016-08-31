var requestify = require('requestify');

requestify.get('https://api.github.com/orgs/IIC2113-2016-2/repos').then(function(response) {
    // Get the response body
    console.log("-----------");
    console.log(response.getBody());
    console.log("============");

});
