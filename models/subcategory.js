const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubCategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

SubCategorySchema.virtual('url').get(function () {
  return `/shop/subcategory/${this._id}`;
});

module.exports = mongoose.model('Category', SubCategorySchema);
