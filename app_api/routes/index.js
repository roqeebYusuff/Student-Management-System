const express = require('express');
const key = require('ckey');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});
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
    .post(auth,ctrlAUth.login);

module.exports = router;