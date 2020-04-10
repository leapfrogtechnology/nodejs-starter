import fs from 'fs';
import path from 'path';

import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

// Use LOG_DIR from env
const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const isFileLogEnabled = process.env.ENABLE_FILE_LOG === 'TRUE';

// Create log directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// logFormat used for console logging
const logFormat = format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`);

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  transports: setupTransports(),
});

/**
 * Setup transports for winston.
 */
function setupTransports() {
  const transports = [];
  
  transports.push(
    new winston.transports.Console({
      format: format.combine(format.colorize(), logFormat),
      level: 'info',
    })
  );
  if (isFileLogEnabled) {
    transports.push(
      new winston.transports.DailyRotateFile({
        format: format.combine(format.timestamp(), format.json()),
        maxFiles: '14d',
        level: LOG_LEVEL,
        dirname: LOG_DIR,
        datePattern: 'YYYY-MM-DD',
        filename: '%DATE%-debug.log',
      })
    );
  }

  return transports;
}

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  },
};

export default logger;
