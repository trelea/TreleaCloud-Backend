const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB })
    .then(() => console.log('Connected To Database'))
    .catch(err => console.error(err))