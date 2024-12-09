exports.up = function (knex) {
    return knex.schema.hasTable('orders').then(exists => {
        if (!exists) {
            return knex.schema.createTable('orders', function (table) {
                table.increments('id').primary().unsigned();
                table.integer('user_id').unsigned()
                    .references('id').inTable('users')
                    .onDelete('CASCADE');
                table.date('order_date');
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders');
};
