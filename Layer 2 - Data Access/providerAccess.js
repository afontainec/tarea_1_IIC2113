//Layer:2 Data-access/providerAccess.js

const Provider = require('../Layer 3 - Data/providers');


exports.getUrl = function(attribute, provider, organization, repository) {
    let URL = Provider.map[provider].host;
    let path = replacements(Provider.map[provider][attribute].path, organization, repository);
    return URL + path;
}


function replacements(str, organization, repository) {
    var replacements = {
        "%organization%": organization,
        "%repository%": repository
    };
    str = str.replace(/%\w+%/g, function(all) {
        return replacements[all] || all;
    });
    return str;
}

exports.getParams = function (attribute, provider, extended){
  params = Provider.map[provider][attribute].params;
  if(extended)
    params = params.concat(Provider.map[provider][attribute].extended_params);

  return params;
}


exports.getValue = function (attribute, provider, extended){
  return Provider.map[provider][attribute].value;
}
