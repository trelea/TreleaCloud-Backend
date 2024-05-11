const { Router } = require('express');
const router = Router();
const passport = require('passport');


const signupController = require('../controllers/auth/signup.controller');
const signinController = require('../controllers/auth/signin.controller');
const signoutController = require('../controllers/auth/signout.controller');
const isAuthorized = require('../services/authorized.service');


// LOCAL AUTHENTICATION
router.post('/signup',  signupController);
router.post('/signin',  passport.authenticate('local'), signinController);
router.post('/signout', isAuthorized, signoutController);


// GOOGLE AUTHENTICATION
router.get(
    '/google',
    passport.authenticate('google', { scope: 'profile' })
);
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), 
    (req, res) => { res.status(200).json(req.session.passport.user).end() }
);


// FACEBOOK AUTHENTICATION
router.get(
    '/facebook',
    passport.authenticate('facebook')
);
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }), 
    (req, res) => { res.status(200).json(req.session.passport.user).end() }
);


// GITHUB AUTHENTICATION 
router.get(
    '/github',
    passport.authenticate('github')
);
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => { res.status(200).json(req.session.passport.user).end() }
);


module.exports = router;