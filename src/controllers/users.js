import HttpStatus from 'http-status-codes';

import * as userService from '../services/userService';
import logger from '../utils/logger';

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  userService
    .getAllUsers()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  try {
    const data = userService.createUser(req.body);
    res.status(HttpStatus.CREATED).json({data})
  } catch(err) {
    logger.error(err);
    next(err)
  }
}
