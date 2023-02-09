const tourRouter = require('./routes/tourRoutes');

const userRouter = require('./routes/userRoutes')

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(function (req, res, next) {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/v1/tours', tourRouter);
app.use('/v1/users', userRouter);

module.exports = app;