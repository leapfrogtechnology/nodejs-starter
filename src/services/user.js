import * as store from '@leapfrogtechnology/async-store';

import User from '../models/user';
import logger from '../utils/logger';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export async function fetchAll() {
  const users = await User.fetchAll();

  return users;
}

/**
 * Create a new user.
 *
 * @returns {Promise}
 */
export async function create() {
  // Example for retrieving the user from async-store in service.
  const user = store.get('user');

  const id = await User.save(user);

  logger.info(`User created: ${user}`);

  return {
    id: id.pop(),
  };
}
