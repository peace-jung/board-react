import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Post = new Schema({
  writer: String,
  title: String,
  contents: String,
  date: { type: Date, default: Date.now },
  comments: [{
    writer: String,
    contents: String,
    date: { type: Date, default: Date.now },
    comments: [{
      writer: String,
      contents: String,
      date: { type: Date, default: Date.now }
    }]
  }]
});

export default mongoose.model('post', Post);