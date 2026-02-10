//index.js file

const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.type('text/plain')
    res.status(200)
    res.send('Home')
})

app.get('/about',(req,res)=>{
    res.type('text/plain')
    res.status(200)
    res.send("About")
})

app.get('/image',(req,res)=>{
   res.type('image/jpeg')
   res.sendFile(__dirname + '/public/img/img02.jpeg')
   res.status(200)
})

app.use((req,res) =>{
    res.type('text/plain')
    res.status(404);
    res.send('Not Found - 404')
})

app.use((err,req,res,next)=>{
    console.log(err)
    res.type('text/plain')
    res.status(500)
    res.send("Server error")
})

app.listen(port,()=>{
    console.log(`Server started on https://localhost${port}`)
})