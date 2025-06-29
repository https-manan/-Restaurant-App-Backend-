const express = require('express');
const { getUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = express.Router();

//All routes 

//Register auth

routes.get('/getUser',authMiddleware,getUserController)


module.exports = routes;