// checking if user are logged in to advance
 exports.authChecker = (req, res, next) =>{
    console.log('==================From Auth Check ==================');
    console.log(req.user);
    console.log('====================================');
    if(req.user){
        next()
    }else{
        res.render('login',{
            user : req.user
            })
    }
};
