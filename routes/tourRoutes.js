const {
    aliasTopCheapTours,
    getTourStats,
    getMonthlyPlan,
    getTour,
    getAllTours,
    createTour,
    updateTour,
    deleteTour
} = require('../controllers/tourControllers');

const express = require('express');

const router = express.Router();

router.route('/best-cheap-tours').get(aliasTopCheapTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/')
    .get(getAllTours)
    .post(createTour);

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


module.exports = router;