exports.up = function (knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.integer('price').notNullable();
        table.integer('stock').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products');
};
