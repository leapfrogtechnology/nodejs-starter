import BaseError from './error';

const TITLE = 'Invalid access token';

/**
 * Error class for Token Error.
 */
class TokenError extends BaseError {
  /**
   * Constructor of NetworkError.
   *
   * @param {Object} error
   * @param {String} error.title
   * @param {String} error.message
   * @param {Number} error.code
   */
  constructor({ title = TITLE, message = '', code = 401 }) {
    super(message);
    this.title = title;
    this.message = message;
    this.code = code;
  }

  toString() {
    return `${this.title} [${this.code}]`;
  }
}

export default TokenError;
