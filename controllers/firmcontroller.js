const Firm=require('../models/Firm')

const Vendor =require('../models/Vendor')

const addfirm=async(req,res)=>{
    
    try{
    const {firmname,area,category,region}=req.body
   
    const vendor=await Vendor.findById(req.vendorId);
   
   if(!vendor){
    res.status(404).json({message:"vendor not  found"})
   }
    const firm=new Firm({
        firmname,area,category,region,vendor:vendor.id
    })
   const savedfirm= await firm.save();
   vendor.firm.push(savedfirm);
   await vendor.save();
    return res.status(200).json({message:"firm added suscessfully"})
}catch(error){
   console.error(error);
   res.status(500).json({error:"internal server  error at firm controllr"})
}
}

module.exports={addfirm};
