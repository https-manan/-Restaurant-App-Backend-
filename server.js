const express = require('express');
const app = express() //Rest object
const cors = require('cors');
const connectDb = require('./config/db');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

connectDb(); 

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/test',require('./routes/testRouter')); 


//Routes
app.get('/test',(req,res)=>{
    res.status(200)
});

app.listen(PORT,()=>{
    console.log(`server is running on the port : ${PORT}`);
})