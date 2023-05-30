const router = require('express').Router();
const controller = require('../controller/admin.js');
const { authChecker } = require('../middleware/authADChecker');
const { voteChecker } = require('../middleware/voteChecker');
const { authADChecker } = require('../middleware/adminAuthChecker');
const passport = require('passport');

router.get('/create',authChecker,authADChecker, controller.getCreate)
router.post('/create',authChecker,authADChecker, controller.postCreate)
router.get('/vote',authChecker,authADChecker,controller.getVoteList)
router.get('/vote/del/:id',authChecker,authADChecker,controller.DeleteVote)
router.get('/',authChecker,authADChecker, controller.getAdmin)
router.get('/vote/:id',authChecker,authADChecker,controller.getVote)
router.get('/logout',controller.getLogout);
router.get('/signup',authChecker, authADChecker, controller.getSignUp)
router.post('/signup',authChecker,authADChecker, controller.postSignUp)
router.get('/list',authChecker,authADChecker, controller.getList)
router.get('/add',authChecker, authADChecker, controller.getSignUp2)
router.post('/add',authChecker,authADChecker, controller.postSignUp2)

router.post('/login', 
  passport.authenticate('admin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// router.get('/vote/:id',controller.getVote)
// router.get('/vote/:id/choice/:vote',authChecker,voteChecker,controller.postVote)
module.exports = router;