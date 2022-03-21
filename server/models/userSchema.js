const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//document structure
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phno:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    messages:[{
        message:{
            type:String,
            required:true,
            trim:true
        },
        time:{
            type:String,
            required: true
        }
    }],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

//Note:-> Don't user arrow function here beacause this didn't work with it.
//middleware on userSchema instance for generating auth token.
userSchema.methods.generateAuthToken = async function(){
    try{
        const token = await jwt.sign({id: this._id}, process.env.Secret_Key);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
};

//adding message with mongoose instance
userSchema.methods.addMessage = async function(message){
    try{
        let date = new Date();
        this.messages = this.messages.concat({ message: message, time: date.toLocaleString()});
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err);
    }
};

//hashing password
userSchema.pre('save', async function(next){
    // console.log("Inside Pre Middeleware.");
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    }catch(err){
        console.log(err);
    }
});

//collection creation
const User = mongoose.model("User", userSchema);
module.exports = User;


