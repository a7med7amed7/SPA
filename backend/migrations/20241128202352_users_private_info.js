exports.up = function (knex) {
    return knex.schema.hasTable('users_private_info').then(exists => {
        if (!exists) {
            return knex.schema.createTable('users_private_info', function (table) {
                table.integer('id').primary().unsigned()
                    .references('id').inTable('users')
                    .onDelete('CASCADE');
                table.text('address');
                table.bigInteger('card_number');
                table.string('expiry_date', 255);
                table.integer('cvv');
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users_private_info');
};
