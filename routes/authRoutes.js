const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const router = require('./testRouter');
const routes = express.Router();

//All routes 

//Register auth

routes.post('/register',registerController);
routes.post('/login',loginController);


module.exports = routes;