const { votes } = require("../config/voteDB");
votes.loadDatabase();

const { admins } = require("../config/adminDB")
admins.loadDatabase();

const { users } = require("../config/userDB");
users.loadDatabase();

exports.getCreate =(req, res, next ) =>{
    res.render('create',{
        user : req.user
        })
}

exports.postCreate =(req, res, next ) =>{
    var poll = [];
    var a = req.body;
    if( a.poll1 !== ""){poll.push(a.poll1)};
    if( a.poll2 !== ""){poll.push(a.poll2)};
    if( a.poll3 !== ""){poll.push(a.poll3)};
    if( a.poll4 !== ""){poll.push(a.poll4)};
    if( a.poll5 !== ""){poll.push(a.poll5)};
    if( a.poll6 !== ""){poll.push(a.poll6)};

    const upload = {
       title : req.body.title,
       message : req.body.message,
        poll : poll,
        one : [],
        two : [],
        three : [],
        four : [],
        five :[],
        six : [],
        time : Date.parse(req.body.time)
    };
    votes.insert(upload, function (err, newDoc) { 
        res.redirect('/admin/vote')
    });
    
}

exports.postSignUp = (req, res) =>{
    const upload = {
        username : req.body.username,
        password : req.body.password,
        name : req.body.name,
        email : req.body.email,
        admin : true
    }
    users.insert(upload,(err, sent)=>{
        res.redirect('/admin/')
    })
}

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

exports.DeleteVote = (req, res,next) => {
    var id = req.params.id;
    votes.remove({ _id: id }, {}, function (err, numRemoved) {
        res.redirect('/admin/vote')
      });
}

exports.getVoteList = (req, res) =>{
    votes.find({}).sort({ _id: -1 }).exec((err, data) =>{
        res.render('AvoteList',{
            data : data,
            user : req.user
        })
       // console.log(data.length) -- totle number of polls 
    })
};

exports.getLogin = (req, res) =>{
    res.render('Alogin',{
    user : req.user
    })
}

exports.getAdmin = (req, res) =>{
    res.render('admin',{
    user : req.user
    })
}

exports.getSignUp = (req, res) =>{
    res.render('signup',{
    user : req.user
    })
}

exports.getVote = (req, res) =>{
    var id = req.params.id;
    votes.findOne({_id : id}, (err, data) =>{
        if(!data){
            res.send('not a vaild poll')
        }else{
        res.render('Avote',{
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

exports.getList = (req, res) =>{
    users.find({}).sort({ name: 1 }).exec((err, data) =>{
        res.render('list',{
            data : data,
            user : req.user
        })
    })
};


exports.postSignUp2 = (req, res) =>{
    const upload = {
        username : req.body.username,
        password : req.body.password,
        name : req.body.name,
        email : req.body.email
    };
    users.insert(upload,(err, sent)=>{
        res.redirect('/admin/list')
    })
}

exports.getSignUp2 = (req, res) =>{
    res.render('signup2',{
    user : req.user
    })
}