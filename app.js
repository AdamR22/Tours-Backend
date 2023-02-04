const express = require('express');

const fs = require('fs');
const app = express();

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/dev-data/data/tours-simple.json`
    )
);

app.get('/v1/tours', function (req, res) {
    res.status(200).json({
        status: 200,
        results: tours.length,
        data: {
            tours
        },
    });
});

const port = 3000;

app.listen(port, function () {
    console.log(`App running on port ${port}...`)
});