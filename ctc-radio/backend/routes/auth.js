const https = require('https');
const querystring = require('querystring');
const request = require('request');


global.globalAuthFlag = false;






module.exports = (app, db) => {

    app.post (
        '/auth/signup', 
        async (req, res) => {

            console.log("got the body:", req.body);

            var email = req.body.email;
            var password = req.body.password;

            console.log("email:", email);
            console.log("password:", password);

            // extract username from email
            var username = email.split("@")[0];
            var host = email.split("@")[1];


            // reject if not CTC email
            if (host != "chicagotrading.com") {
                return res.status(400).json({ message: "must have a CTC email"});
            }

            const cityRef = db.collection('users').doc(username);
            const doc = await cityRef.get();
            if (doc.exists) {
                console.log('username already exists');
                return res.status(400).json({ error: "username already exists"});
            }

            // add it in the database
            console.log("adding new user to the DB");
            const newUserRef = db.collection('users').doc(username);
            await newUserRef.set({
                'username': username,
                'password': password
            });

            return res.status(200).json({ new_user: {username: username, password: password}});
        }
    )

    app.post (
        '/auth/signin', 
        async (req, res) => {

            console.log("got the body:", req.body);

            var email = req.body.email;
            var password = req.body.password;

            var username = email.split("@")[0];

            const cityRef = db.collection('users').doc(username);
            const doc = await cityRef.get();
            if (!doc.exists) {
                console.log('username does not exist');
                return res.status(400).json({ error: "username does not exist"});
            }

            var dbpassword = doc.get("password");

            if (password != dbpassword) {
                return res.status(400).json({ error: "incorrect password"});
            }

            req.session.username = username;
            console.log(req.session.username);
            return res.status(200).json({ successful: "user successfully logged in"});
        }
    )

    app.post (
        '/auth/signout', 
        async (req, res) => {

            console.log(req.session.username);
            if(!req.session.username){
                console.log("need to login");
                res.redirect('/auth/signin');
                return;
            }

            console.log("destroying session")
            req.session.destroy();
            res.redirect('/')
        }
    )

    app.post (
        '/auth/spotifytoken',
        async (req, resp) => {
            if(!req.session.username){
                console.log("need to login");
                res.redirect('/');
                return;
            }
            const tokenRef= db.collection('spotify').doc('tokens');
            const refreshToken = tokenRef.get("refresh_token");
            const token = tokenRef.get("token");

            var form = {
                "grant_type": "refresh_token",
                "refresh_token": refreshToken
            };


            const options = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Basic YWQ5NTlhMzE5YmExNGE4MWE0ZjE5NTBkNDZmNDlhZWU6MjAxYWQ0NjJkOGM2NDM1M2JkNTJjNWFkOGVjYjJiZmU='}
            };

            data = {grant_type: "refresh_token", refresh_token: "AQCx9H9VyD0X3INmafleqgpYSx9OnVMhlQRxr1PMrtSKaA5E2hMHje2FlXHn82xrt5yp8HB_iS2M9vCopj5kmWB_-iUkw26jTmAMs0J-XCEMsWo6aD9uI-yG3gp4tnQ142w"};

            const axios = require('axios')
            axios.post('https://accounts.spotify.com/api/token', querystring.stringify(data), options)
            .then((res) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
                return res;
            })
            .then((res) => {
                console.log("adding new user to the DB");
                const newUserRef = db.collection('spotify').doc("tokens");
                newUserRef.set({
                    'token': res.data.access_token,
                });
                return resp.status(200).json({ successful: "access token set"});
            })
            .catch((error) => {
                console.error(error)
            })
        }
    )

    app.get(
        '/auth/token', 
        async (req, res) => {
            const tokenRef= db.collection('spotify').doc('tokens');
            const accessToken = await tokenRef.get("refresh_token");
            const token = await tokenRef.get("token");
            const toReturn = accessToken._fieldsProto.token.stringValue;

            return res.status(200).json({ accessToken: toReturn });
        }
    )
    //new stuff
    //test

   

}

    