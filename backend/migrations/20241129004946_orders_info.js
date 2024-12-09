exports.up = function (knex) {
    return knex.schema.hasTable('orders_info').then(exists => {
        if (!exists) {
            return knex.schema.createTable('orders_info', function (table) {
                table.increments('id').primary();
                table.string('first_name', 255);
                table.string('last_name', 255);
                table.integer('country').unsigned()
                    .references('code').inTable('countries')
                    .onDelete('CASCADE');
                table.string('city', 255);
                table.string('address', 255);
                table.string('zip_code', 255);
                table.string('phone', 255);
                table.string('email', 255).unique();
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders_info');
};
