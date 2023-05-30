// Checking if Login user is an admin 
exports.authADChecker = (req, res, next) =>{
    if(req.user.admin){
        next()
    }else{
        res.send('sorry not auth not an admin')
    }
};