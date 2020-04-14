/**
 * Create table `evaluation_detail`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema
    .createTable('evaluation_detail', table => {
      table.increments('id').primary().unsigned().notNullable();
      table.foreign('evaluation_id', 'INT(11)').refrences('id').inTable('evaluation');
      table.foreign('trait_id', 'INT(11)').refrences('id').inTable('traits');
      table.enu('who', ['Appraisee', 'Appraiser']).nullable();
      table.specificType('score', 'TINYINT(4)').nullable();
      table.text('comments');
      table.text('aoi');
    })
    .then(() =>
      knex.raw(
        `CREATE UNIQUE INDEX evaluation_detail__evaluation_id__trait_id__who__uidx ON evaluation_detail (evaluation_id, trait_id, who)`
      )
    );
}

/**
 * Drop `evaluation_detail`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export async function down(knex) {
  await knex.raw(`DROP INDEX evaluation_detail__evaluation_id__trait_id__who__uidx ON evaluation_detail`);

  return knex.schema.dropTable('evaluation_detail');
}
