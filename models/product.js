const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
});

ProductSchema.virtual('url').get(function () {
  return `/shop/product/${this._id}`;
});

module.exports = mongoose.model('Product', ProductSchema);
