const Category = require('../models/category');
const errorHandler = require('../utils/errorHandler');

// Функция для обработки ошибок валидации Mongoose
const handleValidationErrors = (err) => {
    const errors = Object.values(err.errors).map(e => e.message);
    return new errorHandler(errors.join(', '), 400);
};

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return next(new errorHandler('Название категории обязательно.', 400));
        }
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return next(handleValidationErrors(err));
        }
        next(err);
    }
};

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        next(err);
    }
};

exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return next(new errorHandler('Категория не найдена.', 404));
        }
        res.json(category);
    } catch (err) {
        if (err.name === 'CastError') {
            return next(new errorHandler('Неверный ID.', 400));
        }
        next(err);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return next(new errorHandler('Название категории обязательно.', 400));
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return next(new errorHandler('Категория не найдена.', 404));
        }
        res.json(updatedCategory);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return next(handleValidationErrors(err));
        }
        if (err.name === 'CastError') {
            return next(new errorHandler('Неверный ID.', 400));
        }
        next(err);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return next(new AppError('Категория не найдена.', 404));
        }
        res.json({ message: 'Категория успешно удалена.' });
    } catch (err) {
        if (err.name === 'CastError') {
            return next(new AppError('Неверный ID.', 400));
        }
        next(err);
    }
};