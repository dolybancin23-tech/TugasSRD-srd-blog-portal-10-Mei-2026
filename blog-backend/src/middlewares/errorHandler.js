// src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; 
  err.status = err.status || 'error'; // Default ke 'error' 

  // Memancarkan respons format JSON yang konsisten 
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Jangan ekspos stack trace jika sudah di production server!
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};