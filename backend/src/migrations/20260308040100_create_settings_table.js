exports.up = function(knex) {
  return knex.schema.createTable('Settings', table => {
    table.increments('id').primary();
    table.decimal('car_hour_price', 14, 2).defaultTo(10000);
    table.decimal('car_day_price', 14, 2).defaultTo(60000);
    table.decimal('car_night_price', 14, 2).defaultTo(20000);
    table.decimal('moto_hour_price', 14, 2).defaultTo(4000);
    table.decimal('moto_day_price', 14, 2).defaultTo(30000);
    table.decimal('moto_night_price', 14, 2).defaultTo(8000);
    table.decimal('truck_hour_price', 14, 2).defaultTo(15000);
    table.decimal('truck_day_price', 14, 2).defaultTo(120000);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Settings');
};
