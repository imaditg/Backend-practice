const express = require('express');

const {engine} = require('express-handlebars')

const port = process.env.PORT || 3000

const app = express();

app.use(express.static(__dirname + '/public'))

app.engine('handlebars',engine(
    {defaultLayout:'main'},
))

app.set('view engine','handlebars')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.use((req,res)=>{
    res.status(404)
    res.render('404');
})

app.use((err,req,res,next) =>{
    res.status(500)
    res.render('500')
})

app.listen(port,()=>{
    console.log(`server started on hhtps://localhost:${port}`);
})