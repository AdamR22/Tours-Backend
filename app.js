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
        status: "Success",
        results: tours.length,
        data: {
            tours
        },
    });
});

app.get('/v1/tours/:id', function (req, res) {

    let id = parseInt(req.params.id);

    const tour = tours.find(function (tour) {
        return tour.id == id;
    });

    if (!tour) {
        res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        })
    }

    res.status(200).json({
        status: "Success",
        data: {
            tour
        },
    });
});

app.patch('/v1/tours/:id', function(req, res) {
    const id = parseInt(req.params.id);

    if (id > tours.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }     

    res.status(200).json({
        status: "Success",
        message: "Tour updated successfully"
    });
});

app.delete('/v1/tours/:id', function(req, res) {
    const id = parseInt(req.params.id);

    if (id > tours.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }     

    res.status(204).json({
        status: "Success",
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