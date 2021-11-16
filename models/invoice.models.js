const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const User = require("../models/user.models");
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const InvoiceSchema = new Schema({
    buyer : {type:mongoose.Schema.Types.ObjectId, ref :" user"},
    seller :{type:mongoose.Schema.Types.ObjectId,ref: "user"}, 
    reference:{type:String , required : true , unique:true , index : true},
    title :{type:String , required : true},
    description : {type:String , maxlength:1024},
    items : [
        {
            name :{type:String , maxlength:256 , required:true},
            quantity : {type:Number,min:1, required:true},
            unitPrice : {type:Number,min:0, required:true},
            subTotal : {type:Number, min:0, required:true},
        },
    ],
    total : {type : Number,min : 0, required:true},
    isPayed:{type:Boolean,default:false},
    status:{type :String,default:"waiting_confirmation"},
    buyerConformation : {
        signature : {type:String},
        status:{type : String, default:"waiting_confirmation"},
        confirmationDate : {type : Date},
    },
    sellerConformation : {
        signature : {type:String},//, required:true},
        status:{type : String, default:"confirmed"},
        confirmationDate : {type : Date, default : Date.now()},
    },
    issueDate:{type:Date},
    dueDate:{type:Date},
},
{timestamps:true}

);
InvoiceSchema.plugin(uniqueValidator,{message : "data is not unique"});
InvoiceSchema.pre('validate',function (next){
    
    if(!this.reference) {
      this.generateReference();
    }
    next();
    
});
InvoiceSchema.methods.generateReference = function(){
    
    this.reference = ((Math.random()*Math.pow(36,6))|0).toString(36);
    
};
module.exports = mongoose.model("Invoice",InvoiceSchema);
