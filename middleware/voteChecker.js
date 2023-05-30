const { votes } = require('../config/voteDB');
votes.loadDatabase();

exports.voteChecker  = (req, res, next) => {
    var id = req.params.id;
   var user = req.user.username;
   console.log(user)
   if(user == null){
   return res.status(500)
}
    votes.findOne({ _id : id}, (err, data) =>{
        var one = data.one.includes(user);
        var two = data.two.includes(user);
        var three = data.three.includes(user);
        var four = data.four.includes(user);
        var five = data.five.includes(user);
        var six = data.six.includes(user);
        if(one !== true && two !== true && three !== true && four !== true && five !== true && six !== true){
            next()
        }
        else{
            res.render('voted',{
                user : req.user,
                data : data
                })
        }
    })
}
