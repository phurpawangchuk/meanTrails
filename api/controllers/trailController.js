const mongoose = require('mongoose');
const Trail = mongoose.model(process.env.TRAIL_MODEL_NAME);

/*
const callBackify = require('util').callbackify;

const checkTrailByIdWithCallBack = callBackify(function (locationId) {
    return Trail.findById(locationId);
})

const getOneTrailWithCallBack = callBackify(function (locationId, trailId) {
    return Trail.findOne({
        '_id': locationId,
        'trails._id': trailId
    },
        {
            'country': 1,
            'state': 1,
            'city': 1,
            'trails.$': 1
        });
});

const deleteTrailWithCallBack = callBackify(function (locationId, trailId) {
    return Trail.updateOne(
        { '_id': locationId },
        { $pull: { 'trails': { _id: trailId } } }
    );
})


const addNewTrailWithCallBack = callBackify(function (newTrail) {
    return newTrail.save();
})

const fullUpdateTrailWithCallBack = callBackify(function (id, docId, trailToUpdate) {
    return Trail.updateOne(
        { '_id': id, 'trails._id': docId },
        { $set: trailToUpdate },
        { new: true });
})
const partialUpdateTrailWithCallBack = callBackify(function (trailToUpdate) {
    return trailToUpdate.save();
})
*/

const response = { status: Number(process.env.DEFAULT_CODE), message: "" }

const _setSuccessResponse = function (message) {
    response.status = Number(process.env.SUCCESS_CODE);
    response.message = message;
}

const _setErrorResponse = function (status, err) {
    response.status = status | Number(process.env.INTERNAL_SERVER_ERROR_CODE);
    response.message = err;
}

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const deleteTrail = function (req, res) {
    console.log("delete trail...");

    Trail.findByIdAndDelete(req.params.locationId)
        .then((success) => _setSuccessResponse("Successfully deleted"))
        .catch((error) => _setErrorResponse(res, error))
        .finally(() => _sendResponse(res, response));

    // const subTrailId = req.params.trailId;
    //  checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
    //     if (!trail) {
    //         res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
    //         return;
    //     }
    //     deleteTrailWithCallBack(trailId, subTrailId, function (err, trail) {
    //         if (err) {
    //             res.status(process.env.INTERNAL_SERVER_ERROR_CODE).json({ message: "Error encounterred to delete" });
    //         }
    //         res.status(process.env.SUCCESS_CODE).json({ message: "Deleted" });
    //     })
    // });
}

const addTrail = function (req, res) {
    console.log("Add trail...");
    Trail.findById((req.params.locationId))
        .then((trail) => _addNewTrail(trail, req, res))
        .then((success) => _setSuccessResponse({ message: process.env.ADD_SUCCESS_MESSAGE }))
        .catch((error) => _setErrorResponse(process.env.INTERNAL_SERVER_ERROR_CODE, error))
        .finally(() => _sendResponse(res, response));

    // checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
    //     if (!trail) {
    //         res.status(404).json({ message: process.env.TRAIL_NOT_FOUND_MESSAGE });
    //         return;
    //     }
    //     _addNewTrail(trail, req, res);
    // });
}

const _addNewTrail = function (trail, req, res) {
    const newTrail = {
        name: req.body.name,
        distance: req.body.distance,
        difficulty: req.body.difficulty,
        imageUrl: req.body.imageUrl
    };
    trail.trails.push(newTrail);
    trail.save();

    // addNewTrailWithCallBack(trail, function (err, trail) {
    //     if (err) {
    //         res.status(process.env.INTERNAL_SERVER_ERROR_CODE).json({ message: process.env.ADD_FAILURE_MESSAGE });
    //         return;
    //     }
    //     res.status(process.env.SUCCESS_CODE).json({ message: process.env.ADD_SUCCESS_MESSAGE });
    // });
}

const getOneTrail = function (req, res) {
    console.log("getOneTrail...");

    const queryToFindTrail = { '_id': req.params.locationId, 'trails._id': req.params.trailId };
    const projection = { 'country': 1, 'state': 1, 'city': 1, 'trails.$': 1 };

    Trail.find(queryToFindTrail, projection)
        .then((trail) => _setSuccessResponse(trail[0]))
        .catch((error) => _setErrorResponse(error))
        .finally(() => _sendResponse(res, response));

    // getOneTrailWithCallBack(req.params.locationId, req.params.trailId, function (error, trail) {
    //     if (error) {
    //         response.status = process.env.INTERNAL_SERVER_ERROR_CODE;
    //         response.message = error;
    //     }
    //     else {
    //         response.status = process.env.SUCCESS_CODE;
    //         response.message = trail;
    //     }
    //     _sendResponse(res, response);
    // });
}

const _fullUpdateTrail = function (trail, subDocumentId, req) {
    const trailToUpdate = trail.trails.filter((trail) => trail.id === subDocumentId);
    trailToUpdate[0].name = req.body.name;
    trailToUpdate[0].distance = req.body.distance;
    trailToUpdate[0].difficulty = req.body.difficulty;
    trailToUpdate[0].imageUrl = req.body.imageUrl;

    trail.country = req.body.country;
    trail.state = req.body.state;
    trail.city = req.body.city;

    trail.save();
}

const fullUpdateTrail = function (req, res) {
    console.log("Full update trail...");
    Trail.findById(req.params.locationId)
        .then((trail) => _fullUpdateTrail(trail, req.params.trailId, req))
        .then((response) => _setSuccessResponse({ 'message': process.env.UPDATE_SUCCESS_MESSAGE }))
        .catch((error) => _setErrorResponse(process.env.INTERNAL_SERVER_ERROR_CODE, error))
        .finally(() => _sendResponse(res, response));

    // getOneTrailWithCallBack(mainDocumentId, subDocumentId, function (error, trail) {
    //     if (error) {
    //         _setErrorResponse(process.env.INTERNAL_SERVER_ERROR_CODE, error);
    //     } else {
    //         const updatedTrail = {
    //             'trails.$.name': req.body.name,
    //             'trails.$.distance': req.body.distance,
    //             'trails.$.difficulty': req.body.difficulty,
    //             'trails.$.imageUrl': req.body.imageUrl
    //         };
    //         fullUpdateTrailWithCallBack(mainDocumentId, subDocumentId, updatedTrail, function (err, updatedTrail) {
    //             if (error) {
    //                 _setErrorResponse(process.env.INTERNAL_SERVER_ERROR_CODE, error);
    //             } else {
    //                 _setSuccessResponse(process.env.UPDATE_SUCCESS_MESSAGE)
    //             }
    //             _sendResponse(res, response);
    //         });
    //     }
    // });
}

const partialUpdateTrail = function (req, res) {
    console.log("partial update trail...");

    Trail.findById(req.params.locationId)
        .then((trail) => _partialUpdateTrail(trail, req.params.trailId, req))
        .then(() => _setSuccessResponse({ message: process.env.UPDATE_SUCCESS_MESSAGE }))
        .catch((error) => _setErrorResponse(process.env.INTERNAL_SERVER_ERROR_CODE, error))
        .finally(() => _sendResponse(res, response));

    // checkTrailByIdWithCallBack(req.params.locationId, function (err, trail) {
    //     if (!trail) {
    //         response.status = 404;
    //         response.message = process.env.TRAIL_NOT_FOUND_MESSAGE;
    //     }
    //     const trailId = req.params.trailId;
    //     _partialUpdateTrail(trail, trailId, req, res);
    // });
}

const _partialUpdateTrail = function (trail, trailId, req) {
    const trailToUpdate = trail.trails.filter((trail) => trail.id === trailId);
    if (req.body && req.body.name)
        trailToUpdate[0].name = req.body.name;
    if (req.body && req.body.distance)
        trailToUpdate[0].distance = req.body.distance;
    if (req.body && req.body.difficulty)
        trailToUpdate[0].difficulty = req.body.difficulty;
    if (req.body && req.body.imageUrl)
        trailToUpdate[0].imageUrl = req.body.imageUrl;

    trail.save();

    // partialUpdateTrailWithCallBack(trail, function (error, trail) {
    //     if (error) {
    //         _setErrorResponse(process.env.INTERNAL_SERVER_ERROR_CODE, error);
    //         return;
    //     }
    //     _setSuccessResponse({ message: process.env.UPDATE_SUCCESS_MESSAGE });
    //     _sendResponse(res, response);
    // });
}

module.exports = { deleteTrail, fullUpdateTrail, addTrail, getOneTrail, partialUpdateTrail };

