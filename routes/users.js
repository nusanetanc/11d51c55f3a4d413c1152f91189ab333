var express = require('express');
var session = require('express-session');
var passwordHash = require('password-hash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('../models/user');

// Use the session middleware

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(session({
  secret: 'Your secret key',
  saveUninitialized: false,
  resave: true,
  maxAge: 99999999999999999999
}));

/* Signup User */
router.post('/signup', function(req, res){
   if(!req.body.username || !req.body.email || !req.body.password || !req.body.name){
      res.status("400");
      res.send("Invalid details!");
   } else {
        var user = new User({
        username: req.body.username,
        email: req.body.email,
        password : passwordHash.generate(req.body.password),
        name : req.body.name,
      })
      user.save(function(err, result) {
        if (err) {
          return res.status(404).json({
            title: "An error occurred",
            error: err
          });
        }
        res.status(201).json({
          message: "Ads Saved",
          obj: result
        });
      });
   }
});

/* Signin User */
router.post('/signin', function(req, res, next){
    User.findOne({username: req.body.username}, function(err, doc){
        if (err) {
            return res.status(404).json({
                title: 'An error occured',
                error: err
            });
        } else if (!doc) {
            return res.status(404).json(
                'User could not be found'
            );
        } else if (!passwordHash.verify(req.body.password, doc.password)){
            return res.status(404).json(
                'Invalid password'
            );
        } else {
        if (!req.session.active) {
            req.session.active = req.body.username
        }
            res.redirect('/v0-2/admin/ads');
        }
    })
});

/* session get */
router.get('/session', function(req, res, next) {
        res.status(201).json({
            session: req.session.active
        })   
});


module.exports = router;
