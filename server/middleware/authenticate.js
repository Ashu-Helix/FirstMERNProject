const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require('dotenv').config();

const authenticate = async (req, res, next) =>{
    try{
        // console.log("From auth middleware");
        const token = req.cookies.jwtoken;
        if(!token){
            // console.log("Token Not Found");
            throw new Error("Token Not Found");
        }
        
        const verifyUser = await jwt.verify(token, process.env.Secret_Key);
        const getUser = await User.findOne({_id: verifyUser.id});
        if(!getUser){
           throw new Error("User Not Found");
        }
        
        req.token = token;
        req.rootUser = getUser;
        req.userId = getUser._id;
        next();
    }catch(err){
        res.status(401).send("Unauthorized:No token provided");;
        console.log(err);
    }
};

module.exports = authenticate;