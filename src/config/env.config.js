const path = require('node:path');

const envLocal = require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env.local') });
module.exports = { envLocal };

const envProd = require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env.prod') });
module.exports = { envProd };