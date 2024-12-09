exports.up = function (knex) {
    return knex.schema.hasTable('comments').then(exists => {
        if (!exists) {
            return knex.schema.createTable('comments', function (table) {
                table.increments('id').primary().unsigned();
                table.integer('product_id').unsigned()
                    .references('id').inTable('products')
                    .onDelete('CASCADE');
                table.text('content');
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comments');
};
