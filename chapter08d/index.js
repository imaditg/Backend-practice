const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const multiparty = require('multiparty')
const port = process.env.PORT || 3000

app.engine('handlebars',engine({
    defaultLayout:'main'
}))

app.set('view engine','handlebars')

app.use(express.json())

app.get('/',(req,res) =>{
    res.render('home')
})

app.get('/signup',(req,res) =>{
    res.render('form',{csrf:'token007'})
})

app.post('/signup-upload',(req,res)=>{
    const form = new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.status(500)
            res.send(`An error occur ${err}`)
        }
        console.log(`fields data : ${fields._csrf}`)
        console.log(`fields data : ${fields.name}`)
        console.log(`fields data : ${fields.email}`)
        console.log(...files.photo)
        res.redirect(303,'/thankyou')
    })
})

app.get('/thankyou',(req,res)=>{
    res.render('thankyou')
})

app.listen(port,()=>{
    console.log(`Server is started on port https://localhost:${port}`)
})