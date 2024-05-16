const { Client, GridFSConnection } = require('../../services/mongo.files.service');
const { DBRef, ObjectId } = require('mongodb');


const backupFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    GridFSConnection()
        .then(async ({ bucket, backupBucket }) => {
            const [ file ] = await backupBucket.find({ _id: new ObjectId(req.params.id),  'metadata.user': user }).toArray();
            
            if (file) {
                const _id = new ObjectId(req.params.id);
                fs.createReadStream(path.resolve(__dirname, '..', '..', '..', 'cache', 'storage', file.filename))
                    .pipe(bucket.openUploadStreamWithId(_id, file.metadata.originalFileName, { metadata: { private: true, user } }))
                    .once('finish', async () => {
                        await Client.close();
                        return res.status(200).json({ msg: 'File Restored' }).end();
                    }); 
            }

            await Client.close();
            return res.status(201).json({ msg: 'Invalid Operation' }).end();

        });
}

module.exports = { backupFile };