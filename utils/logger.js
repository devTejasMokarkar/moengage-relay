// utils/logger.js
const { existsSync, mkdirSync } = require("fs");
const { LOG_DIR } = require("../config");
const { join } = require("path");
const os = require("os");
const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

// Create logs directory if it doesn't exist
const logDir = join(__dirname, LOG_DIR);
if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true });
}

// Dynamically fetch current local IP
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'N/A';
}

// Custom format to inject IP dynamically
const dynamicIPFormat = winston.format((info) => {
  info.ip = getLocalIp();
  return info;
});

// Final log format
const logFormat = winston.format.printf(({ timestamp, level, message, ip }) => {
  return `${timestamp} ${level}: [IP: ${ip}] ${message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    dynamicIPFormat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),
  transports: [
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: join(logDir, 'debug'),
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: join(logDir, 'error'),
      filename: `%DATE%.log`,
      maxFiles: 30,
      handleExceptions: true,
      zippedArchive: true,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize()
      ),
    }),
  ],
});

const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = { logger, stream };
