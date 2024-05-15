const { Client, ConnectToBucket, CreateBucket } = require('../../services/mongo.files.service');
const { DBRef, ObjectId } = require('mongodb');
const fs = require('node:fs');
const path = require('node:path');



const destroyFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    ConnectToBucket()
        .then(async ({ files, backupFiles }) => {
            const file = await files.findOne({ _id: new ObjectId(req.params.id) });
            const backupFile = await backupFiles.findOne({ _id: new ObjectId(req.params.id) });

            if (
                (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection) ||
                (backupFile?.metadata?.user?.oid === user.oid && backupFile?.metadata?.user?.collection === user.collection)
            ) {
                CreateBucket()
                    .then(({ bucket, backupBucket }) => {

                        bucket.delete(new ObjectId(req.params.id));
                        backupBucket.delete(new ObjectId(req.params.id));
                        

                        fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', 'cache', 'storage', backupFile.filename));                        
                        
                        return res.status(201).json({ msg: 'File Destroyed'}).end();
                    })

            } else return res.status(201).json({ msg: 'Invalid Operation' }).end();
        });
}

module.exports = { destroyFile };