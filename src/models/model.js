import db from '../db';

/**
 * Base class that is extended by domain models such as users, leave, etc.
 */
class Model {
  constructor(dbname) {
    this._db = db(dbname);
  }
  
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
  
  fetchAll() {
    return this._db.select('*');
  }

  fetchBy(where) {
    return this._db.where(where).first();
  }

  fetchAllBy(where) {
    return this._db.where(where);
  }
}

export default Model;