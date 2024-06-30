const Vendor = require('../models/Vendor');

const jwt=require('jsonwebtoken')
const secret = 'ankit';

const verifyToken=async(req,res,next)=>{
    const token=req.headers.token;

    if(!token){
        return res.status(401).json({error:"this token is requires"});
    }

    try{
 const decoded=jwt.verify(token,secret)
 const vendor=await Vendor.findById(decoded.id)
       if(!vendor){
        return res.status(404).json({eror:"vendor not found"});
       }
 req.vendorId=vendor._id
   //console.log(req.vendorId)
 next();
}catch(error){
       console.error(error)
        return res.status(500).json({error:"invalid token"})
    }
}

module.exports=verifyToken;