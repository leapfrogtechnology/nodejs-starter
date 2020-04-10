import HttpStatus from 'http-status-codes';

import BaseError from './error';

const TITLE = 'Invalid access token';

/**
 * Error class for Token Error.
 */
class TokenError extends BaseError {
  /**
   * Constructor of TokenError.
   *
   * @param {Object} error
   * @param {String} error.title
   * @param {String} error.message
   *
   * @returns {TokenError}
   */
  constructor({ title = TITLE, message = '' }) {
    super(message);
    this.title = title;
    this.message = message || title;
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `${this.title} [${this.statusCode}]`;
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
