const express=require('express')
const firmcontroller=require('../controllers/firmcontroller')
const router=express.Router();
const verifyToken=require('../middleware/verifytoken')
router.post('/add-firm',verifyToken,firmcontroller.addfirm);

////router.post('/login',vendorcontroller.vendorlogin);
module.exports=router;