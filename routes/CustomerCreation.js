const router = require('express').Router();
const CustomerMaster = require('../models/CustomerLogo');

router.post('/razorpay/createcustomer',(req,res)=>{
    const { customer,imageurl } = req.body;
    const newCustomer = new CustomerMaster({customer,imageurl});
               const newTransactionDetails = newCustomer.save()
               .then((response)=>{
                    if(response){
                        res.status(200).send("saved successfully")
                    }
                  }).catch(err=>{
                   console.log(res.status(404).send('something went wrong'));
               })
})

module.exports = router;