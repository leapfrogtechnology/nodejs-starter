import BaseError from './error';

/**
 * Error class for Network error.
 */
class NetworkError extends BaseError {
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
