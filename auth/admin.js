const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const connection = require('./database');
const { admins } = require("../config/adminDB");
admins.loadDatabase();


const verifyCallback = (username, password, done) => {

    admins.findOne({ username: username },
        (err, user)=>{
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password != password) { return done(null, false); }
            return done(null, user);
        })
        console.log('ran')
}

const strategy1  = new LocalStrategy(verifyCallback);

passport.use(strategy1);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    admins.findOne({_id:id}, (err, user)=>{
        if(err){ return done(err);}
        done(null, user);
    })
});;