const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/tours-simple.json`
    )
);

exports.checkReqBodyId = function (req, res, next, value) {
    if (parseInt(req.params.id) > tours.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }
    next();
}

exports.getAllTours = function (req, res) {
    res.status(200).json({
        status: "Success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        },
    });
}

exports.getTour = function (req, res) {

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

exports.createTour = function (req, res) {
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

exports.updateTour = function (req, res) {
    res.status(200).json({
        status: "Success",
        message: "Tour updated successfully"
    });
}

exports.deleteTour = function (req, res) {
    res.status(204).json({
        status: "Success",
    });
}