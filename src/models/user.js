import Model from './model';


/**
 * User model for basic CRUD.
 */
class User extends Model {
    constructor() {
        super(User.Table);
    }
}

User.Table = "users";

export default User;