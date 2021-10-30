const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/dashboard');
const ctrlStudent = require('../controllers/student');
const ctrlAuth = require("../controllers/auth");

// The middleware
const { requireAuth } = require('./middleware');

// Dashboard
router
    .route('/')
    .get(requireAuth, ctrlMain.index); 



/* ====================== STUDENTS ====================== */

//All Students
router
    .route('/allstudents')
    .get(requireAuth, ctrlStudent.allstudents);

//Add Student
router
    .route('/addstudent')
    .get(requireAuth, ctrlStudent.addstudent);

/* Auth Page */
router
    .get('/login', ctrlAuth.login)
    .post('/login', ctrlAuth.loginPost);

// Sign up
router
    .get('/signup', ctrlAuth.register)
    .post('/signup', ctrlAuth.registerPost);

router.get('/logout', ctrlAuth.logout);

router.get('/template', ctrlAuth.template);

// Forgot Passoword
router
    .route('/forgotpassword')
    .get(ctrlAuth.forgot)
    .post(ctrlAuth.forgotPost);

module.exports = router;