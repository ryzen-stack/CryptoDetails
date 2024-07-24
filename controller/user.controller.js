const users = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

let RegisterUser = async (req,res,next) =>{
    try {
        let {Firstname,Lastname,age,mobile,email,gender,password,role} = req.body
        console.log(role)
        let userAvail = await users.findOne({$or:[{email},{mobile}]})
        if(userAvail){

            return res.status(403).json({error:false,message:'user already exists'})
        }
        let salt = await bcrypt.genSalt(8)
        let hashpassword = await bcrypt.hash(password,salt)
        let user = await users.create({Firstname,Lastname,age,mobile,email,gender,password:hashpassword,role})
        res.status(201).json({error:false,message:'user Added successfully',data:user})
    } catch (err) {
        next(err)
    }

 
}

let LogUser = async (req,res,next) =>{
    try {
        
        let {email,password} = req.body
        let queryObj = {}
        if(email.includes('@',0))
        {
            queryObj.email = email
        }
        else{               
            queryObj.mobile = parseInt(email)
        }
        let userAvail = await users.findOne(queryObj)
        if(userAvail){
            let ispasswordMatching = await bcrypt.compare(password,userAvail.password)

            if(ispasswordMatching){
                let token = jwt.sign({name:userAvail.email, role:userAvail.role},"123",{expiresIn:"10m"})
               return res.status(201).json({error:false,message:'user Logged successfully',token})
                // return res.status(201).json({error:false,message:'user Logged successfully',token})
            }
            return res.status(401).json({error:true,message:'password is incorrect'})
        }
        return res.status(404).json({error:true,message:'user not found'})
         
    } catch (err) {
        next(err)
        
    }
 
}



let getUser = async (req,res,next) =>{
    try {
        let {pid}=req.params
        let {Firstname,Lastname,age,mobile,email,gender} = req.body
        let user = await users.findById(pid)
        if(!user){
            return res.status(404).json({error:false,message:'user not found'})
        }
        
        let userEdit = await users.findByIdAndUpdate(pid, {$set:{Firstname,Lastname,age,mobile,email,gender}})
        res.status(201).json({error:false,message:"updated successfully",data:userEdit})
    } catch (err) {
        next(err)
    }
 
}

module.exports = {RegisterUser,LogUser,getUser}