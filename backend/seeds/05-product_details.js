exports.seed = function (knex) {
    return knex('product_details')
        .del() // Delete all existing entries
        .then(function () {
            return knex('product_details').insert([
                { id: 1, description: 'A powerful laptop for work and gaming.' },
                { id: 2, description: 'A sleek and modern smartphone with a great camera.' },
                { id: 3, description: 'Noise-cancelling headphones with excellent sound quality.' },
                { id: 4, description: 'High-definition monitor with a 144Hz refresh rate.' },
                { id: 5, description: 'Ergonomic mechanical keyboard with customizable RGB lights.' },
                { id: 6, description: 'Wireless mouse with ergonomic design for comfortable use.' },
                { id: 7, description: 'Lightweight tablet with great performance and battery life.' },
                { id: 8, description: 'Smartwatch with fitness tracking and notifications.' },
                { id: 9, description: 'Fast charger compatible with most modern devices.' },
                { id: 10, description: 'Portable Bluetooth speaker with great bass and clarity.' },
            ]);
        });
};
