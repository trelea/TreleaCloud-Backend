const { Client, CreateBucket, ConnectToBucket } = require('../../services/mongo.files.service');
const fs = require('node:fs');
const path = require('node:path');
const { ObjectId, DBRef } = require('mongodb');


const downloadFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    ConnectToBucket()
        .then(async ({ files }) => {
            const file = await files.findOne({ _id: new ObjectId(req.params.id) });

            if (
                (!file?.metadata?.private) ||
                (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection)
            ) {
                CreateBucket()
                    .then(bucket => {
                        bucket.openDownloadStream(new ObjectId(req.params.id))
                            .pipe(fs.createWriteStream(
                                path.resolve(__dirname, '..', '..', '..', 'cache', 'current', file.filename)
                            ))
                            .once('finish', () => {
                                Client.close()
                                return res
                                        .status(200)
                                        .download(path.resolve(__dirname, '..', '..', '..', 'cache', 'current', file.filename), () => {
                                            fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', 'cache', 'current', file.filename))
                                        });
                            })
                    });
            } else return res.status(201).json({ msg: 'Invalid Operation' }).end();

        });
}

module.exports = { downloadFile };