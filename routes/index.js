var express = require('express');
var session = require('express-session');
var passwordHash = require('password-hash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var Ads = require('../models/ads');
var Tv = require('../models/tv');
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
router.get('/v0-1', function(req, res, next) {
  res.render('v0-1', { title: 'Express' });
});
*/
router.get('/v0-1-1', function(req, res, next) {
  Ads.find(function(err, adss) {
    res.render('v0-1-2', {adss : adss});
  });
});

router.get('/v0-1-2', function(req, res, next) {
  Ads.find(function(err, adss) {
    res.render('v0-1-2', {adss : adss});
  });
});

router.get('/v0-2', function(req, res, next) {
  Ads.find(function(err, adss) {
    res.render('v0-1-1', {adss : adss});
  });
});

router.get('/test', function(req, res, next) {
  Ads.find(function(err, adss) {
    res.render('v0-1-1',{adss : adss});
  });
});

router.get('/admin/tv', function(req, res, next) {
  if(req.session.active == "" || req.session.active == null || req.session.active == "0"){
    res.redirect('/admin/signin');
  } else {
    Tv.find(function(err, tvs) {
        res.render('tv', { title: 'Administrator', tvs :tvs });
    });
  }
});

router.get('/admin/ads', function(req, res, next) {
  if(req.session.active == "" || req.session.active == null || req.session.active == "0"){
    res.redirect('/admin/signin');
  } else {
    Ads.find(function(err, adss) {
      res.render('admin', { adss : adss, title: 'Administrator' });
    });
  }
});

router.get('/admin/impr', function(req, res, next) {
  if(req.session.active == "" || req.session.active == null || req.session.active == "0"){
    res.redirect('/admin/signin');
  } else {
    Ads.find(function(err, adss) {
      Tv.find(function(err, tvs) {
        res.render('impression', { adss : adss, tvs : tvs, title: 'Administrator - Impression' });
      });
      });
  }
});

router.get('/admin/ads/visual/edit/:id', function(req, res, next) {
  if(req.session.active == "" || req.session.active == null || req.session.active == "0"){
    res.redirect('/admin/signin');
  } else {
    Ads.find({imageId : req.params.id}, function(err, adss) {
      res.render('editads1', { adss : adss, title: 'Administrator - EDIT ADS' });
    });
  }
});

router.get('/admin', function(req, res, next) {
  if(req.session.active == "" || req.session.active == null || req.session.active == "0"){
    res.redirect('/admin/signin');
  } else {
    res.redirect('/admin/ads');
  }
});

router.get('/v0-2/list-ads', function(req, res, next) {
  Ads.find(function(err, adss) {
    res.render('listads',{adss : adss});
  });
});

router.get('/admin/signin', function(req, res, next) {
  res.render('signin', { title: 'Login Administrator' });
});

/* Signin User */
router.post('/admin/signin', function(req, res, next){
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
            res.redirect('/admin/ads');
        }
    })
});

/* Signup User */
router.post('/admin/signup', function(req, res){
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

/* session get */
router.get('/session', function(req, res, next) {
        res.status(201).json({
            session: req.session.active
        })   
});


module.exports = router;
