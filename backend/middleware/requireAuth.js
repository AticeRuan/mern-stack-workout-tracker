const jwt =require('jsonwebtoken');
const User = require('../model/userModel');

//middleware to verify authentication
const requireAuth = async (req, res, next) => {
    // verify authentication
    const {authorization}=req.headers


    if(!authorization){
        return res.status(401).json({err:'Authroization token required'})
    }

     const token = authorization.split(' ')[1]
   
     
    try{

        //returns the payload of the token
        const {_id}=jwt.verify(token,process.env.SECRET)
       
       

        //user property is added to the req object, when attaching middleware to the controller, user will be passed to the controller

        //only the user id is attached to the user property
        req.user=await User.findOne({_id}).select('_id');
        

        next();
    }
    catch(err){
        res.status(401).json({err:'Request is not authorized'})
    }
}

module.exports = requireAuth;