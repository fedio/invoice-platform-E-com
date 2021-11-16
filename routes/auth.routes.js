const router = require("express").Router();
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const Adress = require("../models/adress");
const jwt = require("jsonwebtoken");
const verifyToken = require('../middlewares/verifyToken');

router.get('/authcheck', verifyToken , async (req,res)=>{
    try {
        const user = await User.findById(req.verifiedUser   ._id);
        return res.status(200).json({user : user});
    } catch (err) {
        return res.status(500).json({err_message : err});
    }
});

router.post("/register",async(req,res)=>{ 
    try {
        const existEmail = await User.findOne({email:req.body.email});
    if(existEmail) return res.status(422).json({
        message : "email/password exist",
    });
    console.log(existEmail);
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(req.body.password,salt); 
    console.log(hashedPassword);
    const newAddress = new Adress({
        city:req.body.city,
        zipcode:req.body.zipcode,
        street : req.body.street,
        
    });
    const savedAddress = await newAddress.save();


    const newUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:hashedPassword,
        IDCard:req.body.IDCard,
        adress:savedAddress._id,
        phoneNumber :req.body.phoneNumber,
        signature:req.body.signature,
    });
    
    const savedUser = await newUser.save();
    
    console.log(savedUser);
    return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json(err); 
    };
});
router.post("/login", async (req,res)=>{
    try {
     const userExist = await User.findOne({email : req.body.email});
    if(!userExist) return res.status(401).json({message : "email/password wrong"});
    const validPassword = await bcrypt.compare(req.body.password,userExist.password);
    if (!validPassword) return res.status(401).json({message: "email/password wrong"});
    const token = jwt.sign(
        {_id:userExist._id, isActive : userExist.isActive , signature:userExist.signature},"pidddkdz");
        return res.status(200).json({token : token , user:userExist});
    } catch (err) {
        return res.status(500).json(err);
    };
});
module.exports = router;