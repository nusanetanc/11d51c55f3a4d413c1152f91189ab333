var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LogTvSchema   = new Schema({
    city: String,
    place: String,
    tvId : String,
    status : String,
    datetime : String
});

module.exports = mongoose.model('LogTv', LogTvSchema);