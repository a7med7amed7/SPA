exports.up = function (knex) {
    return knex.schema.hasTable('system_logs').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('system_logs', (table) => {
                table.timestamp('log_date').defaultTo(knex.fn.now());
                table.string('level', 255);
                table.string('message', 255);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('system_logs');
};
