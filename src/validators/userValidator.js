import Joi from '@hapi/joi';

import validate from '../utils/validate';

// Validation schema
const schema = Joi.object({
  name: Joi.string().label('Name').max(90).required(),
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch(next);
}

export { userValidator };
