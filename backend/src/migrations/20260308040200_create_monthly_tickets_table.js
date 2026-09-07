exports.up = function(knex) {
  return knex.schema.createTable('Monthly_Tickets', table => {
    table.increments('ticket_id').primary();
    table.integer('user_id').unsigned().references('user_id').inTable('Users').onDelete('CASCADE');
    table.string('license_plate').notNullable();
    table.timestamp('start_date').notNullable();
    table.timestamp('expiry_date').notNullable();
    table.string('status').defaultTo('Active');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Monthly_Tickets');
};
