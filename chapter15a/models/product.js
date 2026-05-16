const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    available: Boolean,
})

const Products = mongoose.model('Product',productSchema)

module.exports = Products