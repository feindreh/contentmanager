const SubCategory = require('../models/subcategory');
const Category = require('../models/category');
const Products = require('../models/product');

exports.subcategory_list = async (req, res) => {
  const subCats = await SubCategory.find({});
  res.render('subcategory_list', { list: subCats, title: 'Sub-Category List' });
};

exports.subcategory_create_get = async (req, res) => {
  const categorys = await Category.find({});
  const err = [];
  res.render('subcategory_form', { title: 'New Sub-Category', categorys, err });
};

exports.subcategory_create_post = async (req, res) => {
  const { name, description, category } = req.body;

  const [subCats, categorys] = await Promise.all([
    SubCategory.find({ name }),
    Category.find({}),
  ]);
  // check if category is already in use
  const err = [];
  if (subCats.length > 0) {
    err.push(`Sub-Category Name: ${name} already in use`);
  }
  if (category === '') {
    err.push('choose a Category');
  }

  if (err.length > 0) {
    res.render('subcategory_form', {
      title: 'New Sub-Category',
      name,
      description,
      categorys,
      err,
    });
  } else {
    // save category
    const subcat = new SubCategory({
      name, description, category,
    });
    subcat.save();
    res.redirect('/shop/subcategorys');
  }
};

exports.subcategory_read = async (req, res, next) => {
  try {
    const [subCat, products] = await Promise.all([
      SubCategory.findById(req.params.id),
      Products.find({
        subCategory: req.params.id,
      }),
    ]);

    if (subCat === null) {
      throw new Error(' subCat Not Found');
    }

    res.render('subcategory_read', {
      subCat,
      products,
    });
  } catch (error) {
    next(error);
  }
};
