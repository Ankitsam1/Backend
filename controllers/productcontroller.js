const Firm = require('../models/Firm');
const Product=require('../models/Product')

const multer=require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({storage: storage});

  const addproduct=async(req,res)=>{
    try {
        const {
            productName,category,description
        }=req.body

        const image=req.file?req.file.filename:undefined;
    
         const firmId=req.params.firmId;
         const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:'firm not found'});
        }
        const product=new Product({
            productName,category,image,description,firm:firm._id
        
        })
        const savedproduct=await product.save();
        firm.products.push(savedproduct);
        await firm.save();
        res.status(200).json(savedproduct)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'internal server eroor'})
   
      }
  }

  const getproductbyfirm=async(req,res)=>{
     try {
      const firmId=req.params.firmId;
      const firm=await  Firm.findById(firmId);
      if(!firm){
       return  res.status(404).json({error:'firm not found'})
      }
      const firmname=firm.firmname;
      const products=await Product.find({firm:firmId})
       res.status(200).json({firmname,products});
    } catch (error) {
      console.error(error)
      res.status(500).json({error:'internal server eroor'})
 
     }
  }

  const deleteproductbyid=async(req,res)=>{

    try {
      const productid=req.params.productId;
      const deleteproduct=Product.findByIdAndDelete(productid)
     if(!deleteproduct){
      return res.status(404).json({error:'no product found'})
     }
   
    } catch (error) {
      console.error(error);
      res.status(500).json({error:'internal server eroor'})
 
    }
  }
  module.exports={addproduct:[upload.single('image'),addproduct],getproductbyfirm,deleteproductbyid};