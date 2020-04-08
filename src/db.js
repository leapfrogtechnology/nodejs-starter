import knexJs from 'knex';

import knexConfig from './knexfile';

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);

export default knex;
