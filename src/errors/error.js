/**
 * Base class for error.
 */
class BaseError extends Error {
  /**
   * Constructor method for BaseError.
   *
   * @param {String} message
   * @returns {BaseError}
   */
  constructor(message = '') {
    super(message);
    // This flag is used to distinguished from other error types such as joi, boom, etc.
    this.isCustom = true;
  }
}

export default BaseError;
