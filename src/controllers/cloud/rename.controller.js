const { Client, GridFSConnection } = require('../../services/mongo.files.service');
const { ObjectId, DBRef } = require('mongodb');


const renameFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);
    const { newFileName } = req.body;

    GridFSConnection()
        .then(async ({ bucket, backupBucket }) => {
            const [ file ] = await bucket.find({ _id: new ObjectId(req.params.id) }).toArray();

            if (file && (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection)) {

                await bucket.rename(new ObjectId(req.params.id), newFileName);
                await backupBucket.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { originalFileName: newFileName, user }});
                await Client.close();

                return res.status(201).json({ msg: 'File Renamed' }).end();

            }

            await Client.close();
            return res.status(201).json({ msg: 'Invalid Operation' }).end();

        })
}


module.exports = { renameFile };