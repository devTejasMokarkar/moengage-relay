const { logger } = require("../utils/logger");

const ErrorMiddleware = (error, req, res,next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const path = error.path || '';
  logger.error(`[${req.method}] ${req.path} path: ${path} >> StatusCode:: ${status}, Message:: ${message}`);
  res.status(status).json({ error: message });
}

module.exports = { ErrorMiddleware }
