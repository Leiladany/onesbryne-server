const express = require('express');
const passport = require('passport');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.getUserProfile);
router.put('/profile', passport.authenticate('jwt', { session: false }), UserController.updateUserProfile);

module.exports = router;
