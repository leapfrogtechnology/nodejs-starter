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
   * @param {Number} error.code
   */
  constructor({ title = '', message = '', code = 500 }) {
    super(message);
    this.title = title;
    this.message = message;
    this.code = code;
  }
  
  toString() {
    return `${this.title}[${this.code}]`;
  }
}

export default DatabaseError;