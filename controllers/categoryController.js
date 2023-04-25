const Category = require('../models/category');
const SubCategory = require('../models/subcategory');
const Product = require('../models/product');
const CategoryImage = require('../models/categoryImage');

// display index page
exports.index = async (req, res, next) => {
  try {
    const [cats, subCats, prods] = await Promise.all([
      Category.find({}),
      SubCategory.find({}),
      Product.find({}),
    ]);

    res.render('index', {
      title: 'Shop Home',
      cats: cats.length,
      subCats: subCats.length,
      prods: prods.length,
    });
  } catch (err) { next(err); }
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

    const imageURL = `/shop/category/getImage/${req.params.id}`;

    res.render('category_read', {
      cat,
      subCats,
      imageURL,
    });
  } catch (error) {
    next(error);
  }
};

// display form with category data
exports.category_update_get = async (req, res, next) => {
  try {
    const cat = await Category.findById(req.params.id);
    res.render('category_form', {
      title: 'New Category',
      name: cat.name,
      description: cat.description,
    });
  } catch (err) { next(err); }
};

// update category with new data
exports.category_update_post = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const cat = new Category({
      name,
      description,
      _id: req.params.id,
    });
    await Category.findByIdAndUpdate(req.params.id, cat);
    res.redirect(`/shop/category/${req.params.id}`);
  } catch (err) { next(err); }
};

// display delete
exports.category_delete_get = async (req, res, next) => {
  try {
    const [cat, subCats] = await Promise.all([
      Category.findById(req.params.id),
      SubCategory.find({ category: req.params.id }),
    ]);

    res.render('category_delete', {
      cat,
      subCats,
    });
  } catch (err) {
    next(err);
  }
};

// delete Category
exports.category_delete_post = async (req, res, next) => {
  try {
    const [cat, subCats] = await Promise.all([
      Category.findById(req.params.id),
      SubCategory.find({ category: req.params.id }),
    ]);
    if (subCats.length > 0) {
      res.render('category_delete', {
        cat,
        subCats,
      });
    } else {
      await Category.findByIdAndRemove(req.params.id);
      res.redirect('/shop/categorys');
    }
  } catch (err) {
    next(err);
  }
};

exports.category_getImage = async (req, res, next) => {
  try {
    const catID = req.params.id;
    const ImageFile = await CategoryImage.findOne({ category: catID });
    res.set('Content-Type', ImageFile.image.contentType);
    res.send(ImageFile.image.data);
  } catch (err) { next(err); }
};
