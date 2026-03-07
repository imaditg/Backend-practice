const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const {engine} = require('express-handlebars')
// const bodyParser = require('body-parser')

// app.use(bodyParser.json())

app.use(express.json())

app.engine('handlebars',engine({defaultLayout:'main'}))

app.set('view engine','handlebars')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/signup',(req,res)=>{
    res.render('form',{csrf:'token007'})
})

app.post('/api/signup-post',(req,res)=>{
    console.log(req.body._csrf)
    console.log(req.body.name)
    console.log(req.body.email)
    res.send({result:'success'})
})

app.use((req,res)=>{
    res.render('404')
})

app.use((error,req,res,next)=>{
    res.render('500')
})

app.listen(port,()=>{
    console.log(`Server is started on https://localhost:${port}`)
})