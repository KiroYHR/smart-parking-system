exports.up = function(knex) {
  return knex.schema.createTable('Transactions', table => {
    table.increments('transaction_id').primary();
    table.integer('user_id').unsigned().references('user_id').inTable('Users').onDelete('CASCADE');
    table.decimal('amount', 14, 2).notNullable();
    table.string('type').notNullable(); // TOPUP, PAYMENT, Deduction, etc.
    table.string('description');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Transactions');
};
