exports.seed = function (knex) {
    return knex('orders_products_junction')
        .del() // Delete all existing entries
        .then(function () {
            return knex('orders_products_junction').insert([
                { order_id: 1, product_id: 1, quantity: 2 },
                { order_id: 1, product_id: 2, quantity: 1 },
                { order_id: 2, product_id: 3, quantity: 3 },
                { order_id: 3, product_id: 4, quantity: 1 },
                { order_id: 4, product_id: 5, quantity: 5 },
                { order_id: 5, product_id: 6, quantity: 2 },
                { order_id: 6, product_id: 7, quantity: 3 },
                { order_id: 7, product_id: 8, quantity: 1 },
                { order_id: 8, product_id: 9, quantity: 2 },
                { order_id: 9, product_id: 10, quantity: 4 },
            ]);
        });
};
