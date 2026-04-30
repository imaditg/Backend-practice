const mongoose = require('mongoose')
const credential = require('./.credentials.developments')
const Product = require('./models/product')

const db = {

     connectionON : async () => {
        await mongoose.connect(credential.connectingString)
        console.log('mongoDB connection established')
    },

    findProduct: async ()=>{
        const products = await Product.find()
        if(products.length){
            console.log(`products has been found`)
            return products
        }
        else{
            console.log('Products Not Found. New products is been creating')
            await Product.create([
                {name:'Lifebuoy',category:'Detergent',price:255,available:true},
                {name:'Sugar',category:'Food',price:320,available:false},
                {name:'Hanger',category:'Plastic',price:120,available:true},
                {name:'Nescafe Cold coffee',category:'Beverages',price:50,available:true},
            ])
            const products = await Product.find()
            console.log(`products has been found`)
            return products
        }
    },

    addProduct: async (session)=>{
        let result = true
        if(session.addData.available.toLowerCase()==='true'){
            result = true
        }
        else{
            result = false
        }
        await Product.create(
            {
                name: session.addData.name,
                category: session.addData.category,
                price: Number(session.addData.price),
                available: result
            }
        )
        console.log('New Product has been added')
    },

    findID: async(session) =>{
        const product = await Product.findById(session)
        console.log('product found by Id')
        return product
    },
    
    mongoUpdate: async(session) =>{
        let parity = true
        if(session.modifiedData.available.toLowerCase() === 'true' ){
            parity = true
        }
        else{
            parity = false
        }
        const product = {
            name: session.modifiedData.name,
            category: session.modifiedData.category,
            price: Number(session.modifiedData.price),
            available: parity,
            _id: session.modifiedData._id
        }
        const result = await Product.updateOne({_id:product._id},
            {
                $set:{
                    name: product.name,
                    category:product.category,
                    price:product.price,
                    available:product.available,
                }
            }
        )
        if(result.matchedCount === 1){
            console.log('product has been updated')
        }
        else{
            console.log('Unable to update the product')
        }
    },

    dataDelete: async (input)=>{
        await Product.findByIdAndDelete(input)
        console.log(`product deleted`)
    }
}

module.exports = db