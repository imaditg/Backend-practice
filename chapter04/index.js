const express = require('express');
const handlers = require('./lib/handlers')
const app = express();
const port = process.env.PORT || 3000
const {engine} = require('express-handlebars')

app.engine('handlebars',engine({
    defaultLayout:'main'
}))

app.set('view engine','handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/',handlers.home)

app.get('/about',handlers.about)

app.get('/image',handlers.img01)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(port,()=>{
    console.log(`server started on ${port}`)
})