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

router.get('/v0.1', function(req, res, next) {
  Ads.find(function(err, adss) {
    res.render('client/v0-1', {adss : adss});
  });
});

module.exports = router;
