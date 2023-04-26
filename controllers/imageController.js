const SubCategory = require('../models/subcategory');
const Category = require('../models/category');
const Product = require('../models/product');

const CategoryImage = require('../models/categoryImage');
const SubCategoryImage = require('../models/subCategoryImage');
const ProductImage = require('../models/productImage');

exports.category_image_get = async (req, res, next) => {
  try {
    const [cat, image] = await Promise.all([
      Category.findById(req.params.id),
      CategoryImage.findOne({ category: req.params.id }),
    ]);
    const ImageUrl = `/shop/category/getImage/${req.params.id}`;
    res.render('image_form', {
      name: cat.name,
      description: cat.description,
      id: req.params.id,
      image,
      type: 'category',
      ImageUrl,
    });
  } catch (err) { next(err); }
};

exports.category_image_post = async (req, res, next) => {
  try {
    const newImage = new CategoryImage({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      category: req.params.id,
    });
    await newImage.save();
    res.redirect(`/shop/category/${req.params.id}/image`);
  } catch (err) { next(err); }
};

exports.subcategory_image_get = async (req, res, next) => {
  try {
    const [cat, image] = await Promise.all([
      SubCategory.findById(req.params.id),
      SubCategoryImage.findOne({ category: req.params.id }),
    ]);
    const ImageUrl = `/shop/subcategory/getImage/${req.params.id}`;
    res.render('image_form', {
      name: cat.name,
      description: cat.description,
      id: req.params.id,
      image,
      type: 'subcategory',
      ImageUrl,
    });
  } catch (err) { next(err); }
};
exports.subcategory_image_post = async (req, res, next) => {
  try {
    const newImage = new SubCategoryImage({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      category: req.params.id,
    });
    await newImage.save();
    res.redirect(`/shop/subcategory/${req.params.id}/image`);
  } catch (err) { next(err); }
};

exports.product_image_get = async (req, res, next) => {
  try {
    const [cat, image] = await Promise.all([
      Product.findById(req.params.id),
      ProductImage.findOne({ category: req.params.id }),
    ]);
    const ImageUrl = `/shop/product/getImage/${req.params.id}`;
    res.render('image_form', {
      name: cat.name,
      description: cat.description,
      id: req.params.id,
      image,
      type: 'product',
      ImageUrl,
    });
  } catch (err) { next(err); }
};
exports.product_image_post = async (req, res, next) => {
  try {
    const newImage = new ProductImage({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      category: req.params.id,
    });
    await newImage.save();
    res.redirect(`/shop/product/${req.params.id}/image`);
  } catch (err) { next(err); }
};

exports.image_delete_get = async (req, res, next) => {
  res.render('image_delete');
};

exports.image_delete_post = async (req, res, next) => {
  try {
    const { id, type } = req.params;
    if (type === 'category') {
      await CategoryImage.findByIdAndRemove(id);
      res.redirect('/');
    } else if (type === 'product') {
      await ProductImage.findByIdAndRemove(id);
      res.redirect('/');
    } else if (type === 'subcategory') {
      await SubCategoryImage.findByIdAndRemove(id);
      res.redirect('/');
    }
    res.send(`type not found // image_delete_post // ${type}`);
  } catch (err) { next(err); }
};
