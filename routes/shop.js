const express = require('express');

const router = express.Router();

const multer = require('multer');
const category_controller = require('../controllers/categoryController');
const subcategory_controller = require('../controllers/subcategoryController');
const product_controller = require('../controllers/productController');
const image_controller = require('../controllers/imageController');

const upload = multer();

// index

router.get('/', category_controller.index);

// Categorys

router.get('/categorys', category_controller.category_list);

router.get('/category/create', category_controller.category_create_get);

router.post('/category/create', upload.single('image'), category_controller.category_create_post);

router.get('/category/:id', category_controller.category_read);

router.get('/category/:id/update', category_controller.category_update_get);

router.post('/category/:id/update', upload.single('image'), category_controller.category_update_post);

router.get('/category/:id/delete', category_controller.category_delete_get);

router.post('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/getImage/:id', category_controller.category_getImage);

// SubCategorys

router.get('/subcategorys', subcategory_controller.subcategory_list);

router.get('/subcategory/create', subcategory_controller.subcategory_create_get);

router.post('/subcategory/create', upload.single('image'), subcategory_controller.subcategory_create_post);

router.get('/subcategory/:id', subcategory_controller.subcategory_read);

router.get('/subcategory/:id/update', subcategory_controller.subcategory_update_get);

router.post('/subcategory/:id/update', upload.single('image'), subcategory_controller.subcategory_update_post);

router.get('/subcategory/:id/delete', subcategory_controller.subcategory_delete_get);

router.post('/subcategory/:id/delete', subcategory_controller.subcategory_delete_post);

// Products

router.get('/products', product_controller.product_list);

router.get('/product/create', product_controller.product_create_get);

router.post('/product/create', upload.single('image'), product_controller.product_create_post);

router.get('/product/:id', product_controller.product_read);

router.get('/product/:id/update', product_controller.product_update_get);

router.post('/product/:id/update', upload.single('image'), product_controller.product_update_post);

router.get('/product/:id/delete', product_controller.product_delete_get);

router.post('/product/:id/delete', product_controller.product_delete_post);

// Images

router.get('/category/:id/image', image_controller.category_image_get);

router.post('/category/:id/image', upload.single('image'), image_controller.category_image_post);

router.get('/subcategory/:id/image', image_controller.subcategory_image_get);

router.post('/subcategory/:id/image', upload.single('image'), image_controller.subcategory_image_post);

router.get('/product/:id/image', image_controller.product_image_get);

router.post('/product/:id/image', upload.single('image'), image_controller.product_image_post);

router.get('/image/:id/:type/delete', image_controller.image_delete_get);

router.post('/image/:id/:type/delete', image_controller.image_delete_post);

module.exports = router;
