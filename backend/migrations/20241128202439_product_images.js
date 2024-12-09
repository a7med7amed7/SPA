exports.up = function (knex) {
    return knex.schema.hasTable('product_images').then(exists => {
        if (!exists) {
            return knex.schema.createTable('product_images', function (table) {
                table.string('src', 255);
                table.integer('product_id').unsigned()
                    .references('id').inTable('product_details')
                    .onDelete('CASCADE');
                table.primary(['src', 'product_id']);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('product_images');
};
