import HttpStatus from 'http-status-codes';

/**
 * Base class for error.
 */
class BaseError extends Error {
  /**
   * Constructor method for BaseError.
   *
   * @param {String} message
   *
   * @returns {BaseError}
   */
  constructor(message = '') {
    super(message);
    // This flag is used to distinguished from other error types such as joi, boom, etc.
    this.isCustom = true;
  }

  /**
   * Generic http status code for custom errors.
   *
   * @returns {Number}
   */
  httpCode() {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export default BaseError;
