const isAuthorized = (req, res, next) => {
    if (!req?.user && !req?.session?.passport?.user) return res.status(401).end();
    next();
}

module.exports = isAuthorized;

