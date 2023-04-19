const express = require('express');

const router = express.Router();

const category_controller = require('../controllers/categoryController');
const subcategory_controller = require('../controllers/subcategoryController');
const product_controller = require('../controllers/productController');

// index

router.get('/', category_controller.index);

// Categorys

router.get('/categorys', category_controller.category_list);

router.get('/category/create', category_controller.category_create_get);

router.post('/category/create', category_controller.category_create_post);

router.get('/category/:id', category_controller.category_read);

// SubCategorys

router.get('/subcategorys', subcategory_controller.subcategory_list);

router.get('/subcategory/create', subcategory_controller.subcategory_create_get);

router.post('/subcategory/create', subcategory_controller.subcategory_create_post);

router.get('/subcategory/:id', subcategory_controller.subcategory_read);
// Products

router.get('/products', product_controller.product_list);

router.get('/product/create', product_controller.product_create_get);

router.post('/product/create', product_controller.product_create_post);

router.get('/product/:id', product_controller.product_read);

module.exports = router;
