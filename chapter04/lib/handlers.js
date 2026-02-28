const fortuneDay = require('./fortune')

exports.home = (req,res) =>{
    res.render('home')
}

exports.about = (req,res) =>{
    res.render('about',{fortuneday : fortuneDay.luck})
}

exports.img01 = (req,res) =>{
    res.render('img')
}

exports.notFound = (req,res) =>{
    // res.status(404)
    res.render('404')
}

exports.serverError = (error,req,res,next) =>{
    console.log(error)
    // res.status(500)
    res.render('500')
}
