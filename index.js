const express = require('express');
const  mongoose  = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
require('dotenv/config');

//Import routes

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Middlewares
app.use(express.json());

//Routes middlewares
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute);

// database connect
mongoose.connect(process.env.MOGO_CONNECTION,{useNewUrlParser: true} ,()=> 
console.log("connected to db")
);

app.listen(3000, ()=> console.log("server is running"));