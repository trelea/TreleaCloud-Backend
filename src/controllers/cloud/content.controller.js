const { Client, GridFSConnection } = require('../../services/mongo.files.service');
const { DBRef } = require('mongodb')


const getCloudContent = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    GridFSConnection()
        .then(async ({ bucket }) => {
            const userFiles = await bucket.find({ 'metadata.user': user }).sort({ uploadDate: -1 }).toArray();
            await Client.close();
            return res.status(200).json(userFiles).end();
        })
}

module.exports = { getCloudContent };