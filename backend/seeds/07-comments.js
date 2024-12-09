exports.seed = function (knex) {
    return knex('comments')
        .del() // Delete all existing entries
        .then(function () {
            return knex('comments').insert([
                { product_id: 1, content: 'Great laptop, very fast!' },
                { product_id: 2, content: 'Nice phone, camera is awesome.' },
                { product_id: 3, content: 'Comfortable headphones, but could use more bass.' },
                { product_id: 4, content: 'Good quality monitor, perfect for gaming.' },
                { product_id: 5, content: 'Keyboard feels great, but a bit too loud.' },
                { product_id: 6, content: 'Mouse is smooth and precise.' },
                { product_id: 7, content: 'Tablet is lightweight, great for reading and browsing.' },
                { product_id: 8, content: 'Smartwatch is very responsive, tracks steps accurately.' },
                { product_id: 9, content: 'Charger is quick and reliable.' },
                { product_id: 10, content: 'Excellent speaker with clear sound.' },
            ]);
        });
};
