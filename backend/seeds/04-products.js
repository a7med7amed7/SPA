exports.seed = function (knex) {
    return knex('products')
        .del() // Delete all existing entries
        .then(function () {
            return knex('products').insert([
                { id: 1, name: 'Laptop', stock: 25, price: 1000, cover: 'laptop.jpg', rating: 4.5 },
                { id: 2, name: 'Smartphone', stock: 50, price: 699, cover: 'smartphone.jpg', rating: 4.3 },
                { id: 3, name: 'Headphones', stock: 100, price: 150, cover: 'headphones.jpg', rating: 4.7 },
                { id: 4, name: 'Monitor', stock: 15, price: 300, cover: 'monitor.jpg', rating: 4.2 },
                { id: 5, name: 'Keyboard', stock: 75, price: 50, cover: 'keyboard.jpg', rating: 4.1 },
                { id: 6, name: 'Mouse', stock: 120, price: 30, cover: 'mouse.jpg', rating: 4.6 },
                { id: 7, name: 'Tablet', stock: 40, price: 450, cover: 'tablet.jpg', rating: 4.4 },
                { id: 8, name: 'Smartwatch', stock: 80, price: 250, cover: 'smartwatch.jpg', rating: 4.3 },
                { id: 9, name: 'Charger', stock: 200, price: 20, cover: 'charger.jpg', rating: 4.8 },
                { id: 10, name: 'Speaker', stock: 60, price: 180, cover: 'speaker.jpg', rating: 4.2 },
            ]);
        });
};
