const router = require('express').Router();
require('dotenv').config();
var crypto = require('crypto');

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
        res.redirect('http://localhost:3000/failure');
      }
});

module.exports = router;