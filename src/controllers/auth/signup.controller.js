const User = require('../../models/user.model');
const bycrypt = require('bcrypt');
const { validationResult } = require('express-validator');



const signup = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ msg: err.array() }).end();

    const user = await User.findOne({ $or: [{ user_name: req.body.user_name }, { user_email: req.body.user_email }]}).exec();
    if (user) return res.status(201).json({ msg: 'Used Credentials'}).end();

    req.body.user_password = bycrypt.hashSync(req.body.user_password, bycrypt.genSaltSync(10));

    const { _id } = (await User.create(req.body)).save();
    return res.status(200).json({ msg: 'New User Created', _id }).end();
}

module.exports = signup;