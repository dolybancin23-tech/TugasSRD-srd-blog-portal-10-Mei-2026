// src/utils/appError.js

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Jika status code 4xx artinya 'fail' (salah user), jika 5xx artinya 'error' (salah server)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Menandakan operational error terprediksi (bukan bug) 

    Error.captureStackTrace(this, this.constructor);
  }
}

// Custom error untuk status 400 Bad Request 
export class BadRequestError extends AppError { 
  constructor(msg) { super(msg, 400); } 
}

// Custom error untuk stwatus 404 Not Found 
export class NotFoundError extends AppError { 
  constructor(msg) { super(msg, 404); } 
}