const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const multipart = require('multiparty')
const port = process.env.PORT||3000

app.engine('handlebars',engine({
    defaultLayout:'main'
}))

app.set('view engine','handlebars')

app.use(express.json())

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/signup',(req,res)=>{
    res.render('forms',{csrf:'token007'})
})

app.post('/api/signup-upload',(req,res)=>{
    const form = new multipart.Form()
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.status('500')
            res.send('error')
        }
        console.log(fields)
        console.log(files)
        res.send({result:'success'})
        
    })
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