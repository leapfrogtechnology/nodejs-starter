import BaseError from './error';

/**
 * Error class for database failure and error.
 */
class DatabaseError extends BaseError {
  /**
   * Constructor for DatabaseError.
   *
   * @param {String} message
   * @returns {DatabaseError}
   */
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }

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
