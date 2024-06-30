const express =require('express')
const path=require('path')
const app=express();
const dotEnv=require('dotenv')
const mongoose =require('mongoose');
const vendorrouter=require('./routes/vendorRoutes')
const PORT=4000;
const bodyParser=require('body-parser')

dotEnv.config();
const firmRoutes=require('./routes/firmroutes')
const productroutes=require('./routes/productroutes')
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('database is connected'))
.catch((err)=> console.log('error has occured'))

app.use(bodyParser.json());
app.use('/vendor',vendorrouter);

app.use('/firm',firmRoutes)

app.use('/product',productroutes)

app.use('/uploads',express.static('uploads'));
app.listen(PORT,()=>console.log('server is running on ${PORT}'))
app.use('/home',(req,res)=>{
   res.send('server is on home')
})