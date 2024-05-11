function poweredBy(req, res, next) {
    res.header('X-Powered-By', 'Trelea-FullStack-Dev');
    next();
}

module.exports = poweredBy;