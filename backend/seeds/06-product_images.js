exports.seed = function (knex) {
    return knex('product_images')
        .del() // Delete all existing entries
        .then(function () {
            return knex('product_images').insert([
                { src: 'laptop.jpg', product_id: 1 },
                { src: 'smartphone.jpg', product_id: 2 },
                { src: 'headphones.jpg', product_id: 3 },
                { src: 'monitor.jpg', product_id: 4 },
                { src: 'keyboard.jpg', product_id: 5 },
                { src: 'mouse.jpg', product_id: 6 },
                { src: 'tablet.jpg', product_id: 7 },
                { src: 'smartwatch.jpg', product_id: 8 },
                { src: 'charger.jpg', product_id: 9 },
                { src: 'speaker.jpg', product_id: 10 },
            ]);
        });
};
