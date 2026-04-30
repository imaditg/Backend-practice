const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    category:String,
    price:Number,
    available:Boolean,
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product