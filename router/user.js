const router = require('express').Router();
var controller = require('../controller/user.js');
const passport = require('passport');
const { authChecker } = require('../middleware/authChecker');
const { voteChecker } = require('../middleware/voteChecker');
const { cookieChecker } = require('../middleware/cookieChecker');


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

  router.use((req, res, next) => {
    console.log('====================================');
    console.log(req.path);
    console.log('====================================');
    next()
  })
router.get('/logout', controller.getLogout);
// router.get('/', controller.getHome)
router.get('/login', controller.getLogin)
router.get('/vote', authChecker, controller.getVoteList)
router.get('/vote/:id', authChecker, controller.getVote)
router.get('/goback', authChecker, controller.goback)
router.get('/vote/:id/choice/:vote', authChecker, voteChecker, controller.postVote) // beg kjeho to debug


module.exports = router;

// exports.getLogout = function(req, res) {
//   req.logout(function(err) {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     // Successful logout
//     res.redirect('/login');
//   });
// };

