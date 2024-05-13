const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookUser = require('../models/user.facebook.model');


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'https://trelea-dev.serveo.net/api/v1/auth/facebook/callback',
        state: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        let facebookUser = await FacebookUser.find({ profile }).exec();
        if (facebookUser.length === 0) facebookUser = await (await FacebookUser.create({ profile })).save(); 
        done(null, facebookUser);
    })
);