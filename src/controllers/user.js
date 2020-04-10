import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';

import * as userService from '../services/user';

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  try {
    const data = await userService.fetchAll();
    
    res.json({ data });
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function create(req, res, next) {
  try {
    const data = await userService.create(req.body);

    res.status(HttpStatus.CREATED).json({ data });
  } catch (err) {
    logger.error(err);
    next(err);
  }
}
