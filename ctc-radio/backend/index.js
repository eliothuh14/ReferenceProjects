const express = require('express');
const bodyparser = require('body-parser');
var session = require('express-session');
const app = express();
var cors = require('cors');


app.use(bodyparser.json());
app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true
}));



app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));

const admin = require('firebase-admin');
const serviceAccount = require('./config/ctc-radio-eb90386e8175.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const auth_routes = require('./routes/auth');

auth_routes(app, db);

app.get(
    '/', 
    (req, res) => {
        console.log("Index page")
        console.log(req.session.username);
        return res.status(200).json({ message: "Application is running"});
    }
)

app.listen(3000, () => {
    console.log("Its alive!");
})


