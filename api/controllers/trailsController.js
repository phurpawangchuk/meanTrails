require('../models/trails')
const mongoose = require('mongoose');
const Trail = mongoose.model(process.env.TRAIL_MODEL_NAME);
/*
const callBackify = require('util').callbackify;

const getAllTrailWithCallBack = callBackify(function (offset, count) {
    return Trail.find().skip(offset).limit(count - offset);
})

const addTrailWithCallBack = callBackify(function (newTrail) {
    return Trail.create(newTrail);
})

const deleteTrailWithCallBack = callBackify(function (locationId) {
    return Trail.findByIdAndDelete(locationId);
})

const findTrailByIdWithCallBack = callBackify(function (locationId) {
    return Trail.findById(locationId);
})

const updateTrailWithCallBack = callBackify(function (trailToUpdate) {
    return trailToUpdate.save();
})
*/
///////////////////////////////////////////


const response = { status: process.env.DEFAULT_CODE, message: "" }

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const _setSuccessResponse = function (trails) {
    response.status = Number(process.env.SUCCESS_CODE);
    response.message = trails;
}

const _setErrorResponse = function (res, err) {
    response.status = 500;
    response.message = err;
}

const getAllTrails = function (req, res) {

    const offset = req.query.offset ? parseInt(req.query.offset) : process.env.DEFAULT_OFFSET;
    const count = req.query.count ? parseInt(req.query.count) : process.env.DEFAULT_COUNT;

    if (req.query.search) {
        _filterTrail(res, req.query.search, offset, count);
        return;
    }

    Trail.find().skip(offset).limit(count - offset)
        .then((trails) => _setSuccessResponse(trails))
        .catch((err) => _setErrorResponse(res, err))
        .finally(() => _sendResponse(res, response));
}

const _filterTrail = function (res, search, offset, count) {
    Trail.find({
        $or: [
            { 'country': { $regex: search, $options: 'i' } },
            { 'state': { $regex: search, $options: 'i' } },
            { 'trails.name': { $regex: search, $options: 'i' } }
        ]
    }).skip(offset).limit(count - offset)
        .then((trails) => _setSuccessResponse(trails))
        .catch((err) => _setErrorResponse(res, err))
        .finally(() => _sendResponse(res, response));
}

const addTrail = function (req, res) {
    const newTrail = {
        name: req.body.name,
        distance: req.body.distance,
        difficulty: req.body.difficulty,
        imageUrl: req.body.imageUrl
    }

    const newTrailLocation = {
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        trails: [newTrail]
    };

    Trail.create(newTrailLocation)
        .then(() => _setSuccessResponse({ 'message': process.env.ADD_SUCCESS_MESSAGE }))
        .catch((err) => _setErrorResponse(res, err))
        .finally(() => _sendResponse(res, response));
}

const deleteTrail = function (req, res) {
    Trail.findByIdAndDelete(req.params.locationId)
        .then((success) => _setSuccessResponse("Successfully deleted"))
        .catch((error) => _setErrorResponse(res, error))
        .finally(() => _sendResponse(res, response));

    // deleteTrailWithCallBack(req.params.locationId, function (err, trail) {
    //     if (err) {
    //         response.status = 500;
    //         response.message = err;
    //     }
    //     if (!trail) {
    //         response.status = 404;
    //         response.message = process.env.INTERNAL_SERVER_ERROR;
    //     } else {
    //         response.status = 200;
    //         response.message = process.env.DELETE_SUCCESS_MESSAGE;
    //     }
    //     _sendResponse(res, response);
    // });
}

const getOneTrail = function (req, res) {
    console.log("Get one trail called")
    Trail.findById(req.params.locationId)
        .then((trail) => _setSuccessResponse(trail))
        .catch((error) => _setErrorResponse(res, error))
        .finally(() => _sendResponse(res, response));
}

const fullUdateTrail = function (req, res) {
    console.log("Fullupdate called")
    const trail = {
        country: req.body.country,
        state: req.body.state,
        city: req.body.city
    }
    Trail.findByIdAndUpdate(req.params.locationId, trail)
        .then((successUpdate) => _setSuccessResponse(process.env.UPDATE_SUCCESS_MESSAGE))
        .catch((err) => _setErrorResponse(res, "Update failed " + err))
        .finally(_sendResponse(res, response));

    // findTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
    //     if (err) {
    //         response.status = 500;
    //         response.message = { message: err };
    //     }
    //     trail.country = req.body.country;
    //     trail.state = req.body.state;
    // updateTrailWithCallBack(trail, function (err, fullUpdatedTrail) {
    //     if (err) {
    //         response.status = 500;
    //         response.message = { message: process.env.INTERNAL_SERVER_ERROR };
    //     }
    //     if (!trail) {
    //         response.status = 404;
    //         response.message = { message: process.env.TRAIL_NOT_FOUND_MESSAGE };
    //     } else {
    //         response.status = 200;
    //         response.message = { message: process.env.UPDATE_SUCCESS_MESSAGE };
    //     }
    // });
    // });
}

const _updatePartialTrail = function (trail, req, res) {
    if (req.body && req.body.country) {
        trail.country = req.body.country;
    }
    if (req.body && req.body.state) {
        trail.state = req.body.state;
    }
    if (req.body && req.body.city) {
        trail.city = req.body.city;
    }
    if (req.body.trails) {
        trail.trails = req.body.trails;
    }
    trail.save();
}

const partialUpdateTrail = function (req, res) {

    Trail.findById(req.params.locationId)
        .then((trail) => _updatePartialTrail(trail, req, res))
        .then((success) => _setSuccessResponse({ message: process.env.UPDATE_SUCCESS_MESSAGE }))
        .catch((err) => _setErrorResponse(res, err))
        .finally(() => _sendResponse(res, response));

    /*
    findTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (req.body && req.body.country) {
            trail.country = req.body.country;
        }
        if (req.body && req.body.state) {
            trail.state = req.body.state;
        }
        if (req.body && req.body.city) {
            trail.city = req.body.city;
        }
        if (req.body.trails) {
            trail.trails = req.body.trails;
        }

        updateTrailWithCallBack(trail, function (err, trail) {
            if (err) {
                _setErrorResponse(res, err);
            }
            else {
                _setSuccessResponse({ message: process.env.UPDATE_SUCCESS_MESSAGE });
            }
            _sendResponse(res, response);
        });
    });
    */
}

const getTotalTrails = function (req, res) {
    Trail.find().countDocuments()
        .then((count) => { res.status(200).json(count) })
        .catch((err) => { res.status(500).json({ message: err }) });
}


module.exports = {
    getAllTrails,
    addTrail,
    deleteTrail,
    getOneTrail,
    fullUdateTrail,
    partialUpdateTrail,
    getTotalTrails
};