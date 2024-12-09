exports.seed = function (knex) {
    return knex('users')
        .del() // Delete all existing entries
        .then(function () {
            return knex('users').insert([
                { id: 1, name: 'John Doe', email: 'john.doe@example.com', is_premium: true, phone_number: '123-456-7890', country: 1 },
                { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', is_premium: false, phone_number: '987-654-3210', country: 2 },
                { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', is_premium: true, phone_number: '555-123-4567', country: 3 },
                { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', is_premium: false, phone_number: '444-555-6666', country: 4 },
                { id: 5, name: 'Charlie White', email: 'charlie.white@example.com', is_premium: true, phone_number: '333-444-5555', country: 5 },
                { id: 6, name: 'David Green', email: 'david.green@example.com', is_premium: false, phone_number: '222-333-4444', country: 6 },
                { id: 7, name: 'Emma Williams', email: 'emma.williams@example.com', is_premium: true, phone_number: '111-222-3333', country: 7 },
                { id: 8, name: 'Frank Harris', email: 'frank.harris@example.com', is_premium: false, phone_number: '666-777-8888', country: 8 },
                { id: 9, name: 'Grace Lee', email: 'grace.lee@example.com', is_premium: true, phone_number: '777-888-9999', country: 9 },
                { id: 10, name: 'Henry Clark', email: 'henry.clark@example.com', is_premium: false, phone_number: '888-999-0000', country: 10 },
            ]);
        });
};
