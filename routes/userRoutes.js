const express = require('express');
const { getUserController, updateUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = express.Router();

//All routes 

//Register auth
//GET DATA ROUTE
routes.get('/getUser',authMiddleware,getUserController);

//UPDATE DATA ROUTE
routes.put('/updateUser',authMiddleware,updateUserController)


module.exports = routes;