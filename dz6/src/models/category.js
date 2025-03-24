const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Категории должны иметь уникальные имена
  },
});

module.exports = mongoose.model('Category', categorySchema);