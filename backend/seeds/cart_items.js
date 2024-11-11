exports.seed = function (knex) {
  return knex('cart_items').del()
    .then(function () {
      return knex('cart_items').insert([
        { user_id: '1', product_id: "1", quantity: 1 },
      ]);
    });
};
