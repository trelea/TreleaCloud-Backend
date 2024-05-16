const { Client, GridFSConnection } = require('../../services/mongo.files.service');
const fs = require('node:fs');
const path = require('node:path');
const { ObjectId, DBRef } = require('mongodb');


const downloadFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    GridFSConnection()
        .then(async ({ bucket }) => {
            const [ file ] = await bucket.find({ _id: new ObjectId(req.params.id) }).toArray();


            if (file && (
                    (!file?.metadata?.private) ||
                    (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection)
                )
            ) {
                bucket.openDownloadStream(new ObjectId(req.params.id))
                    .pipe(fs.createWriteStream(
                        path.resolve(__dirname, '..', '..', '..', 'cache', 'current', file.filename)
                    ))
                    .once('finish', async () => {
                        await Client.close();
                        return res
                                .status(200)
                                .download(path.resolve(__dirname, '..', '..', '..', 'cache', 'current', file.filename), () => {
                                    fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', 'cache', 'current', file.filename))
                                });
                    });
            } 

            await Client.close();
            return res.status(201).json({ msg: 'Invalid Operation' }).end();

        });
}

module.exports = { downloadFile };