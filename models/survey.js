var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  userid: {type: Schema.Types.ObjectId, index: true, required: true},
  createdAt: {type: Date, default: Date.now},
  content: {type: String, required: true, trim: true}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Survey = mongoose.model('Survey', schema);

module.exports = Survey;
