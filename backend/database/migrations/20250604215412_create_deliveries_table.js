/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('deliveries', function(table) {
    table.increments('id').primary();
    table.string('customerName').notNullable();
    table.date('deliveryDate').notNullable();
    table.timestamps(true, true); // created_at, updated_at

    // Adicionar os novos campos de endereço (origin)
    table.string('originStreet').notNullable();
    table.string('originNumber').notNullable();
    table.string('originNeighborhood').notNullable();
    table.string('originCity').notNullable();
    table.string('originState').notNullable();

    // Adicionar os novos campos de endereço (destination)
    table.string('destinationStreet').notNullable();
    table.string('destinationNumber').notNullable();
    table.string('destinationNeighborhood').notNullable();
    table.string('destinationCity').notNullable();
    table.string('destinationState').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('deliveries');
};
