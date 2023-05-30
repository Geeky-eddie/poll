const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const connection = require('./database');
const { users } = require("../config/userDB");
users.loadDatabase();


const verifyCallback = (username, password, done) => {

    users.findOne({ username: username },
        (err, user)=>{
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password != password) { return done(null, false); }
            return done(null, user);
        })
}

const strategy  = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log(user, 'from serialize')
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    users.findOne({_id:id}, (err, user)=>{
        if(err){ return done(err);}
        done(null, user);
        console.log(user, "from deserialize ")
    })
});;
