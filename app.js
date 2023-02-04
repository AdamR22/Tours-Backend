const express = require('express');

const fs = require('fs');
const app = express();

app.use(express.json());

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

app.post('/v1/tours', function (req, res) {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign(
        { id: newId },
        req.body
    );

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        function (_) {
            res.status(201).json({
                status: 'Success',
                data: {
                    tour: newTour
                }
            });
        }
    );
});

const port = 5000;

app.listen(port, function () {
    console.log(`App running on port ${port}...`)
});