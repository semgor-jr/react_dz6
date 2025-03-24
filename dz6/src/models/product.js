const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Ссылка на модель Category
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Неотрицательное количество
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Неотрицательная цена
  },
});

module.exports = mongoose.model('Product', productSchema);