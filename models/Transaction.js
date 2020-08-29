const mongoose = require('mongoose');

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount:{
        required:true,
        type:String
    },
    orderid:{
        type:String,
        required:true
    },
    customer:{
        type:String,
    },
    currency:{
       type:String,
       default:'INR'
    },
    description:{
       type:String,
       default:"welcome !! This is a Test One"
    },
    name:{
        type:String
       },
    email:{
        type:String
       },
    contact:{
        type:String
      },
   created:{
        type:Date
      },
    receipt:{
        type:String,
       },
    status:{
        type:String,
       },
    paymentcapture:{
        type:Number
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;