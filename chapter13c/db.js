const mongoose = require('mongoose')
const credentials = require('./.credentials.development')
const stringURL = credentials.mongo.keyURL
const Product = require('./models/products')

const connect = async () => {
    try {
        await mongoose.connect(stringURL)
        console.log('MongoDB connection established')
    }
    catch (e) {
        console.log(`MongoDB connection error : ${e}`)
    }

}

const findProduct = async ()=>{
    const products = await Product.find();
    if(products.length){
        console.log("products found")
        return products
    }
    else{
        console.log("products not found")
        await Product.create([
            {name:"Lifeboy",category:"Detergent",amount:255,available:true},
            {name:"Sugar",category:"Food",amount:320,available:false},
            {name:"Hanger",category:"Plastic",amount:120,available:true},
        ])
    }
}

module.exports = { connect,findProduct }