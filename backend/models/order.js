const pool = require('../config/db')

const getAllOrders = async (callback) => {
    try {
        const [result] = await pool.query(
            `SELECT id,user_id,first_name,last_name,country,city,address,zip_code,phone,email created_at FROM orders;`,
            []
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const createOrder = async (data) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO orders(user_id,card_number,expiry_date,CVV,first_name,last_name,country,city,address,zip_code,phone,email) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?);`,
            [data.userId, data.cardNumber, data.expiryDate, data.CVV, data.firstName, data.lastName,
            data.country, data.city, data.address, data.zipCode, data.phone, data.email
            ]
        );
        return result;
    } catch (error) {
        throw error;
    }

}
const getOrder = async (id) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM orders WHERE id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
const updateOrderBillingAddress = async (id, data) => {
    try {
        const [result] = await pool.query(
            `UPDATE orders SET first_name=?,last_name=?,country=?,city=?,address=?,zip_code=?,phone=?,email=? WHERE id=?;`,
            [data.firstName, data.lastName, data.country, data.city, data.address,
            data.zipCode, data.phone, data.email, id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
const deleteOrder = async (id) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM orders WHERE id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAllOrders,
    createOrder,
    getOrder,
    updateOrderBillingAddress,
    deleteOrder
}
// weF13e5F41f63ef45iy
// LOG key 899Ny3FJdtb
// TRS key : 34rPX7v25bBjHd6N