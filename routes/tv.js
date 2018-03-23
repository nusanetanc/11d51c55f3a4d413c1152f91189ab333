var express = require('express');
var randomstring = require("randomstring");
var router = express.Router();
var Tv = require('../models/tv');
var Ads = require('../models/ads');

/* Add Tv. */
router.get('/online/:id', function(req, res, next) {
    Tv.findOne({tvId: req.params.id}, function(err, doc){
        if (err) {
            res.render('tv-sign', { title: 'An error occured' });
        } else if (!doc) {
            return res.status(404).json(
                'User could not be found'
            );
        } else {
          Ads.find(function(err, adss) {
            res.render('v0-1-2',{adss : adss});
          });
        }
    })
});

/* Add Tv. */
router.post('/add', function(req, res, next) {
  var idRand = randomstring.generate({length: 10, charset: 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0987654321'});
  var tv = new Tv({
    city: req.body.cityOption,
    place : req.body.placeOption,
    tvId : idRand,
    status: req.body.statusOption
  })
  tv.save(function(err, result) {
     if (err) {
      res.redirect('/v0-2/admin/tv/?message="An error occurred"');
    }
    res.redirect('/v0-2/admin/tv/?message="Ads Saved"');
  });
});

/* GET Tv. */
router.get('/list', function(req, res, next) {
      Tv.find(function(err, tvs) {
       console.log( tvs );
       res.json(tvs);
   });
});

module.exports = router;
