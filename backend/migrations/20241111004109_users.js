exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username', 100).notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('password', 255).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
