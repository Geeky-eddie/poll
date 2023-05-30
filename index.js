var express = require('express');
var passport = require('passport');
const path = require('path');

// Create a new Express application.
const app = express()

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
const session = require('express-session')
var NedbStore = require('nedb-session-store')( session );

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: "ilovecoding",//process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new NedbStore({
    filename: './session.db'
  }),
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));


// Initialize Passport and restore authentication state, if any, from the
// session.
require('./auth/local');
// require('./auth/admin');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.logUser = req.user;
  next();
});

app.listen(3001, () => {
  console.log("running on port 3001")
});


app.get('/ss', function (req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
  console.log(req.session);
});

//Route import
const UsersRoute = require('./router/user');
const AdminsRoute = require('./router/admin');
app.use('/', UsersRoute);
app.use('/admin/', AdminsRoute);


