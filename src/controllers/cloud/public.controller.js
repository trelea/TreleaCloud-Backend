const { Client, ConnectToBucket } = require('../../services/mongo.files.service');
const { ObjectId, DBRef } = require('mongodb');


const publicFilePriority = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    ConnectToBucket()
        .then(async ({ files, chunks }) => {
            const file = await files.findOne({ _id: new ObjectId(req.params.id) });
            
            if (file?.metadata?.user?.oid === user.oid &&  file?.metadata?.user?.collection === user.collection) {
                const publicFile = await files.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { metadata: { private: false, user }}});
                Client.close();
                return res.status(200).json(publicFile).end();
            }
            
            Client.close();
            return res.status(201).json({ msg: 'Invalid Operation' }).end();
        })
}

module.exports = { publicFilePriority };