const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlAuth = require("../controllers/auth");

// GET homepage
router.get('/', ctrlMain.index);

/* Auth Page */
router.get('/login', ctrlAuth.login);
router.get('/register', ctrlAuth.register);



// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
