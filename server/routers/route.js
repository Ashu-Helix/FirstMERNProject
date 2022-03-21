const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

router.get('/', (req, res)=>{
    res.send("Hello World from server.router js.");
});

router.get('/login', (req, res)=>{
    res.send("Login Page");
});

router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    
    // console.log(!email+" "+ !password); // !(Not Operator) before variable returns true if variable is empty else false.
    if(!email || !password){
        return res.status(422).json({error:"Plzz filled all details."});
    }

    try{
        // res.send(email+" "+password);
        const isUserExists = await User.findOne({ email });

        if(isUserExists){
            const checkPass = await bcrypt.compare(password, isUserExists.password);
            // console.log(checkPass);
            if(checkPass){
                const token = await isUserExists.generateAuthToken();
                // console.log(token);
                
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 600000),
                    httpOnly: true
                });
                // res.status(200).send("Login Successful");
                return res.status(200).json({error:"Login Successful"});
            }else{
                // res.status(400).send("Login Denied");
                return res.status(400).json({error:"Login Denied"});
            }
        }else{
            // res.status(400).send("Login Denied");
            return res.status(400).json({error:"Login Denied"});
        }
    }catch(err){
        console.log(err);
    }

});

router.post('/register', async (req, res)=>{
    const { name, email, phno, work, password, conPassword}  = req.body;
    
    // console.log(`${name} ${email} ${phno} ${work} ${password}`);
    if(!name || !email || !phno || !work || !password || !conPassword){
        return  res.status(422).json({error:"Plzz filled the fileds properly."});
    }

    try{
        const emailExist = await User.findOne({ email });
        const phoneExist = await User.findOne({ phno: phno});
        // console.log(emailExist);
        // console.log("Phone Exists:"+phoneExist);
        if(emailExist){
            console.log("Email already exists.");
            return  res.status(422).json({error:"Email already exists."});
        }else if(phoneExist){
            console.log("Phone Number already exists.");
            return  res.status(422).json({error:"Phone Number already exists."});
        }else  if(password !== conPassword){
            console.log("Password Not Matching.");
            return res.status(422).json({error:"Password Not Matching."});
        }else{
            const user = new User({name, email, phno, work, password});
            const isSaved = await user.save();
            console.log(isSaved);
            if(isSaved){
                return res.status(201).json({error:"User Created."});
            }
        }
    }catch(err){
        console.log(err);
    }

});



router.get('/about', authenticate,(req, res)=>{
    res.send(req.rootUser);
});

//getting user data
router.get('/getData', authenticate,(req, res)=>{
    res.send(req.rootUser);
});

//Message saving route
router.post('/contact', async (req, res)=>{
    try{
        const { name, email, phno, message } = req.body;
    
        if(!name || !email || !phno || !message){
            return res.status(422).json({error:"Plzzz fill fileds properly"});
        }

        const getUser = await User.findOne({email});
        if(getUser){
            const messageResponse = await getUser.addMessage(message);
            // console.log(messageResponse);
            if(messageResponse){
                return res.status(200).json({msg:"Message Send Successfully"});
            }
        }else{
            return res.status(400).json({error:"Plzz login if your are existing user else register yourself"});
        }
    }catch(error){
        console.log(error);
    }
});

module.exports = router;