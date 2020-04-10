import BaseError from './error';

/**
 * Error class for database failure and error.
 */
class DatabaseError extends BaseError {
  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Database Error: ${this.message}`;
  }
}

export default DatabaseError;
