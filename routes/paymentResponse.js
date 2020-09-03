const router = require('express').Router();
require('dotenv').config();
var crypto = require('crypto');

router.post('/webhookresponse',async(req,res)=>{
    try{
        //console.log(req.headers['x-razorpay-signature']);
        const crypto = require('crypto');
        var hash = await crypto.createHmac('sha256',process.env.WEBHOOK_SECRET);
        await hash.update(JSON.stringify(req.body));
        var value = await hash.digest('hex');
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
    }catch(error){
        console.log(`error in try catch block ${error}`);
    }
})

router.post('/razorpay/clientcallback/:orderid',async(req,res)=>{
    try{
        console.log(`client call back ${JSON.stringify(req.body,null,2)}`);
        const crypto = require('crypto');
         var hash = await crypto.createHmac('sha256', process.env.KEY_SECRET);
         await hash.update(`${req.params.orderid}|${req.body.razorpay_payment_id}`);
         var value = await hash.digest('hex');
          //console.log(value);
          if(value === req.body.razorpay_signature){
              res.redirect('http://localhost:3000/success');
          }else{
            res.redirect('http://localhost:3000/failure');
          }
    }catch(error){
        console.log(`error in try catch block of client callback response ${error}`)
    }
});

module.exports = router;