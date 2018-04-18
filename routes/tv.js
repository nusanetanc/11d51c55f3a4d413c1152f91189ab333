var express = require('express');
var randomstring = require("randomstring");
var router = express.Router();
var Tv = require('../models/tv');
var Ads = require('../models/ads');

/* Add Tv. */
router.get('/online/1/:id', function(req, res, next) {
    Tv.findOne({tvId: req.params.id}, function(err, doc){
        if (err) {
            res.render('tv-sign', { title: 'An error occured' });
        } else if (!doc) {
            return res.status(404).json(
                'id could not be found'
            );
        } else {
          Ads.find(function(err, adss) {
            res.render('layout1',{adss : adss, tvid: req.params.id});
          });
        }
    })
});



/* Add Tv. */
router.get('/online/2/:id', function(req, res, next) {
    Tv.findOne({tvId: req.params.id}, function(err, doc){
        if (err) {
            res.render('tv-sign', { title: 'An error occured' });
        } else if (!doc) {
            return res.status(404).json(
                'id could not be found'
            );
        } else {
          Ads.find(function(err, adss) {
            res.render('layout2',{adss : adss, tvid: req.params.id});
          });
        }
    })
});

/* Add Tv. */
router.get('/online/3/:id', function(req, res, next) {
    Tv.findOne({tvId: req.params.id}, function(err, doc){
        if (err) {
            res.render('tv-sign', { title: 'An error occured' });
        } else if (!doc) {
            return res.status(404).json(
                'id could not be found'
            );
        } else {
          Ads.find(function(err, adss) {
            res.render('layout3',{adss : adss, tvid: req.params.id});
          });
        }
    })
});

/* Add Tv. */
router.get('/online/4/:id', function(req, res, next) {
    Tv.findOne({tvId: req.params.id}, function(err, doc){
        if (err) {
            res.render('tv-sign', { title: 'An error occured' });
        } else if (!doc) {
            return res.status(404).json(
                'id could not be found'
            );
        } else {
          Ads.find(function(err, adss) {
            res.render('layout4',{adss : adss, tvid: req.params.id});
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
    status: req.body.statusOption,
    layout: req.body.layoutOption
  })
  tv.save(function(err, result) {
     if (err) {
      res.redirect('admin/tv');
    }
    res.redirect('/admin/tv');
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
