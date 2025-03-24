const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST /api/products - создание товара
router.post('/api/products', productController.createProduct);

// GET /api/products - получение списка товаров (с пагинацией)
router.get('/api/products', productController.getProducts);

// GET /api/products/:id - получение товара по ID
router.get('/api/products/:id', productController.getProductById);

// PUT /api/products/:id - обновление товара
router.put('/api/products/:id', productController.updateProduct);

// DELETE /api/products/:id - удаление товара
router.delete('/api/products/:id', productController.deleteProduct);

module.exports = router;