const express = require('express');
const helmet = require('helmet');
const volleyball = require('volleyball');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');

// const config = require('./config');
// const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');

const app = express();

// set security HTTP headers
app.use(helmet());

//http logger
app.use(volleyball);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
// 	app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use('/v1', routes);

module.exports = app;
