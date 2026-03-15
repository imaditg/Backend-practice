//should add ".credentials.*" in .gitignore, to hide .credentials.development.json file. I have not added for trial purpose
const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const port = process.env.PORT || 3000
const cookieParser = require('cookie-parser')
const {credentials} = require('./config')

app.engine('handlebars',engine({defaultLayout:'main'}))

app.set('view engine','handlebars')

app.use(cookieParser(credentials.cookieSecret))

app.get('/',(req,res)=>{
    res.cookie('harry',"potter")
    res.cookie('Ronald','Weasley',{signed: true})
    const receivedCookie = req.signedCookies.Ronald
    console.log(receivedCookie)
    res.render('home')
})

app.use((req,res)=>{
    res.render('404')
})

app.use((err,req,res,next)=>{
    res.render('500')
})

app.listen(port,()=>{
    console.log(`server is started on https://localhost:${port}`)
})