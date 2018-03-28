var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ImparationSchema   = new Schema({
    ads: String,
    datetime: String,
    type : String,
    tvid : String
});

module.exports = mongoose.model('Imparation', ImparationSchema);