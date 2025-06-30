const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController } = require('../controllers/resturantController');



//CREATE RESTURANT
routes.post('/create',authMiddleware,createResturantController)



module.exports = routes;