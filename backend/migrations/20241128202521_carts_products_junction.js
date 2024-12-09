exports.up = function (knex) {
    return knex.schema.hasTable('carts_products_junction').then(exists => {
        if (!exists) {
            return knex.schema.createTable('carts_products_junction', function (table) {
                table.integer('cart_id').unsigned()
                    .references('id').inTable('carts')
                    .onDelete('CASCADE');
                table.integer('product_id').unsigned()
                    .references('id').inTable('products')
                    .onDelete('CASCADE');
                table.integer('quantity');
                table.primary(['cart_id', 'product_id']);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('carts_products_junction');
};
