exports.up = function (knex) {
    return knex.schema.hasTable('users').then(exists => {
        if (!exists) {
            return knex.schema.createTable('users', function (table) {
                table.increments('id').primary().unsigned();
                table.string('name', 255);
                table.string('email', 255).unique();
                table.boolean('is_premium');
                table.string('phone_number', 255);
                table.integer('country').unsigned()
                    .references('code').inTable('countries')
                    .onDelete('CASCADE');
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
