module.exports = (req, res, next) => {
    // console.log(req.session)
    if (req.session.flash) {
        // console.log(req.session + 'aaaa')
        res.locals.flash = req.session.flash
        delete req.session.flash
    }
    next()
}