const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const SubCategory = require('../models/subcategory');

// display index page
exports.index = (req, res) => {
  res.render('index', {
    title: 'Shop Home',
  });
};

// display list of categorys
exports.category_list = async (req, res) => {
  const cats = await Category.find({});
  res.render('category_list', { list: cats, title: 'Category List' });
};
// display create form
exports.category_create_get = (req, res) => {
  res.render('category_form', { title: 'New Category' });
};
// create new Category
exports.category_create_post = async (req, res) => {
  const { name, description } = req.body;

  // check if category is already in use
  const cats = await Category.find({ name });

  if (cats.length > 0) {
    res.render('category_form', {
      title: 'New Category',
      name,
      description,
      err: `Category Name: ${name} already in use`,
    });
  } else {
    // save category
    const cat = new Category({
      name, description,
    });
    cat.save();
    res.redirect('/shop/categorys');
  }
};
// display single Category
exports.category_read = async (req, res, next) => {
  try {
    const [cat, subCats] = await Promise.all([
      Category.findById(req.params.id),
      SubCategory.find({
        category: req.params.id,
      }),
    ]);

    if (cat === null) {
      throw new Error(' Cat Not Found');
    }

    res.render('category_read', {
      cat,
      subCats,
    });
  } catch (error) {
    next(error);
  }
};

//
exports.category_update_get = async (req, res, next) => { res.send('IMplement me'); };
exports.category_update_post = async (req, res, next) => { res.send('IMplement me'); };
exports.category_delete_get = async (req, res, next) => { res.send('IMplement me'); };
exports.category_delete_post = async (req, res, next) => { res.send('IMplement me'); };
