const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const {engine} = require('express-handlebars')
const handler = require('./handler')
const db = require('./connection')
const credentials = require('./.credentials.development')
const session = require('express-session')

app.engine('handlebars',engine({defaultLayout:'mains'}))
app.set('view engine','handlebars')

db.connectionON().then(()=>{
    console.log(`MongoDB connection established`)
}).catch((error)=>{
    console.log(`MongoDB connection error ${error}`)
})

app.use(express.json())

app.use(session({
    secret:credentials.cookieSecret,
    resave:false,
    saveUninitialized:false,
}))

app.get('/',handler.home)

app.get('/views',handler.view)

app.get('/views/add',handler.addData)

app.post('/api/newadd',handler.newAddData)

app.get('/views/add/loading',handler.addLoading)

app.get('/api/views',handler.apiViews)

app.post('/api/editviews',handler.editViews)

app.get('/api/edit-loading',handler.editLoading)

app.get('/bad-request',handler.badRequest)

app.get('/views/edit',handler.editViews)

app.get('/api/api-edit',handler.apiEdit)

app.use(handler.notFound)

app.use(handler.serverError)

app.listen(port,()=>{
    console.log(`Server started on ${app.get('env')} mode at https://localhost:${port}`)
})