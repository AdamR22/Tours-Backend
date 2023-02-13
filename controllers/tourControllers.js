exports.checkReqBodyId = function (req, res, next) {
    //TODO: Implement middleware
    next();
}

exports.checkReqBodyOk = function (req, res, next) {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Fail',
            message: "Missing name or price"
        });
    }

    next();
}

exports.getAllTours = function (req, res) {
    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}

exports.getTour = function (req, res) {

    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}

exports.createTour = function (req, res) {
    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}

exports.updateTour = function (req, res) {
    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}

exports.deleteTour = function (req, res) {
    res.status(500).json({
        status: "Error",
        message: "Route is not yet defined"
    });
}