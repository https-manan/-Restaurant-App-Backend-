const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, delProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = express.Router();

//All routes 

//Register auth
//GET DATA ROUTE
routes.get('/getUser',authMiddleware,getUserController);

//UPDATE DATA ROUTE
routes.put('/updateUser',authMiddleware,updateUserController);

//RESET PASSWORD
routes.post('/resetPassword',authMiddleware,resetPasswordController)

//DELETE PROFILE

routes.delete('/deleteUser/:id',authMiddleware,delProfileController)

module.exports = routes;