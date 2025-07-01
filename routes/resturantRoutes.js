const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantController, getResturantByIDController, deleteResturantController } = require('../controllers/resturantController');



//CREATE RESTURANT
routes.post('/create',authMiddleware,createResturantController)
//GET ALL RESTURANTS 
routes.get('/getAll',getAllResturantController)
//GET RESTURANT BY ID
routes.get('/get/:id',getResturantByIDController);
//DELETE RESTURANT 
routes.delete('/delete',authMiddleware,deleteResturantController)

module.exports = routes;