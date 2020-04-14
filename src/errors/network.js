import BaseError from './error';

/**
 * Error class for Network error.
 */
class NetworkError extends BaseError {
  /**
   * Constructor for NetworkError.
   *
   * @param {String} message
   * @returns {NetworkError}
   */
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Network Error: ${this.message}`;
  }
}

export default NetworkError;
