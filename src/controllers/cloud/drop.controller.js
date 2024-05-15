const { Client, CreateBucket, ConnectToBucket } = require('../../services/mongo.files.service');
const { DBRef, ObjectId } = require('mongodb');

const dropFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);
    
    ConnectToBucket()
        .then(async ({ files }) => {
            const file = await files.findOne({ _id: new ObjectId(req.params.id) });

            if (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection) {
                CreateBucket()
                    .then(({ bucket }) => {
                        bucket.delete(new ObjectId(req.params.id));
                        return res.status(201).json({ msg: 'File Deleted'}).end();
                    })
            } else return res.status(201).json({ msg: 'Invalid Operation' }).end();
        })
}

module.exports = { dropFile };