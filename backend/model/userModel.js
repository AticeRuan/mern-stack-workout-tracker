const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema(
    {

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

// static signup method : create new user and hash password to store in database
userSchema.statics.signup=async function (email,password) {
    
    //validation
    if(!email||!password){
        throw Error('All fields nedd to be filled in');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
   
    const exists=await this.findOne({email});
    if(exists){
        throw Error('Email already in use');
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough');
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const user= await this.create({email,password:hashedPassword});
    
    return user

}

//static login method:find user by email and compare password, then return user object
userSchema.statics.login = async function (email,password){
    //validation
    if(!email||!password){
        throw Error('All fields nedd to be filled in');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }


    const user=await this.findOne({email});

    if(!user){
        throw Error('Incorrect Email');
    }

    const match=await bcrypt.compare(password,user.password);

    if(!match){
        throw Error('Incorrect Password');
    }
  
        return user;
    

}

module.exports = mongoose.model('User',userSchema);