const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const credentials = require('./.credentials.development')
const {connectionString} = credentials.mongo

mongoose.connect(connectionString)

const db = mongoose.connection

db.on('error',error =>{
    console.error('Error' + error.message)
    process.exit(1)

})

db.once('open',()=>{
    console.log('Connected')
})

app.get('/',(req,res)=>{
    res.send('Home')
})

app.use((req,res)=>{
    res.send('404 - Not Found')
})

app.use((err,req,res,next)=>{
    res.send('500 - Server Error')
})

app.listen(port,()=>{
    console.log(`Server Started on ${app.get('env')} mode at https://localhost:${port}`)
})