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
   *
   * @returns {NetworkError}
   */
  constructor({ title = TITLE, message = '' }) {
    super(message);
    this.title = title;
    this.message = message;
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `${this.title}[${this.statusCode}]`;
  }
}

export default NetworkError;
