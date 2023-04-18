const { body, validationResult } = require('express-validator');
const Category = require('../models/category');

// display index page
exports.index = (req, res) => {
  res.render('index', {
    title: 'Shop Home',
  });
};

// display list of categorys
exports.category_list = async function (req, res, next) {
  const cats = await Category.find({});
  res.render('category_list', { list: cats, title: 'Category List' });
};
// display create form
exports.category_create_get = (req, res) => {
  res.render('category_form');
};

exports.category_create_post = (req, res) => {
  res.send('make post');
};
