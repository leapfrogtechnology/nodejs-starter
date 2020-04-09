import db from '../db';

/**
 * @class Model
 *
 * Base class that is extended by domain models such as users, leave, etc.
 */
class Model {
  constructor() {
    this._db = db(this.getTable());
  }

  /**
   * This method is required by the domain class.
   *
   * @returns {String}
   */
  getTable() {
    throw new Error('Not implemented');
  }

  /**
   * This method persists the payload object to underlying database.
   *
   * @param {Object} payload
   *
   * @returns {Promise}
   */
  save(payload = {}) {
    return new Promise((resolve, reject) => {
      db.transaction((trx) => {
        this._db
          .transacting(trx)
          .insert(payload)
          .then((response) => {
            trx.commit(response);
          })
          .catch((err) => {
            trx.rollback(err);
          });
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default Model;
