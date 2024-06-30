const Vendor=require('../models/Vendor')
const jwt=require('jsonwebtoken')



const secretkey="Ankit";
const vendorregister=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
      const fd=await Vendor.findOne({username});
      if(fd){ return res.status(400).json("username already exist")
      }
     const newvendor=new Vendor({
        username,
        email,
        password
     });
       await newvendor.save();
       res.status(400).json({message:"user resister suceess"})
    console.log('resgister');
    }catch(err){
        res.status(400).json({err:'internal server error'})
    }
}

const payload = {
   id: "123456",
   
 };
 
 const secret = 'ankit';
 const options = { expiresIn: '1h' };
const vendorlogin=async(req,res)=>{
   const {email,password}=req.body;
   try{
     const vendor=await Vendor.findOne({email})
     if(!vendor||!(vendor.password===password )){
      res.status(400).json({err:"invalid"})
     }
     payload.id=vendor._id;
     const token=jwt.sign(payload, secret, options);
     res.status(400).json({suceess:"login successfully",token:token})
     console.log('this id token'+token)
    } catch(err){
    res.status(400).json({err:"password or email is incorrect"})
   }
}

const getallvendor=async(req,res)=>{
       try {
         const vendors=await Vendor.find().populate('firm')
         res.json(vendors)
       } catch (error) {
          console.log(error)
          res.status(500).json({error:"internal server error"});
       }
}

module.exports={vendorregister,vendorlogin,getallvendor};