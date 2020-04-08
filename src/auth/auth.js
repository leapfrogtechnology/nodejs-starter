import HttpStatus from 'http-status-codes';

import TokenError from '../errors/token';
import NetworkError from '../errors/network';
import * as userServices from '../services/user';
import logger from '../utils/logger';

const EMPTY_TOKEN = 'Access token not provided.';
const INTERNAL_ERROR = 'Internal Error';

/**
 * Get token from header in request.
 *
 * @param {Object} req
 */
const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    if (authorization.split(' ')[1] !== undefined) {
      return authorization.split(' ')[1];
    }
  }
  logger.error(`Token Error: ${EMPTY_TOKEN}`);

  throw new TokenError({
    message: EMPTY_TOKEN,
    code: HttpStatus.UNAUTHORIZED
  });
};

/**
 * Validate token received in header.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export async function authenticateUser(req, res, next) {
  try {
    const token = getTokenFromHeaders(req);
    const user = await userServices.fetchUserByToken(token);

    req.token = token;
    req.currentUser = user.data;
    next();
  } catch (error) {
    if (error instanceof NetworkError) {
      logger.error(`Network Error: ${error}`);

      return next(
        new NetworkError({
          message: INTERNAL_ERROR,
          code: HttpStatus.INTERNAL_SERVER_ERROR
        })
      );
    }

    if (error instanceof TokenError) {
      return next(error);
    }

    return next(
      new TokenError({
        code: 401,
        message: 'Not Authorized'
      })
    );
  }
}