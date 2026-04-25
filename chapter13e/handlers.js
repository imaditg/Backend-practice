// const credentials = require('./.credentials.development')

const handler = {
    notFound:(req,res)=>{
        res.render('404')
    },
    serverError:(error,req,res,next)=>{
        console.log(`Server error : ${error}`)
        res.render('500')
    },
    home:(req,res)=>{
        res.render('home')
    },
    contact:(req,res)=>{
        res.render('contact')
    },
    about:(req,res)=>{
        console.log(req.session)
        res.render('about')
    },
    help:(req,res)=>{
        res.render('help')
    },
    setURL:(req,res)=>{
        req.session.animal = req.params.animal
        res.redirect(303,'/about')
    }
}

module.exports = handler