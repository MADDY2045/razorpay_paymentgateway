const router = require('express').Router();
const Razorpay = require('razorpay');
const axios = require('axios');
var crypto = require('crypto');
var shortid = require('shortid');
var TransactionMaster = require('../models/Transaction');
require('dotenv').config();

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

router.post('/orders',(req,res)=>{
    try{
        //console.log(req.body);
        const { amount,paymentcapture } = req.body.data;
        //console.log(typeof(amount));
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
               let amount = order.amount;
               let paymentcapture = req.body.data.paymentcapture;
               let receipt = order.receipt;
               let email = req.body.data.email;
               let name = req.body.data.name;
               let contact = req.body.data.contact;
               let customer = req.body.data.customer;
               let orderid = order.id;
               let status = order.status;
               let date = new Date(order.created_at * 1000);

               date.setHours( date.getHours() + 5 , date.getMinutes() + 30 );
               //dateObj.setHours( dateObj.getMinutes() + 330 );
               let created = date.toUTCString();
               const newTransaction = new TransactionMaster({amount,paymentcapture,receipt,email,name,contact,customer,orderid,status,receipt,created});
               const newTransactionDetails = newTransaction.save()
               .then(()=>{
                   var urllink = `http://localhost:3000/razorpay/${receipt}`;
                   res.status(200).send(urllink)
                }).catch(err=>{
                   console.log(res.status(404).send('something went wrong'));
               })

            }
        })
    }
    catch(err){
        console.log(`error in catching orders route ${err}`)
    }
   })

  router.post('/webhookresponse',(req,res)=>{
    //console.log(req.headers['x-razorpay-signature']);
    const crypto = require('crypto');
    var hash = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
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

router.post('/razorpay/clientcallback/:orderid',(req,res)=>{
    console.log(`client call back ${JSON.stringify(req.body,null,2)}`);
    const crypto = require('crypto');
     var hash = crypto.createHmac('sha256', process.env.KEY_SECRET);
     hash.update(`${req.params.orderid}|${req.body.razorpay_payment_id}`);
     var value = hash.digest('hex');
      //console.log(value);
      if(value === req.body.razorpay_signature){
          res.redirect('http://localhost:3000/success');
      }else{
          res.send("payment failed")
      }
})

module.exports = router;