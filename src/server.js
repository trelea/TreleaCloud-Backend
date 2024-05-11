// FOR PRODUCTION
// const { envProd  } = require('./config/env.config');

// FOR DEVELOPMENT
const { envLocal } = require('./config/env.config');

// START LOCALTUNNEL
require('./services/tunnel.service')


// PACKAGES
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');


// const logger = require('./services/logger.service');
const XPB = require('./services/x-powered-by.service');
const db = require('./services/database.service');
const sessionConfig = require('./config/session.config');
const corsConfig = require('./config/cors.config');



// AUTH STRATEGIES
require('./strategies/local.strategy');
require('./strategies/google.strategy');
require('./strategies/facebook.strategy');
require('./strategies/github.strategy');



// IMPORT ROUTES
const authRoute = require('./routes/auth.route');



// STANDARD MIDLLEWARES
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsConfig))
// app.use(logger);
app.use(XPB);
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());


// ROUTES
app.use('/api/v1/auth', authRoute);
app.get('/', (req, res, next) => { return res.status(200).json({ msg: 'root' }).end() });
app.use('*', (req, res, next) => { return res.status(404).json({ msg: 'Invalid Route'}).end() });


// BOOTSTRAPING
app.listen(
    process.env.PORT, 
    process.env.SERVER, 
    () => {
        db();
        console.log(`Server ${process.env.SERVER} Running On Port: ${process.env.PORT}`);
        
    }
);