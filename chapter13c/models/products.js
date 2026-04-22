const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    category:String,
    amount:Number,
    available:Boolean
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product