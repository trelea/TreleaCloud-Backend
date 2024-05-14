const { Client, ConnectToBucket } = require('../../services/mongo.files.service');
const { ObjectId, DBRef } = require('mongodb');


const privateFilePriority = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req.user._id);

    ConnectToBucket()
        .then(async ({ files, chunks }) => {
            const file = await files.findOne({ _id: new ObjectId(req.params.id) });
            
            if (file.metadata.user.oid === user.oid &&  file.metadata.user.collection === user.collection) {
                const privateFile = await files.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { metadata: { private: true }}});
                Client.close();
                return res.status(200).json(privateFile).end();
            }
            
            Client.close();
            return res.status(200).json({ msg: 'Invalid Operation' }).end();
        })
}


module.exports = { privateFilePriority };