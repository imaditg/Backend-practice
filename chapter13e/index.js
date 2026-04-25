const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const handler = require('./handlers')
const credentials = require('./.credentials.development')
const expressSession = require('express-session')
const port = process.env.PORT || 3000
const { RedisStore } = require('connect-redis')
const {createClient} = require('redis')
const redisClient = createClient({url:credentials.redis.url})
const cookieParser = require('cookie-parser')

app.engine('handlebars', engine({
    defaultLayout: 'mains'
}))
app.set('view engine', 'handlebars')

app.use(cookieParser(credentials.cookieSecret))

async function start(){
    await redisClient.connect()
    app.use(expressSession({
        saveUninitialized:false,
        resave:false,
        secret:credentials.cookieSecret,
        store: new RedisStore({
            client:redisClient,
            prefix: "mysession:",
        }),
        cookie:{
            maxAge:86400000
        }
    }))

    app.get('/', handler.home)

app.get('/contact', handler.contact)

app.get('/about', handler.about)

app.get('/help', handler.help)

app.get('/setURL/:animal',handler.setURL)

app.use(handler.notFound)

app.use(handler.serverError)

app.listen(port, () => {
    console.log(`Server started on ${app.get('env')} mode at https://localhost:${port}`)
})
}

start().then(()=>{
    console.log(`Redis connected`)
}).catch((error)=>{
    console.log(`Reddis connection error : ${error}`)
})

