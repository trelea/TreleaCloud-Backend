const { Client, GridFSConnection } = require('../../services/mongo.files.service');
const path = require('node:path');
const { v4 } = require('uuid');
const fs = require('node:fs');
const { ObjectId, DBRef } = require('mongodb');


const uploadFile = async (req, res, next) => {
    if (!req?.files?.file) return res.status(204).json({ msg: 'No file provided' }).end();

    const originalFileName = req.files.file.name;

    req.files.file.name = `${v4()}_${new Date().toISOString()}_${req.files.file.name}`;
    req.files.file.mv(
        path.resolve(path.join(__dirname, '..', '..', '..', 'cache', 'storage', req.files.file.name)),
        (err) => { if (err) { return res.status(400).json(err).end() }}
    );

    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    GridFSConnection()
        .then(async ({ bucket, backupBucket }) => {
            const _id = new ObjectId();

            const stream = fs.createReadStream(path.resolve(__dirname, '..', '..', '..', 'cache', 'storage', req.files.file.name));

            stream.pipe(backupBucket.openUploadStreamWithId(_id, req.files.file.name, { metadata: { originalFileName, user } }))
                .once('finish', () => {
                    stream.pipe(bucket.openUploadStreamWithId(_id, originalFileName, { metadata: { private: true, user } }))
                        .once('finish', async () => {
                            await Client.close();
                            return res.status(200).json({ msg: 'File on Cloud' }).end();
                        });    
                });
        });
}


module.exports = { uploadFile };