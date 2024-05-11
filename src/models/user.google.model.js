const mongoose = require('mongoose');
const { Schema } = mongoose;

const googleUserSchema = new Schema({
    profile: {
        type: Object,
        required: true,
    }    
}, { timestamps: true });

const googleUser = mongoose.model('GoogleUsers', googleUserSchema);
module.exports = googleUser;