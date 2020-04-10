import BaseError from './error';

/**
 * Error class for database failure and error.
 */
class DatabaseError extends BaseError {
  /**
   * Constructor of DatabaseError.
   *
   * @param {Object} error
   * @param {String} error.title
   * @param {String} error.message
   */
  constructor({ title = '', message = '' }) {
    super(message);
    this.title = title;
    this.message = message;
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `${this.title}[${this.statusCode}]`;
  }
}

export default DatabaseError;
