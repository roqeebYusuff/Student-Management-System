const express = require('express');
const key = require('ckey');
const router = express.Router();
const ctrlUser = require("../controllers/users");
const ctrlAUth = require('../controllers/authentication');

router
    .route('/auth')
    .get(ctrlUser.user)
    .post(ctrlUser.createUser);

router
    .route('/auth/:id')
    .get(ctrlUser.readOne)
    .delete(ctrlUser.deleteOne)

router
    .route('/register')
    .post(ctrlAUth.register)

router
    .route('/login')
    .post(ctrlAUth.login);

router
    .route('/logout')
    .get(ctrlAUth.logout);

router
    .route('/forgotpassword')
    .post(ctrlAUth.forgot);

router
    .route('/resetpassword/:email/:token')
    .get(ctrlAUth.reset);

router
    .route('/resetpassword')
    .put(ctrlAUth.resetPassword)

module.exports = router;