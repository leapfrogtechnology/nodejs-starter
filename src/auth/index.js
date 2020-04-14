import * as store from '@leapfrogtechnology/async-store';

import { http } from '../utils/http';
import TokenError from '../errors/token';
import logger from '../utils/logger';

/**
 * Extract token from headers in http request.
 *
 * @param {Object} headers
 * @returns {Object}
 */
function extractTokenFromHeaders(headers = {}) {
  const { authorization = '' } = headers;

  const [tokenType, token] = authorization.split(' ').filter(Boolean);

  if (tokenType !== 'Bearer' || !token) {
    return {
      ok: false,
    };
  }

  return {
    token,
  };
}

/**
 * Fetch user from auth server using token.
 *
 * @param {String} token
 * @throws {NetworkError}
 * @returns {Promise}
 */
async function fetchUserByToken(token) {
  const { data } = await http.get(`${process.env.AUTH_URL}/userinfo`, {
    headers: {
      accessToken: token,
      clientId: process.env.AUTH_CLIENT_ID,
    },
  });

  return data;
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
    const { ok, token } = extractTokenFromHeaders(req.headers);

    if (!ok) {
      throw new TokenError('Invalid token');
    }

    const user = await fetchUserByToken(token);

    store.set(user);
    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export default authenticateUser;
