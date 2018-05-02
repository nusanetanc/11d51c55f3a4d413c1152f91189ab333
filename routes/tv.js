var express = require('express');
//var randomstring = require("randomstring");
var router = express.Router();
var Tv = require('../models/tv');
var Ads = require('../models/ads');
var LogTv = require('../models/logtv');


module.exports = function (io) {
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
                console.log('socket')
                //Socket.IO
                io.on('connection', function(socket){
                  console.log(req.params.id+' connected');
                  var logtv = new LogTv({
                        city: doc.city,
                        place: doc.place,
                        tvId : doc.tvId,
                        status : 'connected',
                        datetime : new Date(),
                      })
                      logtv.save(function(err, result) {
                        if (err) {
                          console.log(err)
                        }
                        console.log('log saved')
                      });
                  socket.on('disconnect', function(){
                    console.log(req.params.id+' disconnected');
                    var logtv = new LogTv({
                        city: doc.city,
                        place: doc.place,
                        tvId : doc.tvId,
                        status : 'disconnected',
                        datetime : new Date(),
                      })
                      logtv.save(function(err, result) {
                        if (err) {
                          console.log(err)
                        }
                        console.log('log saved')
                      });
                  });
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
    return router;
};
