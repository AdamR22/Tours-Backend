const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const app = require('./app');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.LOCAL_DB)
    .then(function (_) {
        console.log("Connection to DB successful");
    });

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log(`App running on port ${port}...`)
});