const Tour = require('../models/tourModel');
const QueryBuilder = require('../utils/apiQueryBuilder');

exports.aliasTopCheapTours = function (req, _, next) {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';

    next();
}

exports.getAllTours = async function (req, res) {

    try {
        const queryBuilder = new QueryBuilder(Tour.find(), req.query)
            .filter()
            .sort()
            .fieldLimiter()
            .paginate();

        const tours = await queryBuilder.query;

        res.status(200).json({
            status: "Success",
            data: {
                tours
            }
        });

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
    }
}

exports.getTour = async function (req, res) {

    try {
        const tours = await Tour.findById(req.params.id);

        res.status(200).json({
            status: "Success",
            data: {
                tours
            }
        });

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error
        });
    }
}

exports.createTour = async function (req, res) {

    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: "Success",
            data: {
                tour: newTour
            }
        });

    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: "Invalid data sent."
        });
    }
}

exports.updateTour = async function (req, res) {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: "Success",
            data: {
                tour
            }
        });

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
    }
}

exports.deleteTour = async function (req, res) {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "Success",
            data: null,
        });

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error
        });
    }
}