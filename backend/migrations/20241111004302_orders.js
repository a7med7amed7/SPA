exports.up = function (knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.string('card_number', 16).notNullable();
        table.string('expiry_date', 5).notNullable();
        table.string('cvv', 3).notNullable();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.string('country', 255).notNullable();
        table.string('city', 255).notNullable();
        table.string('address', 255).notNullable();
        table.string('zip_code', 255).notNullable();
        table.string('phone', 255).notNullable();
        table.string('email', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders');
};
