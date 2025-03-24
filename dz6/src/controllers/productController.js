const Product = require('../models/product');
const errorHandler = require('../utils/errorHandler');
const Category = require('../models/category');


const handleValidationErrors = (err) => {
    const errors = Object.values(err.errors).map(e => e.message);
    return new errorHandler(errors.join(', '), 400);
};

exports.createProduct = async (req, res, next) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const categoryName = req.body.category;
        const quantity = req.body.quantity;
        const price = req.body.price;

        if (!name || !description || !categoryName || quantity === undefined || price === undefined) {
            return next(new errorHandler('"name", "description", "category", "quantity", и "price" обязательны.', 400));
        }

        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return next(new errorHandler(`Категория "${categoryName}" не найдена.`, 404));
        }

        const newProduct = await Product.create({ name, description, category: category._id, quantity, price });
        res.status(201).json(newProduct);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return next(handleValidationErrors(err));
        }
        next(err);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10; 
        const offset = parseInt(req.query.offset, 10) || 0;

        const products = await Product.find().skip(offset).limit(limit);
        res.json(products);
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new errorHandler('Товар не найден.', 404));
        }
        res.json(product);
    } catch (err) {
        if (err.name === 'CastError') {
            return next(new errorHandler('Неверный ID.', 400));
        }
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { name, description, category, quantity, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, category, quantity, price },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return next(new errorHandler('Товар не найден.', 404));
        }
        res.json(updatedProduct);
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

exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return next(new errorHandler('Товар не найден.', 404));
        }
        res.json({ message: 'Товар успешно удалён.' });
    } catch (err) {
        if (err.name === 'CastError') {
            return next(new errorHandler('Неверный ID', 400));
        }
        next(err);
    }
};