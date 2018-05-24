var args = getURLparam(location.search.substring(1).split('&'));
var cookies = getCookieObject(document.cookie);
var token = null;

if ("token" in cookies) {
    token = cookies["token"];
} else {
    /* client_idの確認代入処理 「"" < cookiesの中身 < URLパラメータ」 の優先順位で代入,最後に代入した値でcookieを更新 */
    var client_id =
        "client_id" in args ? args["client_id"] :
        "client_id" in cookies ? cookies["client_id"] :
        "";
    document.cookie = "client_id=" + encodeURIComponent(client_id) + "; max-age=604800";

    /* client_secretの確認代入処理 「"" < cookiesの中身 < URLパラメータ」 の優先順位で代入,最後に代入した値でcookieを更新 */
    var client_secret = "client_secret" in args ? args["client_secret"] :
        "client_secret" in cookies ? cookies["client_secret"] :
        "";
    document.cookie = "client_secret=" + encodeURIComponent(client_secret) + "; max-age=604800";

    /* codeの確認処理 「"" < cookiesの中身 < URLパラメータ」 の優先順位で代入,最後に代入した値でcookieを更新 */
    var code = "code" in args ? args["code"] : getCode(client_id, "channels:history");

    /* access_token取得 */
    getToken(client_id, client_secret, code).then(function (res_token) {
        token = res_token;
    }).then(function(){
        cookies = getCookieObject(document.cookie);
        document.cookie = "token=" + encodeURIComponent(token) + "; max-age=604800";
    });
}

function getURLparam(pair) {
    var arg = new Object;
    for (var i = 0; pair[i]; i++) {
        var kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
    return arg;
}

function getCookieObject(cookie_str) {
    var cookies = new Object();
    cookie_str.split(';').forEach(function (value) {
        var key_value = value.split("=");
        cookies[key_value[0]] = key_value[1]
    })
    return cookies;
}

function getCode(client_id, scope) {
    window.alert("Slack認証画面へ移ります");
    location.href = "https://slack.com/oauth/authorize?client_id=" + client_id + "&scope=" + scope;
}

// 返り値 fetchしてきたaccess_tokenを返り値に含むPromiseオブジェクト
function getToken(client_id, client_secret, code) {
    return fetch("https://slack.com/api/oauth.access?client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + code).then(function (response) {
        return response.text();
    }).then(function (json) {
        json = JSON.parse(json||"null");
        return "access_token" in json ? json.access_token : null;
    });
}
