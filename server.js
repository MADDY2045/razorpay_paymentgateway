const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const OrderRouter = require('./routes/ordercreation');
const CustomerRouter = require('./routes/CustomerCreation');
const RazorpayCheckoutRouter = require('./routes/RazorpayCheckout');
const PaymentResponse = require('./routes/paymentResponse');
const port = 7000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',OrderRouter);
app.use('/',CustomerRouter);
app.use('/',RazorpayCheckoutRouter);
app.use('/',PaymentResponse);
//connect mongoDB
mongoose.connect('mongodb://localhost/razorpay',{useUnifiedTopology:true,useNewUrlParser:true},(err)=>{
    if(!err){
        console.log('DB connected successfully!!!!')
    }else{
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});