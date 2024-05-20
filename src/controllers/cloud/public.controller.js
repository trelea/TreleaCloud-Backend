const { Client, GridFSConnection } = require('../../services/mongo.files.service');
const { ObjectId, DBRef } = require('mongodb');


const publicFilePriority = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    GridFSConnection()
        .then(async ({ bucket }) => {
            const [ file ] = await bucket.find({ _id: new ObjectId(req.params.id) }).toArray();
            
            if (file && (file?.metadata?.user?.oid === user.oid &&  file?.metadata?.user?.collection === user.collection)) {
                await bucket.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { metadata: { private: false, user }}});
                await Client.close();
                return res.status(200).json({ msg: 'Updated' }).end();
            }
            
            await Client.close();
            return res.status(201).json({ msg: 'Invalid Operation' }).end();
        })
}

module.exports = { publicFilePriority };