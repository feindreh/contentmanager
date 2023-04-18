const Product = require('../models/product');

exports.product_list = async (req, res) => {
  const prods = await Product.find({});
  res.render('product_list', { list: prods, title: 'Product List' });
};

exports.product_create_get = (req, res) => {
  res.send('Implement product Create Get');
};
