const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const { Schema } = mongoose

const CommentSchema = new Schema({
  comment: { type: String, required: true },
  description: { type: String },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: "user", 
    required: true, 
    autopopulate: true 
  },
});

CommentSchema.plugin(autopopulate);

module.exports = mongoose.model('comment', CommentSchema);