const staff = {
    mitch: {
        name: 'Mitch',
        credo: 'Staying Alive',
    },
    madeline: {
        name: 'Madeline',
        credo: 'Put your hand in the hand of the man who stilled the water'
    },
    munabhai: {
        name: 'Muna Bhai',
        credo: 'Tension nahi lenna ka'
    }
}

const handlers = {
    notFound: (req, res, next) => {
        console.log('Page not found')
        res.render('404')
    },

    serverError: (error, req, res, next) => {
        console.log(`Server error : ${error}`)
        res.render('500')
    },

    home: (req, res, next) => {
        res.render('home')
    },

    staffInfo: (req, res, next) => {
        const info = req.params.name;
        const data = staff[info]
        if (!data) {
            console.log('Staff is not found')
            next()
        }
        else {
            res.render('staff', { data })
        }
    }

}

module.exports = handlers