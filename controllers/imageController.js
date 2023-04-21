const ProductImageSchema = require('../models/Image');
const SubCategory = require('../models/subcategory');
const Category = require('../models/category');
const Product = require('../models/product');

// exports.image_upload_post = async (req, res, next) => {
//   const newImage = new ProductImageSchema({
//     name: 'Hello DB 3',
//     image: {
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     },
//   });
//   newImage.save();
//   res.send('uploaded');
// };

// exports.image_detail = async (req, res, next) => {
//   const { id } = req.params;
//   res.render('image_detail', { ImageUrl: `/shop/getimages/${id}` });
// };

exports.image_images = async (req, res, next) => {
  const { id } = req.params;
  const Image = await ProductImageSchema.findById(id);
  res.set('Content-Type', Image.image.contentType);
  res.send(Image.image.data);
};

exports.category_image_get = async (req, res, next) => {
  res.send('Implement Me');
};
exports.category_image_post = async (req, res, next) => {
  res.send('Implement Me');
};
exports.subcategory_image_get = async (req, res, next) => {
  res.send('Implement Me');
};
exports.subcategory_image_post = async (req, res, next) => {
  res.send('Implement Me');
};
exports.product_image_get = async (req, res, next) => {
  res.send('Implement Me');
};
exports.product_image_post = async (req, res, next) => {
  res.send('Implement Me');
};
