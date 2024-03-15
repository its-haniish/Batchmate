const express = require('express');
const routes = express.Router();

// importing the contrllers
const signup = require('../controllers/signup.js');
const login = require('../controllers/login.js');
const sendOtp = require('../controllers/sendOtp.js');
const addTeacher = require('../controllers/addTeacher.js')
const searchTeachers = require('../controllers/searchTeachers.js');
const addFeedback = require('../controllers/addFeedback.js');
const deleteFeedback = require('../controllers/deleteFeedback.js')

routes
    .post('/signup', signup)
    .post('/login', login)
    .post('/sendOtp', sendOtp)
    .post('/addTeacher', addTeacher)
    .get('/searchTeachers', searchTeachers)
    .post('/addFeedback', addFeedback)
    .post('/deleteFeedback', deleteFeedback)

module.exports = routes;