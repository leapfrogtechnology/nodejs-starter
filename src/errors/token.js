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
   * @param {Number} error.code
   *
   * @returns {TokenError}
   */
  constructor({ title = TITLE, message = '', code = 401 }) {
    super(message);
    this.title = title;
    this.message = message || title;
    this.statusCode = code;
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @method TokenError#toString
   *
   * @returns {String}
   */
  toString() {
    return `${this.title} [${this.statusCode}]`;
  }
}

export default TokenError;
