/**
 * Create table `evaluations`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('evaluations', table => {
    table.increments('id').primary().unsigned().notNullable();
    table.specificType('appraisee_id', 'INT(11)').notNullable();
    table.string('appraisee_fullname').notNullable();
    table.string('appraisee_email').notNullable();
    table.string('appraisee_designation').notNullable();
    table.specificType('appraiser_id', 'INT(11)').notNullable();
    table.string('appraiser_fullname').notNullable();
    table.string('appraiser_email').notNullable();
    table.string('appraiser_designation').notNullable();
    table.specificType('mediator_id', 'INT(11)').notNullable();
    table.string('mediator_fullname').notNullable();
    table.string('mediator_email').notNullable();
    table.string('mediator_designation').notNullable();
    table.specificType('project_id', 'INT(11)').nullable();
    table.string('project_name').notNullable();
    table.foreign('period_id', 'INT(11)').refrences('id').inTable('periods');
    table.specificType('mutual_score', 'TINYINT(4)').nullable();
    table.specificType('created_by', 'INT(11)').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.specificType('updated_by', 'INT(11)').nullable();
    table.datetime('updated_at').nullable();
  });
}

/**
 * Drop `evaluations`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('evaluations');
}
