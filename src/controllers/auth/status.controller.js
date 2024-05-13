const checkStatus = (req, res, next) => {
    return res.status(200).json(req?.session?.passport?.user).end();
}

module.exports = { checkStatus };