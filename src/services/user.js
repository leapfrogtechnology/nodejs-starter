import User from '../models/user';
import userSession from '../auth/session';

import logger from '../utils/logger';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export async function fetchAll() {
  const users = await new User().fetchAll();

  return users;
}

/**
 * Create a new user.
 * 
 * @returns {Promise}
 */
export async function create() {
  const user = userSession();

    const id = await new User().save(user);

    logger.info(`User created: ${user}`);
    
    return {
      id: id.pop(),
    };
}
