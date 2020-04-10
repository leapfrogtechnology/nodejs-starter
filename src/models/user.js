import Model from './model';

/**
 * User model representing user entity.
 */
class User extends Model {
  /**
   * Returns table name associated with User model.
   *
   * @returns {String}
   */
  getTable() {
    return 'users';
  }
}

export default new User();
