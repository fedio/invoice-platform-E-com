const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.connect("mongodb://localhost:27017/ecommerce");
mongoose.connection.on('connected',()=>{
    console.log("BD IS CONNECTED");
});
mongoose.connection.on('erroe',(err)=>{
    console.log("BD NOT CONNECTED",err);
});

const authRoutes = require("./routes/auth.routes");
const invoiceRoutes = require("./routes/invoice.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth",authRoutes);
app.use("/invoices",invoiceRoutes);
app.get('/test',(req,res)=>{
    res.send("hello");  
});
app.get('/houssem',(req,res)=>{
    res.json("houssem ynik fi nesrine ou aayletha");
});

const port= 8000;
app.listen(port,()=>{
    console.log("server is listening on ",port);
});
