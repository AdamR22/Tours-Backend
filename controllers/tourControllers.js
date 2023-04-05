const Tour = require("../models/tourModel");
const QueryBuilder = require("../utils/apiQueryBuilder");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ErrorHandlerFactory = require("../utils/errorHandlerFactory");

exports.aliasTopCheapTours = function (req, _, next) {
  req.query.limit = "5";
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "name,price,ratingAverage,summary,difficulty";

  next();
};

exports.getAllTours = asyncErrorHandler(async function (req, res, next) {
  const queryBuilder = new QueryBuilder(Tour.find(), req.query)
    .filter()
    .sort()
    .fieldLimiter()
    .paginate();

  const tours = await queryBuilder.query;

  res.status(200).json({
    status: "Success",
    data: {
      tours,
    },
  });
});

exports.getTour = asyncErrorHandler(async function (req, res, next) {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new ErrorHandlerFactory("Tour not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

exports.createTour = asyncErrorHandler(async function (req, res, next) {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = asyncErrorHandler(async function (req, res, next) {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

exports.deleteTour = asyncErrorHandler(async function (req, res, next) {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new ErrorHandlerFactory("Tour not found", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.getTourStats = asyncErrorHandler(async function (_, res, next) {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: "$difficulty",
        num: { $sum: 1 },
        numRating: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: "Success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = asyncErrorHandler(async function (req, res, next) {
  const year = parseInt(req.params.year);

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date("2021-12-31"),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numOfTours: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numOfTours: -1,
      },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: "Success",
    data: {
      plan,
    },
  });
});
