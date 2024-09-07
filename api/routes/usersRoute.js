const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const passport = require('passport');

router.route('/register')
    .post(userController.register);

router.route('/success')
    .get(userController.success);

router.route('/failed')
    .get(function (req, res) {
        console.log('Failed');
        res.send('Failed123');
    });

router.route('/login').post(userController.login);

router.get('/gitlogin', passport.authenticate('github'));
router.get('/gitauth', passport.authenticate('github', {
    failureRedirect: '/api/users/failed'
}), userController.success);

router.get('/fblogin', passport.authenticate('facebook'));
router.get('/fbauth', passport.authenticate('facebook', {
    failureRedirect: '/api/users/failed'
}), userController.success);

router.get('/gmlogin', passport.authenticate('google'));
router.get('/gmauth', passport.authenticate('google', {
    failureRedirect: '/api/users/failed'
}), userController.success);


router.get('/lilogin', passport.authenticate('linkedin'));
router.get('/liauth', passport.authenticate('linkedin', {
    failureRedirect: '/api/users/failed'
}), userController.success);

module.exports = router;
