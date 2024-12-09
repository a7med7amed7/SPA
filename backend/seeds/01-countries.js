exports.seed = function (knex) {
    return knex('countries')
        .del() // Delete all existing entries
        .then(function () {
            return knex('countries').insert([
                { code: 1, name: 'United States' },
                { code: 2, name: 'Canada' },
                { code: 3, name: 'Mexico' },
                { code: 4, name: 'United Kingdom' },
                { code: 5, name: 'Australia' },
                { code: 6, name: 'Germany' },
                { code: 7, name: 'France' },
                { code: 8, name: 'Italy' },
                { code: 9, name: 'Japan' },
                { code: 10, name: 'Brazil' },
            ]);
        });
};
