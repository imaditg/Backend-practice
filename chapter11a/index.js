const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const credentials = require('./.credentials.development')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flashMiddleware = require('./lib/middleware/flash')
const nodeMailer = require('nodemailer')
const port = process.env.PORT || 3000

app.use(express.json())

app.use(cookieParser(credentials.cookiesecret))

app.use(expressSession({ resave: false, saveUninitialized: false, secret: credentials.cookiesecret }))


const mailTransport = nodeMailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: '587',
    secure: false,
    auth: {
        user: credentials.sendgrid.username,
        pass: credentials.sendgrid.password
    }
})

app.engine('handlebars', engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.use(flashMiddleware)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/mail', (req, res) => {
    res.render('mail', { csrf: 'token007' })
})

app.post('/api/mailSent', async (req, res) => {
    req.session.flash = {
        csrf: req.body.csrf,
        to: req.body.to,
        from: req.body.from,
        sub: req.body.sub_,
        text: req.body.text,
    }
    try {
        const result = await mailTransport.sendMail({
            from: req.body.from,
            to: req.body.to,
            subject: req.body.sub_,
            text: req.body.text
        })
        console.log(`Mail sent : ${result}`)
        res.send({ result:true })
    }
    catch (error) {
        console.log(`Mail could not be sent ${error.message}`)
        res.send({result:false})
    }
})


app.get('/thank', (req, res) => {
    res.render('thank')
})

app.use((req, res) => {
    res.render('404')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).render('500')
})

app.listen(port, () => {
    console.log(`Server started on https://localhost:${port}`)
})