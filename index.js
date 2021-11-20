const express = require('express');
const cors = require('cors');

const app = express();

//Cors
app.use(cors());

//parse request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Router path
const candidateRouter = require('./route/candidateRoute');
app.use('/', candidateRouter);

//Server listen
app.listen('4000', () => {
    console.log("Server is running in port 4000")
})