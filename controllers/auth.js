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
    
  try {
    const user = await User.findOne({ email });

    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message:'Invalid username or password'});
    }

    //res.status(200).json({message:'login successfull',token});
    const token = user.createJWT();
   res.status(StatusCodes.OK).json({user:{name:user.name},token})

  } catch (error) {
    console.error('login error',error);
    res.status(500).json({message:'internal server error '})
  }

}
module.exports = {
    register , login
}