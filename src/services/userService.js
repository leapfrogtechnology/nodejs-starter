import User from '../models/user';
import userSession from '../auth/session'

import logger from '../utils/logger';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export async function getAllUsers() {
  const users = await new User().fetchAll();
  return users;   
}

export async function createUser() {
  const user = userSession();
  try {
    const id = await new User().save(user);
    logger.info(`User created: ${user}`)
    return {
      id: id.pop(),
    };
  } catch (err) {
    throw err;
  }
}