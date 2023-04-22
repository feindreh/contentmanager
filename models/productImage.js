const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  category: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

module.exports = mongoose.model('ProductImage', ImageSchema);
