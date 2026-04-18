const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db')

app.get('/',(req,res)=>{
    res.send('HOME')
})

app.use((req,res)=>{
    res.send('404 - Not Found')
})

app.use((error,req,res,next)=>{
    console.log('error : ' + error)
    res.send('500 - Server Error')
})

app.listen(port,()=>{
    console.log(`Server started on ${app.get('env')} mode at https://localhost:${port}`)
})