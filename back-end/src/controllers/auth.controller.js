var path = require("path");
var request = require('request'); // "Request" library
var querystring = require('querystring');
require("dotenv").config({ path: path.resolve(process.cwd(), "./src/.env") });

var client_id = process.env.client_id;
var client_secret = process.env.client_secret;

var redirect_uri = 'http://localhost:4000/authenticate/callback'; // Your redirect uri

refreshToken = (req, res) => {
    const refresh_token = req.params.refresh_token;
    const grant_type = "refresh_token";

    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            grant_type: grant_type,
            refresh_token: refresh_token
        },
        headers: {
            "Authorization": "Basic " + (new Buffer(client_id + ":" + client_secret).toString('base64'))
        },
        json: true
    }

    request.post(authOptions, (erro, response, body) => {
        if (!erro && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;

            res.status(200).send({ access_token: access_token, refresh_token: refresh_token });

        } else {
            res.status(200).send({ erro: erro });
        }
    })

}

authenticate = (req, res) => {

    console.log(path.resolve(process.cwd(), "./src/.env"));
    // your application requests authorization
    var scopes = 'user-read-private user-read-email user-library-read user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative';
    var strRed = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri
        });

    res.redirect(strRed);

}

callback = (req, res) => {
    const { code, state } = req.query;
    const grant_type = "authorization_code";

    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            grant_type: grant_type,
            code: code,
            redirect_uri: redirect_uri
        },
        headers: {
            "Authorization": "Basic " + (new Buffer(client_id + ":" + client_secret).toString('base64'))
        },
        json: true

    }

    request.post(authOptions, (erro, response, body) => {
        if (!erro && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;

            res.redirect("http://localhost:3000/?" +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                })
            );
        }
    })

}

module.exports = {
    authenticate,
    callback,
    refreshToken
}