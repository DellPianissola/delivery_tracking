/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('deliveries', function(table) {
    table.increments('id').primary();
    table.string('customerName').notNullable();
    table.string('origin').notNullable();
    table.string('destination').notNullable();
    table.date('deliveryDate').notNullable();
    table.timestamps(true, true); // created_at, updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('deliveries');
};
