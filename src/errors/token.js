import BaseError from './error';

/**
 * Error class for Token Error.
 */
class TokenError extends BaseError {
  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Token Error: ${this.message}`;
  }
}

export default TokenError;
