const signin = (req, res, next) => {
    res.status(200).json(req.session.passport.user).end();
}

module.exports = signin;