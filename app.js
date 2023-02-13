const tourRouter = require('./routes/tourRoutes');

const userRouter = require('./routes/userRoutes')

const express = require('express');

const app = express();

app.use(express.json());

if (process.env.DEV_ENV === "development") {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(function (req, res, next) {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/v1/tours', tourRouter);
app.use('/v1/users', userRouter);

module.exports = app;