const mongoose = require('mongoose');

const Schema = mongoose.Schema

const logoSchema = new Schema({
    customer:{
        required:true,
        type:String
    },
    imageurl:{
        type:String,
        required:true
    }
})

const Customer = mongoose.model('Customer', logoSchema);

module.exports = Customer;