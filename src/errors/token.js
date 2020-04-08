import BaseError from './error';

/**
 * Error class for Token Error.
 */
class TokenError extends BaseError {
  /**
   * Constructor of NetworkError.
   *
   * @param {Object} error
   * @param {String} error.message
   * @param {String} error.details
   * @param {Number} error.code
   */
  constructor({ message = '', detail = '', code = 401 }) {
    super(message);
    this.detail = detail;
    this.code = code;
  }
}

export default TokenError;