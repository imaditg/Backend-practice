const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const {engine} = require('express-handlebars')
const handlers = require('./handler')

app.engine('handlebars',engine({defaultLayout:'mains'}))

app.set('view engine','handlebars')

app.get('/',handlers.home)

app.get('/staff/:name',handlers.staffInfo)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(port,()=>{
    console.log(`Server started on ${app.get('env')} mode at https://localhost:${port}`)
})