const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(productRoutes);

app.use(categoryRoutes);

app.use(authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/sem', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Подключение к MongoDB успешно установлено.');
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    })
    .catch(err => console.error(err));