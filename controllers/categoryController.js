const Product = require('../models/product');

exports.index = (req, res) => {
  res.render('index', {
    title: 'Shop Home',
  });
};
