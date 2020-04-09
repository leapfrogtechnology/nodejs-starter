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
export function fetchAll(req, res, next) {
  userService
    .fetchAll()
    .then((data) => res.json({ data }))
    .catch(next);
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
    const data = userService.create(req.body);

    res.status(HttpStatus.CREATED).json({ data });
  } catch (err) {
    logger.error(err);
    next(err);
  }
}
