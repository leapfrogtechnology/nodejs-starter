import Model from './model';

/**
 * @class User
 *
 * User model for basic representing user entity.
 */
class User extends Model {
  getTable() {
    return 'users';
  }
}

export default new User();
