const { render } = require("ejs");
const { users } = require("../config/userDB");
users.loadDatabase();
const { votes } = require("../config/voteDB");
votes.loadDatabase();

exports.getHome = (req, res) =>{
    res.render('index',{
    user : req.user
    })
}

exports.getLogin = (req, res) =>{
    res.render('login',{
    user : req.user
    })
}


exports.getVoteList = (req, res) =>{
    votes.find({}).sort({ _id: -1 }).exec((err, data) =>{
        res.render('voteList',{
            data : data,
            user : req.user
        })
        // console.log(req.user)
       // console.log(data.length) -- totle number of polls
    })
};

exports.postLogin = (req, res) =>{
    res.end()
}

exports.getVote = (req, res) =>{
    var id = req.params.id;
    votes.findOne({_id : id}, (err, data) =>{
        if(!data){
            res.send('not a vaild poll')
        }else{
        res.render('vote',{
            data : data,
            user : req.user,
            one : data.one.length,
            two : data.two.length,
            three : data.three.length,
            four : data.four.length,
            five : data.five.length,
            six : data.six.length
        })

        // console.log(typeof data.one.length)
    }
    })
};

exports.postVote =(req,res,next) => {
    console.log('====================================');
    console.log('Hello From Route');
    console.log('====================================');
    var id = req.params.id;
    var vote = req.params.vote;

    votes.findOne({_id : id}, (err, data)=>{
        switch(vote){
            case '0':
                votes.update({ _id: id }, { $push: { one : req.user.username } }, {}, function (err, data) {
                    res.redirect('/vote')
                });
            break
            case '1':
                votes.update({ _id: id }, { $push: { two : req.user.username } }, {}, function (err, data) {
                    res.redirect('/vote')
                });
            break
            case '2':
                votes.update({ _id: id }, { $push: { three : req.user.username } }, {}, function (err, data) {
                    res.redirect('/vote')
                });
            break
            case '3':
                votes.update({ _id: id }, { $push: { four : req.user.username } }, {}, function (err, data) {
                    res.redirect('/vote')
                });
            break
            case '4':
                votes.update({ _id: id }, { $push: { five : req.user.username } }, {}, function (err, data) {
                    res.redirect('/vote')
                });
            break
            case '5':
                votes.update({ _id: id }, { $push: { six : req.user.username } }, {}, function (err, data) {
                    res.redirect('/vote')
                });
            break
            default:
                res.status(500)
             break
        }
    })
}

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

exports.goback = (req, res, next) => {
    res.render('index',{})
}
