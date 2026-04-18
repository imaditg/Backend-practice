const credentials = require('./.credentials.development')
const {connectURL} = credentials.mongo
const mongoose = require('mongoose')

if(!connectURL){
    console.log(`Connect Url is empty or invalid : ${connectURL}`)
    process.exit(1)
}

mongoose.connect(connectURL)
.then(()=>{
    console.log('Mongoose Connected')
})
.catch((error)=>{
    console.log(`Mongoose conection failed : ${error}`)
})


const db = mongoose.connection
