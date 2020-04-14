/**
 * Create table `evaluation_status`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema
    .createTable('evaluation_status', table => {
      table.increments('id').primary().unsigned().notNullable();
      table.foreign('evaluation_id', 'INT(11)').refrences('id').inTable('evaluation');
      table
        .enu('status', [
          'Self Evaluation',
          'Appraiser Evaluation',
          'Mediator Evaluation',
          'Ready for 1:1',
          'Complete',
          'Canceled',
        ])
        .notNullable();
      table.string('remark').nullable();
      table.specificType('created_by', 'INT(11)').notNullable();
      table.datetime('created_at').defaultTo(knex.raw('now()')).notNullable();
    })
    .then(() =>
      knex.raw(
        `CREATE UNIQUE INDEX evaluation_status__evaluation_id__status__uidx ON evaluation_status ( evaluation_id, status)`
      )
    );
}

/**
 * Drop `evaluation_status`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export async function down(knex) {
  await knex.raw(`DROP INDEX evaluation_status__evaluation_id__status__uidx ON evaluation_status;`);

  return knex.schema.dropTable('evaluation_status');
}
