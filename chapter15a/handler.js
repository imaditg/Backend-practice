const connectDB = require('./connection')

const handlers = {
    serverError: (error, req, res, next) => {
        console.log(`Server Error : ${error}`)
        res.render('500')
    },

    notFound: (req, res, next) => {
        res.render('404')
    },

    home: (req, res, next) => {
        res.render('home')
    },

    view: async (req, res, next) => {
        const lists = await connectDB.findData()
        const products = lists.map((i) => {
            return {
                name: i.name,
                category: i.category,
                price: i.price,
                available: i.available,
                id: i._id
            }
        })
        res.render('views', { products })
    },

    addData: (req, res, next) => {
        res.render('add')
    },

    badRequest: (req, res, next) => {
        res.render('400')
    },

    newAddData: (req, res, next) => {
        req.session.obj = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            available: req.body.available,
        }
        res.send({ success: true })
    },

    addLoading: async (req, res, next) => {
        connectDB.addLoading(req.session.obj)
        delete req.session.obj
        res.redirect(303, '/views')
    },

    apiViews: async (req, res, next) => {
        const lists = await connectDB.findData()
        const product = lists.map((i) => {
            return {
                name: i.name,
                category: i.category,
                price: i.price,
                available: i.available,
            }
        })
        res.send({ product })
    },

    editViews: (req, res, next) => {
        if (req.body._id) {
            req.session.edit = { _id: req.body._id }
            res.status(200).send({ success: true })
        }
        else {
            res.status(400).send({ success: false })
        }
    },

    editLoading: async (req, res, next) => {
        const lists = await connectDB.findById(req.session.edit._id)
        if (lists !== null) {
            console.log(`Product found`)
            delete req.session.edit._id
            const product = {
                id:lists._id,
                name:lists.name,
                category:lists.category,
                price:lists.price,
                available:lists.available,
            }
            res.status(200).render('edit',{product})
        }
        else{
            console.log(`Request Product ${req.session.edit._id} data`  )
            delete req.session.edit._id
            res.status(404).render('/404')
        }
    },

    apiEdit: async (req,res,next) =>{
        const product = await connectDB.findData()
        const productID = product[0]._id
        const newProduct = await connectDB.findById(productID)
        res.status(200).send({newProduct})
    }

}

module.exports = handlers