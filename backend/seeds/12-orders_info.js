exports.seed = async function (knex) {
    await knex('orders_info').del();

    await knex('orders_info').insert([
        {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            country: 1,
            city: 'New York',
            address: '123 Main St',
            zip_code: '10001',
            phone: '1234567890',
            email: 'john.doe@example.com'
        },
        {
            id: 2,
            first_name: 'Jane',
            last_name: 'Smith',
            country: 2,
            city: 'Los Angeles',
            address: '456 Elm St',
            zip_code: '90001',
            phone: '9876543210',
            email: 'jane.smith@example.com'
        }
    ]);
};
