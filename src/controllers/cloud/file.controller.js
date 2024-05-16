const { Client, GridFSConnection } = require('../../services/mongo.files.service');
const { ObjectId, DBRef } = require('mongodb')


const getFile = async (req, res, next) => {
    const user = new DBRef((req?.user?.profile?.provider) ? `${req?.user?.profile?.provider}users` : 'users', req?.user?._id);

    GridFSConnection()
        .then(async ({ bucket }) => {
            const [ file ] = await bucket.find({ _id: new ObjectId(req.params.id) }).toArray();
            await Client.close();

            if (file && (
                    (!file?.metadata?.private) ||
                    (file?.metadata?.user?.oid === user.oid && file?.metadata?.user?.collection === user.collection)
                )
            ) return res.status(200).json(file).end();

            return res.status(201).json({ msg: 'Private File' }).end();

        })
}


module.exports = { getFile };