const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
  name: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Image', ImageSchema);
