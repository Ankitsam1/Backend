const vendorcontroller=require('../controllers/vendorcontroller')
const express=require('express')
const router=express.Router();
router.post('/register',vendorcontroller.vendorregister);

router.post('/login',vendorcontroller.vendorlogin);

router.get('/all-vendors',vendorcontroller.getallvendor);
module.exports=router;