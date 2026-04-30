const credential = require('./.credentials.developments')
const dataBase = require('./db')

const handler = {
    notFound: (req, res) => {
        res.render('404')
    },

    serverError: (error, req, res, next) => {
        console.log(`Server error : ${error}`)
        res.render('500')
    },

    home: (req, res) => {
        delete req.session.ids
        res.render('home')
    },

    lists: async (req, res) => {
        const lists = await dataBase.findProduct()
        const products = lists.map((i) => {
            return {
                name: i.name,
                category: i.category,
                price: i.price,
                available: i.available,
                id: i._id
            }
        })
        res.render('lists', { products })
    },

    redAdd: (req, res) => {
        res.render('add')
    },

    apiFetch: (req, res) => {
        req.session.addData = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            available: req.body.available
        }
        res.send({ success: true })
    },

    addingData: async (req, res) => {
       await dataBase.addProduct(req.session)
       delete req.session.addData
       res.redirect(303,'/product')
    },
     
    editFetch: (req,res) =>{
        req.session.ids = {
            id: req.body.id
        }
        res.send({success:true})
    },

    edit: async (req,res) =>{
        const list = await dataBase.findID(req.session.ids.id)
        delete req.session.ids
        const product = {
            id:list._id,
            name:list.name,
            category:list.category,
            price:list.price,
            available:list.available
        }
        res.render('edit',{product})
    },

    modifier: (req,res)=>{
        req.session.modifiedData = {
            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            available:req.body.available,
            _id:req.body._id,
        }
        res.send({success:true})
    },

    mongoModifier: async (req,res)=>{
        await dataBase.mongoUpdate(req.session)
        delete req.session.modifiedData
        res.redirect(303,'/product');
    },

    deleteFetch: (req,res)=>{
        req.session.ids = req.body.id
        res.send({success:true})
    },

    delete: async (req,res)=>{
        const list = await dataBase.findID(req.session.ids)
        delete req.session.ids
        const product = {
            id:list._id,
            name:list.name,
            category:list.category,
            price:list.price,
            available:list.available
        }
        res.render('delete',{product})
    },

    removeOne: (req,res)=>{
        req.session.removeid = req.body.id
        res.send({success:true})
    },

    deleting: async (req,res)=>{
        const ids = req.session.removeid
        await dataBase.dataDelete(ids)
        delete req.session.removeid
        res.redirect(303,'/product')
    }
}

module.exports = handler