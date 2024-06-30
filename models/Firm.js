const mongoose=require('mongoose');

const firmschema=new mongoose.Schema({
    firmname:{
      type:String,
      required:true,
      unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg"]
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:["south-Indian","north_Indian","backery"]
            }
        ]
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
             ref:'Vendor'
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
             ref:'Product'
        }
    ]

});

const Firm=mongoose.model('firm',firmschema);
module.exports=Firm;