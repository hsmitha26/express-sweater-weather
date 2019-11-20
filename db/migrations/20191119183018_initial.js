
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username');
      table.string('apiKey');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('locations', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('user_id').unsigned()
      table.foreign('user_id')
        .references('users.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('users')
  ]);
};
