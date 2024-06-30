const express=require('express')
const productcontroller=require('../controllers/productcontroller')
const router=express.Router();

router.post('/add-product/:firmId',productcontroller.addproduct)

router.get('/:firmId/products',productcontroller.getproductbyfirm)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));

})
router.delete('/:productId',productcontroller.deleteproductbyid)
module.exports=router;