const envLocal = require('dotenv').config({ path: '.env.local'});
module.exports = { envLocal };

const envProd = require('dotenv').config({ path: '.env.prod'});
module.exports = { envProd };