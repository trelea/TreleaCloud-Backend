const { Client, CreateBucket, ConnectToBucket } = require('../../services/mongo.files.service');
const { ObjectId, DBRef } = require('mongodb');


const renameFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);
    const { newFileName } = req.body;

    ConnectToBucket()
        .then(async ({ files, backupFiles }) => {
            const file = await files.findOne({ _id: new ObjectId(req.params.id) });
            const backupFile = await backupFiles.findOne({ _id: new ObjectId(req.params.id) });

            if (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection) {
                CreateBucket()
                    .then(async ({ bucket }) => {
                        bucket.rename(new ObjectId(req.params.id), newFileName);
                        await backupFiles.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { originalFileName: newFileName, user }});
                        Client.close();
                        return res.status(201).json({ msg: 'File Renamed'}).end();
                    })
            } else return res.status(201).json({ msg: 'Invalid Operation' }).end();
        })
}

module.exports = { renameFile };