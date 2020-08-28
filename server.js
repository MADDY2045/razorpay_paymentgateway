const express = require("express");
const cors = require("cors");
const app = express();
const Razorpay = require('razorpay');
const axios = require('axios');
var crypto = require('crypto');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 7000;

const instance = new Razorpay({
    key_id: 'rzp_test_XPENsOw3ma17Yl',
    key_secret: 'dJ6nP8IZCr0JU4xlFJqXV5Rr',
});

app.get('/orders',(req,res)=>{
    try{
        const currencyheader = req.ip;
        // console.log(currencyheader);
        var options={
            amount: 70 * 100, // amount == Rs 10
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 1,
            // 1 for automatic capture // 0 for manual capture
        }
        instance.orders.create(options, async(error, order)=> {
            if(error){
                res.status(500).send(`something went wrong ${error}`);
            }else{
                console.log(order);
                return res.status(200).json(order);
            }
        })
    }
    catch(err){
        console.log(`error in catching orders route ${err}`)
    }
   })

//    app.post('/capture',async (req,res)=>{
//        try{
//            let data={
//             amount: 7000,
//             currency: "INR",
//            }

//             axios.post(`https://rzp_test_XPENsOw3ma17Yl:dJ6nP8IZCr0JU4xlFJqXV5Rr@api.razorpay.com/v1/payments/order_FW8cjURDWMgrfv/capture`,{data:data})
//             .then(response=>{
//                console.log(`response.data is ${response.data}`);
//                res.send("success")
//            })
//            .catch(err=>console.log(`error in posting axios ${err}`));

//        }catch(err){
//            console.log(`error in post method ${err}`)
//        }
//    })

   app.post('/callback/:id',async(req,res)=>{
       console.log(req.body);
       console.log(req.params.id);
       //Name of the file : sha256-hmac.js
                //Loading the crypto module in node.js
                console.log(req.body.razorpay_order_id);
                console.log(req.body.razorpay_payment_id);
                //creating hmac object
                var hmac = await crypto.createHmac('sha256', `${req.params.id}|${req.body.razorpay_payment_id}`, 'dJ6nP8IZCr0JU4xlFJqXV5Rr');
                //passing the data to be hashed
                data = await hmac.update('nodejsera');
                //Creating the hmac in the required format
                gen_hmac= await data.digest('hex');
                //Printing the output on the console
                console.log(`gen_hmac is ${gen_hmac}`);
                if(gen_hmac === req.body.razorpay_signature){
                    console.log(`response successful!!!`);
                }else{
                    res.send("failure");
                }
   })
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});