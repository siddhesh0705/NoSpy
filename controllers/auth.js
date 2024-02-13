const User = require('../model/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors')
const bcrypt = require('bcryptjs');



const register = async (req,res)=>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED)
    .json({user:{name:user.getName()},token});
}

const login = async (req,res)=>{
   const {email,password} = req.body
    
   if(!email || !password){
    throw new BadRequestError('please provide email and password')
   }
   const user = await User.findOne({email});
   //compare password
   if(!user){
    throw new UnauthenticatedError('invalid crenedials')
   }

   const ispasswordCorrect = await user.comparepassword(password)
   if(!ispasswordCorrect){
    throw new UnauthenticatedError('invalid crenedials')
   }

   const token = user.createJWT();
   res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports = {
    register , login
}