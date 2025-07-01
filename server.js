const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect DB
connectDb();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/test', require('./routes/testRouter'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/resturant',require('./routes/resturantRoutes'));
app.use('/api/v1/category',require('./routes/categoryRoutes'))


app.get('/test', (req, res) => {
  res.status(200).send("Test route working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
