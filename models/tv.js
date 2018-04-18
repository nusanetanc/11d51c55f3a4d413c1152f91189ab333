var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TvSchema   = new Schema({
    city: String,
    place: String,
    tvId : String,
    status : String,
    layout : String
});

module.exports = mongoose.model('Tv', TvSchema);