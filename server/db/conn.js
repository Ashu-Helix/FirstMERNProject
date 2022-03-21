const mongoose = require('mongoose');
const DBUrl = process.env.Database;

mongoose.connect(DBUrl)
.then(()=>{ console.log("Connection Successful") })
.catch((err)=>{ console.error(err) });