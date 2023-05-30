// checking if user are logged in to advance  
 exports.authChecker = (req, res, next) =>{
    if(req.user){
        next()
    }else{
        res.redirect('/login')
    }
};