var express = require('express');
const fileUpload = require('express-fileupload');
var randomstring = require("randomstring");
var router = express.Router();
var Ads = require('../models/ads');
var Imparation = require('../models/imparation');

router.use(fileUpload());

/* Add video. 
router.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./public/ads/'+nameRand+'.mp4', function(err) {
    if (err)
      return res.status(500).send(err);
    res.redirect('/v0-2/admin/?idimage='+nameRand );
    
  });
});
*/
/* Add Ads. */
router.post('/add', function(req, res, next) {
  if(req.body.adsOption !== "runningtext"){
    // Random name video upload
  var nameRand = randomstring.generate({length: 7, charset: 'qwertyuiopasdfghjklzxcvbnm'});
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let saveFile = sampleFile.mv('./public/ads/'+nameRand+'.mp4');
  } else {
    var nameRand = "";
  }
  var ads = new Ads({
    type: req.body.adsOption,
    city: req.body.cityOption,
    place : req.body.placeOption,
    words : req.body.wordsText,
    imageId : nameRand,
    status : req.body.statusOption,
    imprasion : req.body.imparationOption,
    dateStart : req.body.dateStart,
    dateStop : req.body.dateStop,
    duration: req.body.duration,
    advertisers: req.body.AdvertiserOption
  })
  ads.save(function(err, result) {
    if (err) {
      res.redirect('/v0-2/admin/ads/?message="An error occurred"');
    }
    res.redirect('/v0-2/admin/ads/?message="Ads Saved"');
  });
});

/* GET Ads. */
router.get('/list', function(req, res, next) {
      Ads.find(function(err, adss) {
       console.log( adss );
       res.json(adss);
   });
});

/* Count Ads. */
router.post('/count', function(req, res, next) {
  var imparation = new Imparation({
    ads: req.body.ads,
    datetime: req.body.datetime,
    type: req.body.type,
    tvid: req.body.tvid
  })
  imparation.save(function(err, result) {
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
});

/* GET Ads. */
router.get('/viewcount/:ads', function(req, res, next) {
      Imparation.count({ads : req.params.ads}, function(err, imprs) {
       res.json({
         total : imprs });
   });
});

/* GET Ads. */
router.get('/listview', function(req, res, next) {
      res.redirect('/admin/impr');
});

/* GET Ads. */
router.post('/listview', function(req, res, next) {
      Imparation.find({ads: req.body.ads, tvid: req.body.tv, datetime: {"$gte": new Date("2018-04-07"), "$lt": new Date("2015-04-15") }}, function(err, imparations){
        Imparation.count({ads: req.body.ads, tvid: req.body.tv}, function(err, imprs) {
        if (err) {
            res.render('listview',{result: 'An error occured', imparations : imparations});
        } else if (!imparations) {
            res.render('listview',{result : 'Imparation could not be found', imparations : imparations});
        } else {
          res.render('listview',{result : 'Total Imparation '+imprs, imparations : imparations});
        }
        })
    })
});

module.exports = router;
