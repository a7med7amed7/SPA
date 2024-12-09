exports.seed = function (knex) {
    return knex('carts_products_junction')
        .del() // Delete all existing entries
        .then(function () {
            return knex('carts_products_junction').insert([
                { cart_id: 1, product_id: 1, quantity: 15 },
                { cart_id: 1, product_id: 2, quantity: 3 },
                { cart_id: 1, product_id: 3, quantity: 15 },
                { cart_id: 2, product_id: 4, quantity: 10 },
                { cart_id: 2, product_id: 5, quantity: 70 },
                { cart_id: 3, product_id: 6, quantity: 88 },
                { cart_id: 4, product_id: 7, quantity: 9 },
                { cart_id: 5, product_id: 8, quantity: 51 },
                { cart_id: 6, product_id: 9, quantity: 5 },
                { cart_id: 7, product_id: 10, quantity: 18 },
            ]);
        });
};
