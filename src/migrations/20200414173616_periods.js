/**
 * Create table `periods`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema
    .createTable('periods', table => {
      table.increments('id').primary().unsigned().notNullable();
      table.string('name').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.date('self_evaluation_deadline').notNullable();
      table.date('appraiser_evaluation_deadline').notNullable();
      table.date('mediator_evaluation_deadline').notNullable();
      table.date('one_on_one_deadline').notNullable();
      table.specificType('created_by', 'INT(11)').notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
      table.specificType('updated_by', 'INT(11)').nullable();
      table.datetime('updated_at').nullable();
    })
    .then(() => knex.raw(`CREATE UNIQUE INDEX periods__name__uidx ON periods (name)`));
}

/**
 * Drop `periods`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export async function down(knex) {
  await knex.raw(`DROP INDEX periods__name__uidx ON periods`);

  return knex.schema.dropTable('periods');
}
