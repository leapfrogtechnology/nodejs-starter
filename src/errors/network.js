import BaseError from './error';

const TITLE = 'Network error';

/**
 * Error class for Network error.
 */
class NetworkError extends BaseError {
  /**
   * Constructor for NetworkError.
   *
   * @param {Object} error
   * @param {String} error.title
   * @param {String} error.message
   * @param {Number} error.code
   *
   * @returns {NetworkError}
   */
  constructor({ title = TITLE, message = '', code = 500 }) {
    super(message);
    this.title = title;
    this.message = message;
    this.statusCode = code;
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @method NetworkError#toString
   *
   * @returns {String}
   */
  toString() {
    return `${this.title}[${this.statusCode}]`;
  }
}

export default NetworkError;
