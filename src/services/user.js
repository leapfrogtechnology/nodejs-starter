import User from '../models/user';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function findAll() {
  // Example: should retrieve from the query parameter
  return User.findAll();
}

/**
 * Create a new user.
 *
 * @param {Object} data
 * @returns {Promise}
 */
export function create(data) {
  // Example for retrieving the user from async-store in service.
  return User.transaction(trx => {
    return User.insert(data, trx);
  });
}
