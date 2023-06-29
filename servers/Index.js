const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const headerParser = require("header-parser");

const helmet = require("helmet");
const cors = require("cors");
const passport = require('passport');
require('../services/Passport');
const morgan = require('morgan');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//require all the routes
var IndexRouter = require("../routes/IndexRoute");
var UserRouter = require("../routes/UserRoute");

const server = express();

// configure app to use bodyParser
server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));
server.use(morgan('tiny'));
server.use(cookieParser());
server.use(helmet());
server.use(cors());
server.use(headerParser);
server.use(passport.initialize());

/**
 * enable CORS
 */
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//prefix all the routes
server.use(IndexRouter);
server.use(UserRouter);

// error handler to spesific message
server.use((err, req, res, next) => {
    console.error(err.stack);
    var statusCode = res.status(err.status || 500);
    res.status(statusCode).json({
        status: "erorr",
        code: statusCode,
        message: err.message
    });
})

module.exports = server;
