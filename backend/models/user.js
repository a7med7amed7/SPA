const pool = require('../config/db');
const getAllUsers = async (callback) => {
    try {
        const [result] = await pool.query(
            `
            select users.id,name,email,phone_number,address from users
            inner join users_private_info
            on users.id = users_private_info.id
            `,
            []
        );
        return result;
    } catch (error) {
        throw error;
    }
};
const createUser = async (data) => {
    const connection = await pool.getConnection(); // Use a connection for the transaction
    try {
        await connection.beginTransaction(); // Start the transaction

        const [userResult] = await connection.query(
            `INSERT INTO users (name, email, is_premium, phone_number, country) 
             VALUES (?, ?, ?, ?, ?)`,
            [data.name, data.email, data.isPremium, data.phoneNumber, data.country]
        );

        const userId = userResult.insertId; // Get the auto-incremented ID from the first query

        await connection.query(
            `INSERT INTO users_private_info (id, address, card_number, expiry_date, cvv)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, data.address, data.cardNumber, data.expiryDate, data.cvv]
        );
        await connection.query(
            `INSERT INTO carts(user_id) VALUES(?)`,
            [userId]
        );
        await connection.commit(); // Commit the transaction
        return { userId };
    } catch (err) {
        await connection.rollback(); // Roll back the transaction in case of error
        throw err
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};


const getUser = async (id) => {
    try {
        const [result] = await pool.query(
            `
            select users.id,name,email,phone_number,address from users
            inner join users_private_info
            on users.id = users_private_info.id
            where users.id = ?
            `,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (data) => {
    const connection = await pool.getConnection(); // Use a connection for the transaction
    try {
        await connection.beginTransaction(); // Start the transaction

        const [userResult] = await connection.query(
            `update users set name=?, email=?, is_premium=?, phone_number=?, country=?
            where id = ?
            `,
            [data.name, data.email, data.isPremium, data.phoneNumber, data.country, data.id]
        );


        await connection.query(
            `update users_private_info set address=?, card_number=?, expiry_date=?, cvv=?
             where id = ?`,
            [data.address, data.cardNumber, data.expiryDate, data.cvv, data.id]
        );

        await connection.commit(); // Commit the transaction
        return userResult;
    } catch (err) {
        await connection.rollback(); // Roll back the transaction in case of error
        throw err
    } finally {
        connection.release(); // Release the connection back to the pool
    }
}
const deleteUser = async (id) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM users WHERE id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}