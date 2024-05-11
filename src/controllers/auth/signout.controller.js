const signout = (req, res, next) => {
    res.clearCookie('connect.sid');
    req.logout((err) => {
        if (err) next(err);
        req.session.destroy((err) => {
            if (err) next(err);
            res.redirect('/')
        })
    })
}

module.exports = signout;