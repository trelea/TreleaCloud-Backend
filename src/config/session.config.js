
module.exports = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}