const Tour = require('../models/tourModel');

exports.getAllTours = async function (req, res) {

    try {

        const queryObj = { ...req.query };

        const fieldsToExclude = ['page', 'sort', 'limit', 'fields'];

        fieldsToExclude.forEach(function (field) { delete queryObj[field] });

        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, function (match) {
            return `$${match}`;
        });

        let result = Tour.find(JSON.parse(queryString));

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");

            result = result.sort(sortBy);
        } else {
            result = result.sort('-createdAt');
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");;

            result = result.select(fields);
        } else {
            result = result.select("-__v");
        }

        const tours = await result;

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