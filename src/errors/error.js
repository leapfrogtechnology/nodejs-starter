/**
 * Base class for error.
 */
class BaseError extends Error {
  constructor(message) {
    super(message);
  }
}

export default BaseError;
