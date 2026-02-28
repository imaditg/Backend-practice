const express = require('express')

const port = 3000

const app = express()

const { engine } = require('express-handlebars')

const weatherMiddleware = require('./lib/middleware/weather')

app.use(weatherMiddleware)

app.engine('handlebars', engine({
    defaultLayout: 'main'
}))

app.set('view engine','handlebars')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/block', (req,res)=>{
    res.render('block',{
    currency: {
        name: 'United States dollars',
        abbrev: 'USD',
    },
    tours: [
        { name: 'Hood River', price: '$99.95' },
        { name: 'Oregon Coast', price: '$159.95' },
    ],
    specialsUrl: '/January-specials',
    currencies: ['USD', 'GBP', 'BTC'],
})
})

app.listen(port, () => {
    console.log(`server started on https://localhost:${port}`)
})