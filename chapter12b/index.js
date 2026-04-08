const express = require('express')
const app = express()
const cluster = require('cluster')

app.use((req,res,next)=>{
    if(cluster.isWorker){
        console.log(`CLUSTER: ${cluster.worker.id} received`)
    }
    next()
})

app.get('/',(req,res)=>{
    res.send('Home')
})

app.use((req,res)=>{
    res.send('404 - Not Found')
})

app.use((error,req,res,next)=>{
    res.send('500 - Server Error')
})

function startServer(port){
    app.listen(port,()=>{
        console.log(`Server started in ${app.get('env')} mode at https://localhost:${port}`)
    })
}

if((require.main) === module){
    startServer(process.env.PORT || 3000)
}
else{
    module.exports = startServer
}