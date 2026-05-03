const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('home')
})

// app.get('/user:name',(req,res)=>{
//     const name = req.params.name
//     res.send(`user : ${name}`);
// })

app.get(/^\/user(name)?$/,(req,res)=>{
    res.send('user')
})

app.get(/crazy|mad(ness)?|luna/,(req,res)=>{
    res.send('morons')
})

app.listen(port,()=>{
    console.log(`Server started on ${app.get('env')} mode at https://localhost:${port}`)
})