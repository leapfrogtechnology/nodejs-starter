import BaseError from './error';

const TITLE = 'Network error';

/**
 * Error class for Network error.
 */
class NetworkError extends BaseError {
  /**
   * Constructor of NetworkError.
   *
   * @param {Object} error
   * @param {String} error.title
   * @param {String} error.message
   * @param {Number} error.code
   */
  constructor({ title = TITLE, message = '', code = 500 }) {
    super(message);
    this.title = title;
    this.message = message;
    this.code = code;
  }

  toString() {
    return `${this.title}[${this.code}]`;
  }
}

export default NetworkError;
