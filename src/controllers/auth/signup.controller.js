const User = require('../../models/user.model');
const signupValidation = require('../../config/signup.body.validation');
const bycrypt = require('bcrypt')


const signup = async (req, res, next) => {
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json({ msg: error.message }).end();

    const user = await User.findOne({ $or: [{ user_name: req.body.user_name }, { user_email: req.body.user_email }]}).exec()
    if (user) return res.status(201).json({ msg: 'Used Credentials'}).end();

    req.body.user_password = bycrypt.hashSync(req.body.user_password, bycrypt.genSaltSync(10));

    const { _id } = await User.create(req.body);
    return res.status(200).json({ msg: 'New User Created', _id }).end();
}

module.exports = signup;