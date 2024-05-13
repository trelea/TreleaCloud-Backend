const { MongoClient, GridFSBucket } = require('mongodb');

const Client = new MongoClient(process.env.MONGODB_URI);

const ConnectToBucket = async () => {
    await Client.connect()
    const db = Client.db(process.env.MONGODB_DB);
    return new GridFSBucket(db, { bucketName: 'usersfiles' }); 
}

module.exports = { Client, ConnectToBucket };
