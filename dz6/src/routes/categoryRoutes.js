const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// POST /api/categories - создание категории
router.post('/api/categories', categoryController.createCategory);

// GET /api/categories - получение списка категорий
router.get('/api/categories', categoryController.getCategories);

// GET /api/categories/:id - получение категории по ID
router.get('/api/categories/:id', categoryController.getCategoryById);

// PUT /api/categories/:id - обновление категории
router.put('/api/categories/:id', categoryController.updateCategory);

// DELETE /api/categories/:id - удаление категории
router.delete('/api/categories/:id', categoryController.deleteCategory);

module.exports = router;