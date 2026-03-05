const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true})) //middleware

app.engine('handlebars',engine({
    defaultLayout:'main'
}))

app.set('view engine','handlebars')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/signup',(req,res)=>{
    res.render('form',{csrf:'token007'})
})

app.post('/signup/process',(req,res)=>{
    console.log(`form : ${req.query.form}`)
    console.log(`CSRF : ${req.body._csrf}`)
    console.log(`name : ${req.body.name}`)
    console.log(`email : ${req.body.email}`)
    res.redirect(303,'/signup/thanks')
})

app.get('/signup/thanks',(req,res)=>{
    res.render('thanks')
})

app.use((req,res)=>{
    res.render('404')
})

app.use((error,req,res,next)=>{
    res.render('500')
})

app.listen(port,()=>{
    console.log(`server started on https://localhost${port}`)
})