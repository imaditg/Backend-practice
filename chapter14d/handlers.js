const staf = {
    USA: {
        mitch: {
            name: "Mitch",
            credo: "Put your hand in the hand of the men who stilled the waters"
        },
        madeline: {
            name: "Madeline",
            credo: "No Mercy"
        }
    },
    ITALY: {
        munabhai: {
            name: "munabhai",
            credo: "Hello is anybody in there?"
        }
    }
}



const handler = {
    serverError: (error, req, res, next) => {
        console.log(`server error : ${error}`)
        res.render('500')
    },

    notFound: (req, res, next) => {
        console.log('not found')
        res.render('404')
    },

    home: (req, res, next) => {
        res.render('home')
    },

    staff: (req, res, next) => {
        const country = req.params.country
        const info1 = staf[country]
        if (!info1) {
            next()
        }
        else {
            const name = req.params.name
            const info2 = info1[name]
            if (!info2) {
                next()
            }
            else {
                res.render('staff', { info2 })
            }
        }
    }

}

module.exports = handler