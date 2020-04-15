import HttpStatus from 'http-status-codes';

import * as userService from '../services/user';

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function findAll(req, res, next) {
  try {
    const data = await userService.findAll();

    res.json({ data });
  } catch (err) {
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
    next(err);
  }
}
