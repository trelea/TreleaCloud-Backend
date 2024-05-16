const { MongoClient, GridFSBucket } = require('mongodb');


const Client = new MongoClient(process.env.MONGODB_URI);


const GridFSConnection = async () => {
    await Client.connect();
    const db = Client.db(process.env.MONGODB_DB);
    return {
        bucket: new GridFSBucket(db, { bucketName: 'usersfiles' }),
        backupBucket: new GridFSBucket(db, { bucketName: 'usersfilesbackup' })
    }
}


// const ConnectToBucket = async () => {
//     await Client.connect();
//     const db = Client.db(process.env.MONGODB_DB);
//     return {
//         files: db.collection('usersfiles.files'),
//         chunks: db.collection('usersfiles.chunks'),
//         backupFiles: db.collection('usersfilesbackup.files'),
//         backupChunks: db.collection('usersfilesbackup.chunks'),
//     }
// }


module.exports = { Client, GridFSConnection };
