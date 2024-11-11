exports.seed = function (knex) {
  return knex('products').del()
    .then(function () {
      return knex('products').insert([
        { name: 'Laptop', price: 100, stock: 50 },
        { name: 'Phone', price: 200, stock: 30 },
        { name: 'SSD', price: 150, stock: 20 },
        { name: 'Hard Desk', price: 30, stock: 10 },
        { name: 'Air Frier', price: 250, stock: 3 },
        { name: 'PC', price: 1500, stock: 20 },
        { name: 'Charger', price: 50, stock: 200 },
        { name: 'iPad', price: 850, stock: 25 },
      ]);
    });
};
