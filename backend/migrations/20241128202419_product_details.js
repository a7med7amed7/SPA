exports.up = function (knex) {
    return knex.schema.hasTable('product_details').then(exists => {
        if (!exists) {
            return knex.schema.createTable('product_details', function (table) {
                table.integer('id').primary().unsigned()
                    .references('id').inTable('products')
                    .onDelete('CASCADE');
                table.text('description');
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('product_details');
};
