const Product = require('../models/product');
const SubCategory = require('../models/subcategory');

// display list of ALL products
exports.product_list = async (req, res) => {
  const prods = await Product.find({});
  res.render('product_list', { list: prods, title: 'Product List' });
};
// display product form
exports.product_create_get = async (req, res, next) => {
  try {
    const SubCategorys = await SubCategory.find({});
    res.render('product_form', { title: 'New Product', SubCategorys });
  } catch (err) {
    next(err);
  }
};
// create new Product
exports.product_create_post = async (req, res) => {
  const {
    name, description, subcategory, price,
  } = req.body;

  const [SubCategorys, products] = await Promise.all([
    SubCategory.find({}),
    Product.find({ name }),
  ]);
  // check if category is already in use
  const err = [];
  if (products.length > 0) {
    err.push(`Product Name: ${name} already in use`);
  }
  if (subcategory === '') {
    err.push('choose a Sub-Category');
  }

  if (err.length > 0) {
    res.render('subcategory_form', {
      title: 'New Sub-Category',
      name,
      description,
      SubCategorys,
      err,
    });
  } else {
    // save category
    const prod = new Product({
      name, description, subCategory: subcategory, price,
    });
    prod.save();
    res.redirect('/shop/products');
  }
};
// display single product
exports.product_read = async (req, res, next) => {
  try {
    const [prod] = await Promise.all([
      Product.findById(req.params.id),
    ]);

    if (prod === null) {
      throw new Error(' Prod Not Found');
    }

    res.render('product_read', {
      prod,
    });
  } catch (error) {
    next(error);
  }
};
// display form with product data
exports.product_update_get = async (req, res, next) => {
  try {
    const [prod, SubCategorys] = await Promise.all([
      Product.findById(req.params.id).populate('subCategory'),
      SubCategory.find({}),
    ]);

    console.log(prod);

    res.render('product_form', {
      title: 'New Product',
      SubCategorys,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      subCategory: prod.subCategory.name,
    });
  } catch (err) {
    next(err);
  }
};

exports.product_update_post = async (req, res, next) => { res.send('IMplement me'); };

// display delete page
exports.product_delete_get = async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.id);
    res.render('product_delete', {
      prod,
    });
  } catch (error) {
    next(error);
  }
};
// delete Product
exports.product_delete_post = async (req, res, next) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.redirect('/shop/products');
  } catch (err) {
    next(err);
  }
};
