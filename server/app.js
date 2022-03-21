const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT || 8080;
require('./db/conn');

//used to parse request data on each request
app.use(express.json());
//cookie-parser call middleware.
app.use(cookieParser());

//we link the router files to make our route eazy.
app.use(require('./routers/route'));


// const User = require('./models/userSchema');

app.listen(port, ()=>{
    console.log(`server is running on port ${port}...`);
});