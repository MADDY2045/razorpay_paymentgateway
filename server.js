const express = require("express");
const cors = require("cors");
const app = express();
const Razorpay = require('razorpay');
const axios = require('axios');
var crypto = require('crypto');
var shortid = require('shortid');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 7000;

const instance = new Razorpay({
    key_id: 'rzp_test_XPENsOw3ma17Yl',
    key_secret: 'dJ6nP8IZCr0JU4xlFJqXV5Rr',
});

app.post('/orders',(req,res)=>{
    try{
        //console.log(req.body);
        const { amount,paymentcapture } = req.body.data;
        console.log(typeof(amount));
        var options={
            amount: Number(amount) * 100, // amount == Rs 10
            currency: "INR",
            receipt: shortid(),
            payment_capture: paymentcapture,
            // 1 for automatic capture // 0 for manual capture
        }
        instance.orders.create(options, async(error, order)=> {
            if(error){
                res.status(500).send(`something went wrong ${error}`);
            }else{
                //console.log(order);
                return res.status(200).json(order);
            }
        })
    }
    catch(err){
        console.log(`error in catching orders route ${err}`)
    }
   })

   app.post('/callback/:orderid',async(req,res)=>{
       console.log(req.body);
       const crypto = require('crypto');
       var hash = crypto.createHmac('sha256', 'dJ6nP8IZCr0JU4xlFJqXV5Rr');
       hash.update(`${req.params.orderid}|${req.body.razorpay_payment_id}`);
       var value = hash.digest('hex');
        console.log(value);
        if(value === req.body.razorpay_signature){
            res.status(200).send("Payment Successful");
        }else{
            res.send("payment failed")
        }
       })

app.post('/webhookresponse',(req,res)=>{
    //console.log(req.headers['x-razorpay-signature']);
    const crypto = require('crypto');
    var hash = crypto.createHmac('sha256', 'Prithik007');
    hash.update(JSON.stringify(req.body));
    var value = hash.digest('hex');
    //  console.log(`value:${value} , ${req.headers['x-razorpay-signature']}`);
     if(value === req.headers['x-razorpay-signature']){
         console.log("payment successful");
         console.log(req.body.payload);
         res.status(200).send("Payment Successful");
         res.end();
     }else{
         res.send("payment failed");
         console.log(req.body.payload.entity);
         res.end();
     }
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});