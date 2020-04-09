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
  }
}

export default BaseError;
