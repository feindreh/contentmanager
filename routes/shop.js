const express = require('express');

const router = express.Router();

const category_controller = require('../controllers/categoryController');
const subcategory_controller = require('../controllers/subcategoryController');
const product_controller = require('../controllers/productController');

// index

router.get('/', category_controller.index);

// Categorys

router.get('/categorys', (req, res) => {
  res.send('implement /categorys');
});

router.get('/category/create', (req, res) => {
  res.send('implement /category/create');
});

// SubCategorys

router.get('/subcategorys', (req, res) => {
  res.send('implement /subcategorys');
});

router.get('/subcategory/create', (req, res) => {
  res.send('implement /subcategory/create');
});
// Products

router.get('/products', (req, res) => {
  res.send('implement /products');
});

router.get('/product/create', (req, res) => {
  res.send('implement /product/create');
});

module.exports = router;
