const SubCategory = require('../models/subcategory');
const Category = require('../models/category');
const Product = require('../models/product');
const SubCategoryImage = require('../models/subCategoryImage');
// display ALL subcategorys
exports.subcategory_list = async (req, res) => {
  const subCats = await SubCategory.find({});
  res.render('subcategory_list', { list: subCats, title: 'Sub-Category List' });
};

// display create form
exports.subcategory_create_get = async (req, res) => {
  const categorys = await Category.find({});
  const err = [];
  res.render('subcategory_form', { title: 'New Sub-Category', categorys, err });
};

// display single subcat
exports.subcategory_read = async (req, res, next) => {
  try {
    const [subCat, products] = await Promise.all([
      SubCategory.findById(req.params.id),
      Product.find({
        subCategory: req.params.id,
      }),
    ]);

    if (subCat === null) {
      throw new Error(' subCat Not Found');
    }
    const imageURL = `/shop/subcategory/getImage/${req.params.id}`;
    res.render('subcategory_read', {
      subCat,
      products,
      imageURL,
    });
  } catch (error) {
    next(error);
  }
};

// create new subcat
exports.subcategory_create_post = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// display form with subcategory data
exports.subcategory_update_get = async (req, res, next) => {
  try {
    const [subCat, categorys] = await Promise.all([
      SubCategory.findById(req.params.id).populate('category'),
      Category.find({}),
    ]);

    const { name, description, category } = subCat;

    res.render('subcategory_form', {
      title: 'New Sub-Category',
      name,
      description,
      categorys,
      categoryName: category.name,
      err: [],
    });
  } catch (err) {
    next(err);
  }
};
// update subcategory with new data
exports.subcategory_update_post = async (req, res, next) => {
  try {
    const { name, description, category } = req.body;
    const subcat = new SubCategory({
      name, description, category, _id: req.params.id,
    });
    await SubCategory.findByIdAndUpdate(req.params.id, subcat);
    res.redirect(`/shop/subcategory/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

// display delete page
exports.subcategory_delete_get = async (req, res, next) => {
  try {
    const [subCat, products] = await Promise.all([
      SubCategory.findById(req.params.id),
      Product.find({ subCategory: req.params.id }),
    ]);

    res.render('subcategory_delete', {
      subCat,
      products,
    });
  } catch (err) {
    next(err);
  }
};
// delete subcategory
exports.subcategory_delete_post = async (req, res, next) => {
  try {
    const [products, subCat] = await Promise.all([
      Product.find({ subCategory: req.params.id }),
      SubCategory.findById(req.params.id),
    ]);
    if (products.length > 0) {
      res.render('subcategory_delete', {
        subCat,
        products,
      });
    } else {
      await SubCategory.findByIdAndRemove(req.params.id);
      res.redirect('/shop/subcategorys');
    }
  } catch (err) {
    next(err);
  }
};

exports.subcategory_getImage = async (req, res, next) => {
  try {
    const subCatID = req.params.id;
    const ImageFile = await SubCategoryImage.findOne({ category: subCatID });
    res.set('Content-Type', ImageFile.image.contentType);
    res.send(ImageFile.image.data);
  } catch (err) { next(err); }
};
