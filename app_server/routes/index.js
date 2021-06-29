const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlStudent = require('../controllers/student');
const ctrlAuth = require("../controllers/auth");

// GET homepage
router.get('/', ctrlMain.index);

//GET STudent page
router.get('/student', ctrlStudent.students);

/* Auth Page */
router.get('/login', ctrlAuth.login);

module.exports = router;