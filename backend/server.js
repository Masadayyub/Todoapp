
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config()
const app = express()


// Middleware
app.use(bodyParser.json());



const PORT = process.env.PORT || 5000;
const secretKey = process.env.JWT_SECRET;
app.use(express.json())

app.use(cors()); // Enable CORS for all route


mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log('connected to Database'))
.catch((err)=> console.log(err))




// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
   
  
  
  