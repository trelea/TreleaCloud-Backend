const mongoose = require('mongoose');
const { Schema } = mongoose;

const githubUserSchema = new Schema({
    profile: {
        type: Object,
        required: true
    }
}, { timestamps: true })

const githubUser = mongoose.model('GithubUser', githubUserSchema);
module.exports = githubUser;
