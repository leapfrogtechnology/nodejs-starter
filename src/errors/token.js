import BaseError from './error';

/**
 * Error class for Token Error.
 */
class TokenError extends BaseError {
  /**
   * Constructor for TokenError.
   *
   * @param {String} message
   * @returns {TokenError}
   */
  constructor(message) {
    super(message);
    this.name = 'TokenError';
  }

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
