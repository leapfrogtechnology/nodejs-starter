/**
 * Create table `traits`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema
    .createTable('traits', table => {
      table.increments('id').primary().unsigned().notNullable();
      table.string('name').notNullable();
      table.specificType('created_by', 'INT(11)').notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
    })
    .then(() => knex.raw(`CREATE UNIQUE INDEX traits__name__uidx ON traits (name)`));
}

/**
 * Drop `traits`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export async function down(knex) {
  await knex.raw(`DROP INDEX traits__name__uidx ON traits`);

  return knex.schema.dropTable('traits');
}
