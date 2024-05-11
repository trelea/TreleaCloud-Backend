const mongoose = require('mongoose');
const { Schema } = mongoose;

const facebookUserSchema = new Schema({
    profile: {
        type: Object,
        required: true,
    }
}, { timestamps: true });

const facebookUser = mongoose.model('FacebookUsers', facebookUserSchema);
module.exports = facebookUser;