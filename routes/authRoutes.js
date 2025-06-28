const express = require('express');
const { registerController } = require('../controllers/authController');
const routes = express.Router();

//All routes 

//Register auth

routes.post('/register',registerController)




module.exports = routes;