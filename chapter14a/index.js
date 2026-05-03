const express = require('express')
const port = 3000
const app = express()

app.get('/',(req,res,next)=>{
    res.send('home')
})

function chances1 (req,res,next){
    if(Math.random() < 0.5){
        res.send('Heads')
    }
    else{
        next()
    }
}

app.get('/toss',chances1,(req,res,next) =>{
    res.send('Tails')
})

app.listen(port,()=>{
    console.log(`Server started on ${app.get('env')} mode at https://localhost:${port}`)
})