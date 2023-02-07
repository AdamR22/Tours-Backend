const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(function (req, res, next) {
    req.requestTime = new Date().toISOString();
    next();
});


const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/dev-data/data/tours-simple.json`
    )
);

const getAllTours = function (req, res) {
    res.status(200).json({
        status: "Success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        },
    });
}

const getTour = function (req, res) {

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
}

const createTour = function (req, res) {
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
}

const updateTour = function (req, res) {
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
}

const deleteTour = function (req, res) {
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
}

app.route('/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.route('/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

const port = 5000;

app.listen(port, function () {
    console.log(`App running on port ${port}...`)
});