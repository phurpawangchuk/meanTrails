const express = require('express');
const trailLocationController = require('../controllers/trailsController');
const trailController = require('../controllers/trailController');
const authenticate = require('../controllers/authController');
const router = express.Router();

router.route('/')
    .get(trailLocationController.getAllTrails)
    .post(authenticate.authenticate, trailLocationController.addTrail);

router.route('/total')
    .get(trailLocationController.getTotalTrails);

router.route('/:locationId')
    .get(trailLocationController.getOneTrail)
    .delete(authenticate.authenticate, trailLocationController.deleteTrail)
    .put(trailLocationController.fullUdateTrail)
    .patch(authenticate.authenticate, trailLocationController.partialUpdateTrail);

router.route('/:locationId/trails')
    .post(authenticate.authenticate, trailController.addTrail);

router.route('/:locationId/trail/:trailId')
    .get(trailController.getOneTrail)
    .delete(authenticate.authenticate, trailController.deleteTrail)
    .put(authenticate.authenticate, trailController.fullUpdateTrail)
    .patch(authenticate.authenticate, trailController.partialUpdateTrail);

module.exports = router;
