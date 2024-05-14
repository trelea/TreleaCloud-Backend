const { Client, ConnectToBucket } = require('../../services/mongo.files.service');
const { ObjectId, DBRef } = require('mongodb')


const getFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    ConnectToBucket()
        .then(async ({ files, chunks }) => {
            const file = await files.findOne({ _id: new ObjectId(req.params.id) });
            Client.close();

            if (
                (!file?.metadata?.private) ||
                (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection)
            ) return res.status(200).json(file).end();

            return res.status(201).json({ msg: 'Private File' }).end();

        })
}


module.exports = { getFile };