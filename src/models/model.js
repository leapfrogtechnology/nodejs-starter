import db from '../db';

import { clamp } from '../utils/math';

/**
 * Base class that is extended by domain models.
 */
class Model {
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
   * NOTE: Rollback triggers with rejected promise.
   *
   * @param {Object} payload
   * @returns {Promise}
   */
  save(payload = {}) {
    return db.transaction(trx => {
      return db(this.getTable()).transacting(trx).insert(payload);
    });
  }

  /**
   * This method fetches rows from database provided offset and limit.
   *
   * @param {Object} params
   * @returns {Promise}
   */
  fetch(params) {
    // Clamp the limit of the pagination to 100 exclusive
    const limit = clamp(params.limit, 0, 100);
    // Only positive offset allowed
    const offset = Math.max(0, params.offset);

    return db(this.getTable()).limit(limit).offset(offset);
  }
}

export default Model;
