import HttpStatus from 'http-status-codes';

import TokenError from '../errors/token';
import NetworkError from '../errors/network';

import { http } from '../utils/http';
import logger from '../utils/logger';

import { userSession } from './session';

const INTERNAL_ERROR = 'Internal Error';

/**
 * Get token from header in request.
 *
 * @param {Object} req
 */
const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    if (authorization.split(' ')[1] !== undefined) {
      return authorization.split(' ')[1];
    }
  }

  throw new TokenError({
    code: HttpStatus.UNAUTHORIZED,
  });
};

/**
 * Fetch users from auth server from token.
 *
 * @param {String} token
 * @throws NetworkError
 */
export function fetchUserByToken(token) {
  return http
    .get(`${process.env.AUTH_URL}/userinfo`, {
      headers: {
        accessToken: token,
        clientId: process.env.AUTH_CLIENT_ID,
      },
    })
    .then((response) => response.data);
}

/**
 * Validate token received in header.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function authenticateUser(req, res, next) {
  userSession.run(async () => {
    try {
      const token = getTokenFromHeaders(req);

      const user = await fetchUserByToken(token);

      userSession.set('user', {
        ...user,
        token,
      });
      next();
    } catch (err) {
      logger.error(err);
      if (err instanceof NetworkError) {
        return next(
          new NetworkError({
            message: INTERNAL_ERROR,
            code: HttpStatus.INTERNAL_SERVER_ERROR,
          })
        );
      }
      next(err);
    }
  });
}

export default authenticateUser;
