const mongooseDataBase = require('./database')

const handlers = {

    home: (req, res) => {
        res.render('home')
    },

    viewProduct: async (req, res) => {
        const list = await mongooseDataBase.findProduct()
        if (list) {
            const products = list.map((i) => {
                return {
                    name: i.name,
                    category: i.category,
                    amount: i.amount,
                    available: i.available
                }
            })
            res.render('products', { products })
        }
        else {
            res.render('products', { list })
        }
    },

    notFound: (req, res) => {
        res.render('404')
    },

    serverError: (error, req, res, next) => {
        console.log(`Server Error : ${error}`)
        res.render('500')
    }
}

module.exports = handlers