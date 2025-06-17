const errorHandler = (err, req, res, next) => {
    console.error("", err.stack);
    const status = err.statusCode || 500;
  
    res.status(status).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  };
  
  module.exports = errorHandler;
  