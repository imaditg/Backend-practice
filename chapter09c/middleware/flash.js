module.exports = ((req,res,next ) =>{
    console.log(req.session)
    res.locals.flash = req.session.flash
    delete req.session.flash
    next()
})