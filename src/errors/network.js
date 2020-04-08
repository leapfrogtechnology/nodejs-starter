 
import BaseError from './error';

/**
 * Error class for Network error.
 */
class NetworkError extends BaseError {
  /**
   * Constructor of NetworkError.
   *
   * @param {Object} error
   * @param {String} error.message
   * @param {String} error.detail
   * @param {Number} error.code
   */
  constructor({ message = '', detail = '', code = 500 }) {
    super(message);
    this.detail = detail;
    this.code = code;
  }
}

export default NetworkError;