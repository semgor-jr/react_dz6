const errorHandler = (err, req, res, next) => {
    console.error(err.stack); //  Логирование ошибки для отладки
    res.status(500).json({ message: 'Server Error' }); // Ответ клиенту
  };
  
  module.exports = errorHandler;