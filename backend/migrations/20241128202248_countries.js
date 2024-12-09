exports.up = function (knex) {
    return knex.schema.hasTable('countries').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('countries', (table) => {
                table.integer('code').primary();
                table.string('name', 255);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('countries');
};
