const mongoose = require('mongoose')
const Product = require('./models/products')
const credential = require('./.credentials.development')
const connectURL = credential.mongo

const mongooseConnect = async () => {
    try {
        await mongoose.connect(connectURL.connectString)
        console.log('MongoDB connection established')
    }
    catch (error) {
        console.log(`MongoDB error : ${error}`)
    }
}

const findProduct = async () => {
    const products = await Product.find()
    if(products.length){
        console.log('products found')
       return products
    }
    else{
        await Product.create([
            {name:"Lifebuoy",category:"Detergent",amount:"255",available:"true"},
            {name:"Sugar",category:"Food",amount:"320",available:"false"},
            {name:"Hanger",category:"Plastic",amount:"120",available:"true"}
        ])
    }
}

module.exports = {mongooseConnect , findProduct}

