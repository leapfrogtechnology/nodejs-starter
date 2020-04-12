import HttpStatus from 'http-status-codes';
import * as store from '@leapfrogtechnology/async-store';

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
  const requestID = store.getShortId();

  // Validation errors
  if (err.isJoi) {
    return {
      id: requestID,
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map(err => {
          return {
            message: err.message,
            param: err.path.join('.'),
          };
        }),
    };
  }

  // HTTP errors
  if (err.isBoom) {
    return {
      id: requestID,
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error,
    };
  }

  // Custom errors
  if (err.isCustom) {
    return {
      id: requestID,
      code: err.httpCode(),
      message: err.message,
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    id: requestID,
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}

export default buildError;
