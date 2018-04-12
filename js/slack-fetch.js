var args = getURLparam(location.search.substring(1).split('&'));
var cookies = getCookieObject(document.cookie);
var token = "";

if("token" in cookies){
    token = cookies["token"];
}else{
    var client_id =
        "client_id" in args ? args["client_id"]
        : "client_id" in cookies ? cookies["client_id"]
        : "";
    document.cookie = "client_id=" + client_id + "; max-age=604800";
    var client_secret = "client_secret" in args ? args["client_secret"]
        : "client_secret" in cookies ? cookies["client_secret"]
        : "";
    document.cookie = "client_secret=" + client_secret + "; max-age=604800";
    var code = "code" in args ? args["code"]
        : "code" in cookies ? cookies["code"]
        : getCode(client_id, "channels:history");
    token = getToken(client_id, client_secret, code);
}
document.cookie = "token=" + token + "; max-age=604800";

function getURLparam(pair){
    var arg = new Object;
    for(var i = 0; pair[i]; i++) {
        var kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
    return arg;
}

function getCookieObject(cookie_str){
    var cookies = new Object();
    cookie_str.split(';').forEach(function(value){
        var key_value = value.split("=");
        cookies[key_value[0]] = key_value[1]
    })
    return cookies;
}

function getCode(client_id, scope){
   location.href = "https://slack.com/oauth/authorize?client_id=" + client_id + "&scope=" + scope;
}

function getToken(client_id, client_secret, code){
    var token = "";
    fetch("https://slack.com/api/oauth.access?client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + code).then(function(response) {
        return JSON.parse(response.json()||"null");
    }).then(function(json) {
        token = json["access_token"];
    });
return token;
}
