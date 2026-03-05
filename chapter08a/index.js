const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const {engine} = require('express-handlebars');

app.engine('handlebars',engine({
    defaultLayout:'main'
}))

app.set('view engine','handlebars')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/form',(req,res)=>{
    res.render('forms',{csrf:'token007'})
})

app.get('/form-submit',(req,res)=>{
    console.log(req.query.name)
    console.log(req.query.email)
    console.log(req.query._csrf)
    res.redirect(303,'/thanks')
})

app.get('/thanks',(req,res)=>{
    res.render('thanks')
})

app.use((req,res)=>{
    res.render('404');
})

app.use((err,req,res,next)=>{
    res.render('500')
})

app.listen(port,()=>{
    console.log(`server started on https://localhost:${port}`);
})