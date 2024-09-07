const express = require('express');
const router = express.Router();

const trailsRouter = require('./trailsRoute');
const usersRouter = require('./usersRoute');

router.use("/trails", trailsRouter);
router.use("/users", usersRouter);

module.exports = router;