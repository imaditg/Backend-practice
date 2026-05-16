const credentials = require('./.credentials.development')
const mongoose = require('mongoose')
const Product = require('./models/product')

const dataBase = {
    connectionON: async () => {
        mongoose.connect(credentials.connectingString)
    },

    findData: async () => {
        const products = await Product.find()
        return products
    },

    addLoading: async (data) => {
        let boolean = true
        if (data.available.toLowerCase() === 'true') {
            boolean = true
        }
        else {
            boolean = false
        }
        const parseData = {
            name: String(data.name),
            category: String(data.category),
            price: Number(data.price),
            available: boolean,
        }
        await Product.insertOne({
            name: parseData.name,
            category: parseData.category,
            available: parseData.available,
            price: parseData.price,
        })
    },

    findById : async (id) =>{
        const product = await Product.findById(id)
        return product;
    }
}

module.exports = dataBase