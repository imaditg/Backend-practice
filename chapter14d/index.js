const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const port = process.env.PORT || 3000
const handler = require('./handlers')

app.engine('handlebars',engine({defaultLayout:'mains'}))
app.set('view engine','handlebars')

app.get('/',handler.home)

app.get('/staff/:country/:name',handler.staff)

app.use(handler.notFound)

app.use(handler.notFound)

app.listen(port,()=>{
    console.log(`Server started on ${app.get('env')} at https://localhost:${port}`)
})