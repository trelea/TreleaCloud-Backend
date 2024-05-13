const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../models/user.google.model');


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://trelea-dev.serveo.net/api/v1/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        let googleUser = await GoogleUser.find({ profile }).exec();
        if (googleUser.length === 0) googleUser = await (await GoogleUser.create({ profile })).save();
        done(null, googleUser);
    })
);