exports.up = function (knex) {
    return knex.schema.createTable('cart_items', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('product_id').notNullable();
        table.integer('quantity').notNullable().defaultTo(1);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cart_items');
};
