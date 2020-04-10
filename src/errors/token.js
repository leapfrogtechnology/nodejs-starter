import HttpStatus from 'http-status-codes';

import BaseError from './error';

/**
 * Error class for Token Error.
 */
class TokenError extends BaseError {
  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Token Error: ${this.message}`;
  }

  /**
   * Returns http status code for invalid token.
   *
   * @returns {Number}
   */
  httpCode() {
    return HttpStatus.UNAUTHORIZED;
  }
}

export default TokenError;
