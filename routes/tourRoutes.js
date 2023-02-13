const { 
    checkReqBodyId,
    checkReqBodyOk,
    getTour, 
    getAllTours, 
    createTour, 
    updateTour, 
    deleteTour 
} = require('../controllers/tourControllers');

const express = require('express');

const router = express.Router();

router.param('id', checkReqBodyId);

router.route('/')
    .get(getAllTours)
    .post(checkReqBodyOk, createTour);

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


module.exports = router;