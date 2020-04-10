import TokenError from '../errors/token';

import logger from '../utils/logger';
import { http } from '../utils/http';

import { userSession } from './session';

const log = logger.withNamespace('AUTH');

/**
 * Get token from header in http request.
 *
 * @param {Object} req
 */
function getTokenFromHeaders(req) {
  const {
    headers: { authorization = '' },
  } = req;

  const fields = authorization.split(' ').filter(Boolean);

  if (fields.length <= 1 || fields[0] !== 'Bearer') {
    return {
      ok: false,
    };
  }

  return {
    token: fields[1],
  };
}

/**
 * Fetch user from auth server from token.
 *
 * @param {String} token
 * @throws NetworkError
 *
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
function authenticateUser(req, res, next) {
  userSession.run(async () => {
    try {
      const { ok, token } = getTokenFromHeaders(req);

      if (!ok) {
        throw new TokenError('Invalid token');
      }
      const user = await fetchUserByToken(token);

      userSession.set('user', {
        ...user,
        token,
      });
      next();
    } catch (err) {
      log.error(err);
      next(err);
    }
  });
}

export default authenticateUser;
