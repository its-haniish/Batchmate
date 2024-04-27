const express = require('express');
const routes = express.Router();

// importing the contrllers
const signup = require('../controllers/signup.js');
const login = require('../controllers/login.js');
const sendEmail = require('../controllers/sendEmail.js');
const addTeacher = require('../controllers/addTeacher.js')
const { searchTeachers, searchTeachById } = require('../controllers/searchTeachers.js');
const addFeedback = require('../controllers/addFeedback.js');
const deleteFeedback = require('../controllers/deleteFeedback.js')
const autoLogin = require("../controllers/autoLogin.js")

// importing the middlewares 
const authenticateToken = require("../middlewares/authenticateToken.js")

routes
    .post('/signup', signup)
    .post('/login', login)
    .post('/send-email', sendEmail)
    .post('/add-teacher', addTeacher)
    .post('/get-teachers', searchTeachers)
    .post('/search-teacher-by-id', searchTeachById)
    .post('/add-feedback', authenticateToken, addFeedback)
    .post('/deleteFeedback', authenticateToken, deleteFeedback)
    .post('/auto-login', autoLogin)

module.exports = routes;