const { Client, ConnectToBucket } = require('../../services/mongo.files.service');
const { DBRef } = require('mongodb')



const getCloudContent = async (req, res, next) => {
    ConnectToBucket()
        .then(async (bucket) => {
            const userFiles = await bucket.find({}, { metadata: true, _id: false}).toArray()
            console.log(userFiles)
            Client.close()
            return res.status(200).json(userFiles).end();

        })
}

module.exports = { getCloudContent };