exports.up = function (knex) {
    return knex.schema.hasTable('carts').then(exists => {
        if (!exists) {
            return knex.schema.createTable('carts', function (table) {
                table.increments('id').primary().unsigned();
                table.integer('user_id').unsigned()
                    .references('id').inTable('users')
                    .onDelete('CASCADE');
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('carts');
};
