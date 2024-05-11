const mongoose = require('mongoose');

const connectDb = () => {
    // console.log(process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB })
        .then(() => console.log('Connected To Database'))
        .catch(err => console.error(err))
        // .finally(() => console.log(mongoose.connection.readyState))
}

module.exports = connectDb;