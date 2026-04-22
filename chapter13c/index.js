const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const {engine} = require('express-handlebars')
const connectDB = require('./db')

connectDB.connect()

app.engine('handlebars',engine({
    defaultLayout:'main'
}))

app.set('view engine','handlebars')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/table',async (req,res)=>{
    const context = await connectDB.findProduct()
    const products = context.map((i) =>{
        return{
         name : i.name,
         category: i.category,
         amount:i.amount,
         available:i.available
        }

    })
    
    res.render('table',{products})
})

app.use((req,res)=>{
    res.render('404')
})

app.use((error,req,res,next)=>{
    console.log(error)
    res.render('500')
})

app.listen(port,()=>{
    console.log(`Server started on ${app.get('env')} mode at https://localhost:${port}`)
})