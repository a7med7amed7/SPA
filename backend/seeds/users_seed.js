exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { username: 'Ahmed', email: "ahmed@gmail.com", password: "ahmed" },
        { username: 'Ali', email: "ali@gmail.com", password: "ali" },
        { username: 'Saad', email: "saad@gmail.com", password: "saad" },
        { username: 'Amr', email: "amr@gmail.com", password: "amr" },
      ]);
    });
};
