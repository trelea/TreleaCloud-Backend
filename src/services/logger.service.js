function logger(req, res, next) {
    console.log(`Req: ${req.ip.split(':').pop()} => [ ${req.method} ${req.protocol}://${req.hostname}${req.url} ]`)
    next();
}

module.exports = logger;