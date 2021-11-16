const mongoose=require('mongoose');
const AddSchema = mongoose.Schema;
const Adress = new AddSchema({
    city : {type:String},
    zipcode : {type:String},
    street : {type:String},
    
});
module.exports = mongoose.model("Address",Adress);