const router = require('express').Router();
const Razorpay = require('razorpay');
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
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: shortid(),
            payment_capture: paymentcapture,
        }
        instance.orders.create(options, async(error, order)=> {
            if(error){
                console.log(`order creation error ${JSON.stringify(error,null,2)}`);
                res.status(500).send(`something went wrong ${JSON.stringify(error)}`);
            }else{
                console.log(`order is ${JSON.stringify(order,null,2)}`);
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

module.exports = router;