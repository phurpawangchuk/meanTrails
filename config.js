require('dotenv').config();

module.exports.configGitHub = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email', 'username', 'name']
}

module.exports.configFacebook = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
    // profileFields: ['id', 'displayName', 'photos', 'email', 'username', 'name']
}

module.exports.configGoogle = {
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
    // profileFields: ['id', 'displayName', 'photos', 'email', 'username', 'name']
}

module.exports.configLinkIn = {
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL
}
