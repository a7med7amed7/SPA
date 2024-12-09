exports.seed = function (knex) {
    return knex('users_private_info')
        .del() // Delete all existing entries
        .then(function () {
            return knex('users_private_info').insert([
                { id: 1, address: '123 Main St, Cityville', card_number: 1234567890123456, expiry_date: '12/25', cvv: 123 },
                { id: 2, address: '456 Oak Ave, Townburg', card_number: 2345678901234567, expiry_date: '01/24', cvv: 234 },
                { id: 3, address: '789 Pine Rd, Villageville', card_number: 3456789012345678, expiry_date: '03/26', cvv: 345 },
                { id: 4, address: '101 Maple Dr, Suburbia', card_number: 4567890123456789, expiry_date: '06/23', cvv: 456 },
                { id: 5, address: '202 Birch Blvd, Uptown', card_number: 5678901234567890, expiry_date: '07/25', cvv: 567 },
                { id: 6, address: '303 Cedar Cir, Oldtown', card_number: 6789012345678901, expiry_date: '09/24', cvv: 678 },
                { id: 7, address: '404 Elm Ln, Downtown', card_number: 7890123456789012, expiry_date: '11/23', cvv: 789 },
                { id: 8, address: '505 Redwood Rd, Seaside', card_number: 8901234567890123, expiry_date: '05/22', cvv: 890 },
                { id: 9, address: '606 Ash Ct, Lakeside', card_number: 9012345678901234, expiry_date: '02/27', cvv: 901 },
                { id: 10, address: '707 Fir Dr, Countryside', card_number: 1234567890123456, expiry_date: '12/28', cvv: 112 },
            ]);
        });
};
