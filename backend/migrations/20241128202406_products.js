exports.up = function (knex) {
    return knex.schema.hasTable('products').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('products', (table) => {
                table.increments('id').primary();
                table.string('name', 255);
                table.integer('stock');
                table.integer('price');
                table.string('cover', 255);
                table.float('rating');
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products');
};
