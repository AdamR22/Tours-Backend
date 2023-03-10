const dotenv = require('dotenv')
dotenv.config();

const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log(`App running on port ${port}...`)
});