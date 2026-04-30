const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const handler = require('./handlers')
const credential = require('./.credentials.developments')
const expressSession = require('express-session')
const dataBase = require('./db')
const port = process.env.PORT || 3000

dataBase.connectionON().catch((error)=>{
    console.log(`MongoDB connection error : ${error}`)
})

app.engine('handlebars', engine({
    defaultLayout: 'mains'
}))
app.set('view engine', 'handlebars')

app.use(express.json())

app.use(expressSession({
    saveUninitialized: false,
    resave: false,
    secret: credential.cookieSecret,
}))

app.get('/', handler.home)

app.get('/product', handler.lists)

app.get('/product/add',handler.redAdd)

app.post('/api/data',handler.apiFetch)

app.get('/product/add/addingData',handler.addingData)

app.post('/api/edit',handler.editFetch)

app.get('/product/edit',handler.edit)

app.post('/api/modify',handler.modifier)

app.get('/product/edit/update',handler.mongoModifier)

app.post('/api/delete',handler.deleteFetch)

app.get('/product/delete',handler.delete)

app.post('/api/remove',handler.removeOne)

app.get('/product/deleting',handler.deleting)

app.use(handler.notFound)

app.use(handler.serverError)

app.listen(port, () => {
    console.log(`Server started on ${app.get('env')} mode at https://localhost:${port}`)
})