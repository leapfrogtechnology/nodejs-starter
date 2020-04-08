import HttpStatus from 'http-status-codes';

import TokenError from '../errors/token';
import NetworkError from '../errors/network';

import { http } from '../utils/http';
import logger from '../utils/logger';

const EMPTY_TOKEN = 'Access token not provided.';
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
  logger.error(`Token Error: ${EMPTY_TOKEN}`);

  throw new TokenError({
    message: EMPTY_TOKEN,
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
async function authenticateUser(req, res, next) {
  try {
    const token = getTokenFromHeaders(req);
    const user = await fetchUserByToken(token);

    req.token = token;
    req.currentUser = user.data;
    next();
  } catch (error) {
    if (error instanceof NetworkError) {
      logger.error(`Network Error: ${error}`);

      return next(
        new NetworkError({
          message: INTERNAL_ERROR,
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      );
    }

    if (error instanceof TokenError) {
      return next(error);
    }

    return next(
      new TokenError({
        code: 401,
        message: 'Not Authorized',
      })
    );
  }
}

export default authenticateUser;
