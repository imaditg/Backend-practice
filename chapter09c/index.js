const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const credentials = require('./.credentials.development')
const flasMiddleware = require('./lib/middleware/flash')
const port = process.env.PORT || 3000

app.use(express.json())

app.use(cookieParser(credentials.cookieSecret))

app.use(expressSession({secret:credentials.cookieSecret,
    resave:false,
    saveUninitialized:false,})
)

app.use(flasMiddleware)

app.engine('handlebars',engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.get('/',(req,res)=>{
    req.session.person = 'mathew'
    console.log(req.session)
    res.render('home')
})

app.get('/signup',(req,res) =>{
    res.render('signup',{csrf:'token007'})
})

app.post('/api/submit',(req,res)=>{
    req.session.flash = {
        name : req.body.name,
        email: req.body.email,
        csrf: req.body.csrf,
    }
    res.send({result:true})
})

app.get('/thanks',(req,res)=>{
    res.render('thanks')
})

app.use((req,res)=>{
    res.render('404')
})

app.use((err,req,res,next)=>{
    res.render('500')
})

app.listen(port,()=>{
    console.log(`Server is started on https://localhost:${port}`)
})