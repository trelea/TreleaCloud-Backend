const { Client, ConnectToBucket } = require('../../services/mongo.files.service');
const { DBRef } = require('mongodb')


const getCloudContent = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    ConnectToBucket()
        .then(async ({ files }) => {
            const userFiles = await files.find({ 'metadata.user': user }).sort({ uploadDate: -1 }).toArray();
            Client.close();
            return res.status(200).json(userFiles).end();
        })
}

module.exports = { getCloudContent };