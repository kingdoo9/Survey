var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  content1: {type: String, required: true, trim: true},
  content2: {type: String, required: true, trim: true},
  content3: {type: String, required: true, trim: true},
  content4: {type: String, required: true, trim: true},
  content5: {type: String, required: true, trim: true},
  number:{type:Number, required: true, trim: true},
  belongto:{type:String, required: true, trim: true}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Question = mongoose.model('Question', schema);

module.exports = Question;
