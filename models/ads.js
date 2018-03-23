var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AdsSchema   = new Schema({
    type: String,
    city: String,
    place : String,
    words : String,
    imageId : String,
    status : String,
    imprasion : String,
    dateStart : String,
    dateStop : String,
    duration: String,
    advertisers: String
});

module.exports = mongoose.model('Ads', AdsSchema);