const router = require('express').Router();
var TransactionMaster = require('../models/Transaction');
var CustomerMaster = require('../models/CustomerLogo');


router.get('/razorpay/getpaymentdetails/:orderid',async(req,res)=>{
    let customerArray = [];
    console.log(req.params.orderid);
   await CustomerMaster.find().exec().then(docs=>{
        if(docs.length>0){
            //console.log(docs);
            customerArray= docs;
        }
    })
    .catch(err=>{
        //console.log(`error in finding customermaster ${err}`)
        return res.send("id not found");
    })

    await TransactionMaster.find({receipt:req.params.orderid}).then(async result=>{
        if(result.length>0){
            //console.log(result);
            let filteredArray = customerArray.filter( item=> item.customer === result[0].customer);
            //console.log(`filteredArray ${filteredArray}`);
            if(filteredArray.length>0){
                let output = {
                    customerimageurl:filteredArray[0].imageurl,
                    optionsArray:result
                }
                await res.status(200).send(output);
            }
            }else{
            console.log("not found");
            return res.status(500).send("Something went wrong");
        }
    })
    .catch(err=>console.log(`error in finding transactionmaster ${err}`));

});

module.exports = router;