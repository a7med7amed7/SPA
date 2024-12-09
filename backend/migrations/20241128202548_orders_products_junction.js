exports.up = function (knex) {
    return knex.schema.hasTable('orders_products_junction').then(exists => {
        if (!exists) {
            return knex.schema.createTable('orders_products_junction', function (table) {
                table.integer('order_id').unsigned()
                    .references('id').inTable('orders')
                    .onDelete('CASCADE');
                table.integer('product_id').unsigned()
                    .references('id').inTable('products')
                    .onDelete('CASCADE');
                table.integer('quantity');
                table.primary(['order_id', 'product_id']);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders_products_junction');
};
