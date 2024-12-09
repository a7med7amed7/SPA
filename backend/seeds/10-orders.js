exports.seed = function (knex) {
    return knex('orders')
        .del() // Delete all existing entries
        .then(function () {
            return knex('orders').insert([
                { id: 1, user_id: 1, order_date: '2024-11-01' },
                { id: 2, user_id: 2, order_date: '2024-11-02' },
                { id: 3, user_id: 3, order_date: '2024-11-03' },
                { id: 4, user_id: 4, order_date: '2024-11-04' },
                { id: 5, user_id: 5, order_date: '2024-11-05' },
                { id: 6, user_id: 6, order_date: '2024-11-06' },
                { id: 7, user_id: 7, order_date: '2024-11-07' },
                { id: 8, user_id: 8, order_date: '2024-11-08' },
                { id: 9, user_id: 9, order_date: '2024-11-09' },
                { id: 10, user_id: 10, order_date: '2024-11-10' },
            ]);
        });
};
