const { Client, CreateBucket } = require('../../services/mongo.files.service');
const path = require('node:path');
const { v4 } = require('uuid');
const fs = require('node:fs');


const uploadFile = async (req, res, next) => {
    if (!req?.files?.file) return res.status(204).json({ msg: 'No file provided' }).end();

    const originalFileName = req.files.file.name;

    req.files.file.name = `${v4()}_${new Date().toISOString()}_${req.files.file.name}`;
    req.files.file.mv(
        path.resolve(path.join(__dirname, '..', '..', '..', 'cache', 'storage', `${req.files.file.name}`)),
        (err) => { if (err) { return res.status(400).json(err).end() }}
    );

    CreateBucket()
        .then(bucket => {
            fs.createReadStream(path.resolve(__dirname, '..', '..', '..', 'cache', 'storage', req.files.file.name))
                .pipe(bucket.openUploadStream(originalFileName, {
                    metadata: {
                        private: true,
                        user: {
                            $ref: (req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users',
                            $id: req.user._id 
                        }
                    }
                }))
                .once('finish', () => {
                    Client.close();
                    return res.status(200).json({ msg: 'File on Cloud' }).end();
                });
        });
}


module.exports = { uploadFile };