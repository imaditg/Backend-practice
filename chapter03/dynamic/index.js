const express = require('express')
const fortune = require('./lib/fortune');
const app = express()
const port = process.env.PORT || 3000
const {engine} = require('express-handlebars')

app.engine('handlebars',engine({
    defaultLayout:'main'
}))

app.set('view engine','handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) =>{
    res.render('home')
})

app.get('/about',(req,res)=>{
   
    res.render('about',{luckyDay : fortune.getFortune})
})

app.use((req,res)=>{
    res.status(404)
    res.render('404')
})

app.use((err,req,res,next)=>{
    res.staus(500)
    res.send('server error');
})

app.listen(port,()=>{
    console.log(`Server started on https://localhost:${port}. press ctl + c to exit`)
})