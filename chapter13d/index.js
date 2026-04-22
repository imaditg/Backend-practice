const express = require('express');
const app = express()
const {engine} = require('express-handlebars')
const handlers = require('./handlers')
const port = process.env.PORT || 3000
const mongooseDataBase = require('./database')

app.engine('handlebars',engine({
    defaultLayout:'main'
}))
app.set('view engine','handlebars')

mongooseDataBase.mongooseConnect()

app.get('/',handlers.home)

app.get('/products',handlers.viewProduct)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(port,()=>{
    console.log(`Server started on ${app.get('env')} mode on https://localhost:${port}`)
})