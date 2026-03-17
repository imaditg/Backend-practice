const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const credentials = require('./.credentials.development')
const expressSession = require('express-session')

app.use(cookieParser(credentials.cookiesecret))

app.use(expressSession({resave:false,saveUninitialized:false,secret:credentials.cookiesecret}))

app.engine('handlebars',engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/',(req,res)=>{
    req.session.test = 'hello'
    console.log(req.session)
    console.log(req.sessionID)
    res.render('home')
})

app.use((req,res)=>{
    res.render('404')
})

app.use((err,req,res,next) =>{
    res.render('500')
})

app.listen(port,()=>{
    console.log(`Server has started on https://localhost:${port}`)
})