/**
 * Base class for error.
 */
class BaseError extends Error {
  /**
   * Constructor method for BaseError.
   *
   * @returns {BaseError}
   */
  constructor(message) {
    super(message);
    // This flag it used to distinguished from other error types such as joi, boom, etc.
    this.isCustom = true;
  }
}

export default BaseError;
