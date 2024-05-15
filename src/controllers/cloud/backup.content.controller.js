const { Client, ConnectToBucket, CreateBucket } = require('../../services/mongo.files.service');
const { DBRef } = require('mongodb');


const backupContent = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    ConnectToBucket()
        .then(async ({ backupFiles }) => {
            const files = await backupFiles.find({ 'metadata.user': user }).sort({ uploadDate: -1 }).toArray();
            Client.close();
            return res.status(200).json(files).end();
        })
}


module.exports = { backupContent };