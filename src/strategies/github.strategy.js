const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GithubUser = require('../models/user.github.model');

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: 'https://trelea-dev.serveo.net/api/v1/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const githubUser = await GithubUser.find({ profile })
        if (githubUser.length === 0) await GithubUser.create({ profile })
        done(null, { profile })
    })
);