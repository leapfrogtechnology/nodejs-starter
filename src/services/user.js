import * as store from '@leapfrogtechnology/async-store';

import User from '../models/user';
import logger from '../utils/logger';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function fetch() {
  // Example: should retrieve from the query parameter
  return User.fetch({ limit: 3, offset: 4 });
}

/**
 * Create a new user.
 *
 * @returns {Promise}
 */
export async function create() {
  // Example for retrieving the user from async-store in service.
  const user = store.get('user');

  const [id] = await User.save(user);

  logger.info(`User created: ${user}`);

  return {
    id,
  };
}
