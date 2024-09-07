require('dotenv').config();
require('./api/dbconnection');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
const routes = require('./api/routes');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//=========Passport==================================
const passport = require('passport');
const config = require('./config');
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
const GitHubStrategy = require('passport-github').Strategy;
// app.use(passport.initialize());
// app.use(passport.session());
passport.use(new GitHubStrategy(config.configGitHub,
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy(config.configFacebook,
    function (accessToken, refreshToken, profile, cb) {
        console.log("FB==", profile)
        return cb(null, profile);
    }
));

const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy(config.configGoogle,
    function (accessToken, refreshToken, profile, cb) {
        console.log("Google==", profile)
        return cb(null, profile);
    }
));

const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
passport.use(new LinkedInStrategy(config.configLinkIn,
    function (accessToken, refreshToken, profile, cb) {
        console.log("LinkIn==", profile)
        return cb(null, profile);
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});
//=====================================================

// app.use('/', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//     res.header('Access-Control-Allow-Methods', process.env.ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', process.env.ALLOWED_HEADERS);
//     next();
// })

app.use('/api', routes);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log("Server running on port", port);
})