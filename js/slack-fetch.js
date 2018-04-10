var args = getURLparam(location.search.substring(1).split('&'));
var token = getAccessToken();


function getURLparam(pair){
    var arg = new Object;
    for(var i = 0;pair[i];i++) {
        var kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
    return arg;
}

function getToken(client_id, client_secret, code){
    return fetch("https://slack.com/api/oauth.access?client_id="+ client_id "+&client_secret=" + client_secret + "&code=" + code).then(function(response) {
        return JSON.parse(response.json()||"null");;
    }).then(function(json) {
        return json["access_token"];
    });
}
