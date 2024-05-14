const { MongoClient, GridFSBucket } = require('mongodb');


const Client = new MongoClient(process.env.MONGODB_URI);


const CreateBucket = async () => {
    await Client.connect();
    const db = Client.db(process.env.MONGODB_DB);
    return new GridFSBucket(db, { bucketName: 'usersfiles' }); 
}


const ConnectToBucket = async () => {
    await Client.connect();
    const db = Client.db(process.env.MONGODB_DB);
    return {
        files: db.collection('usersfiles.files'),
        chunks: db.collection('usersfiles.chunks')
    }
}


module.exports = { Client, CreateBucket, ConnectToBucket };
