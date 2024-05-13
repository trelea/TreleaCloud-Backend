const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bcrypt');
const User = require('../models/user.model');


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


passport.use(
    new LocalStrategy({
        usernameField: 'user_email',
        passwordField: 'user_password',
    }, async (user_email, user_password, done) => {
        const user = await User.findOne({ user_email }).exec();

        if (!user?.user_email) return done(null, false, { msg: "Invalid Credentials" });
        if (!bycrypt.compareSync(user_password, user.user_password)) return done(null, false, { msg: "Invalid Credentials" });

        done(null, user);
    })
);