const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    firstname:{type:String , maxlength : 64},
    lastname : {type:String , maxlength : 64},
    email : {type:String , unique:true , index:true , lowercase:true},
    password : {type : String },
    IdCard:{type:String },//, unique:true , index:true},
    adress : {type:mongoose.Schema.Types.ObjectId,ref :"Addeess"},
    phoneNumber:{type:Number, unique:true,index:true},
    isActive : {type:Boolean , default:false},
    signature : {type:String , unique:true , index:true},
},
{timestamps:true}
);
UserSchema.plugin(uniqueValidator,{
    message : "there are some data not unique",
});
module.exports =mongoose.model("user",UserSchema);