const { Client, GridFSConnection } = require('../../services/mongo.files.service');
const { DBRef, ObjectId } = require('mongodb');
const fs = require('node:fs');
const path = require('node:path');



const destroyFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    GridFSConnection()
        .then(async ({ bucket, backupBucket }) => {
            const [ file ] = await bucket.find({ _id: new ObjectId(req.params.id) }).toArray();
            const [ backupFile ] = await backupBucket.find({ _id: new ObjectId(req.params.id) }).toArray();
                
            if (
                (
                    file || backupFile
                ) && (
                    (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection) ||
                    (backupFile?.metadata?.user?.oid === user.oid && backupFile?.metadata?.user?.collection === user.collection)
                )
            ) {
                await bucket.delete(new ObjectId(req.params.id));
                await backupBucket.delete(new ObjectId(req.params.id));
                await Client.close();

                fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', 'cache', 'storage', backupFile.filename)); 
                return res.status(200).json({ msg: 'File Destroyed' }).end();

            }

            await Client.close();
            return res.status(201).json({ msg: 'Invalid Operation' }).end();

        });
}

module.exports = { destroyFile };