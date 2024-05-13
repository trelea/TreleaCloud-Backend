// FOR PRODUCTION
// const { envProd  } = require('./config/env.config');

// FOR DEVELOPMENT
const { envLocal } = require('./config/env.config');


// START LOCALTUNNEL AND CONNECT TO DATABASE
require('./services/tunnel.service');
require('./services/database.service');


// PACKAGES
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const fileUpload = require('express-fileupload');



// const logger = require('./services/logger.service');
const XPB = require('./services/x-powered-by.service');
const sessionConfig = require('./config/session.config');
const corsConfig = require('./config/cors.config');



// AUTH STRATEGIES
require('./strategies/local.strategy');
require('./strategies/google.strategy');
require('./strategies/facebook.strategy');
require('./strategies/github.strategy');



// IMPORT ROUTES
const authRoute = require('./routes/auth.route');
const cloudRoute = require('./routes/cloud.route');



// STANDARD MIDLLEWARES
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsConfig))
app.use(fileUpload())
app.use(XPB);
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
// app.use(logger) IF TUNNEL IS NOT WORKING;



// ROUTES
app.use('/api/v1/auth',     authRoute);
app.use('/api/v1/cloud',    cloudRoute);
app.get('/', (req, res, next) => { return res.status(200).json({ msg: 'root' }).end() });
app.use('*', (req, res, next) => { return res.status(404).json({ msg: 'Invalid Route'}).end() });





// BOOTSTRAPING
app.listen(
    process.env.PORT, 
    process.env.SERVER, 
    () => {
        console.log(`Server ${process.env.SERVER} Running On Port: ${process.env.PORT}`);
    }
);