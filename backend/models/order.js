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

const createOrder = async (orderData) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert into orders
        const [orderResult] = await connection.query(
            `
            INSERT INTO orders (user_id, order_date) VALUES (?, NOW());
            `,
            [orderData.userId]
        );
        const orderId = orderResult.insertId;

        // Insert into orders_info
        await connection.query(
            `
            INSERT INTO orders_info 
            (id, first_name, last_name, country, city, address, zip_code, phone, email)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [
                orderId,
                orderData.firstName,
                orderData.lastName,
                orderData.country,
                orderData.city,
                orderData.address,
                orderData.zipCode,
                orderData.phone,
                orderData.email,
            ]
        );

        // Insert into orders_products_junction
        const productValues = orderData.products.map((product) => [orderId, product.productId, product.quantity]);
        await connection.query(
            `
            INSERT INTO orders_products_junction (order_id, product_id, quantity) VALUES ?;
            `,
            [productValues]
        );
        const paymentInfo = await connection.query(
            `
            SELECT card_number, expiry_date, cvv FROM users_private_info where id=?;
            `,
            [orderData.userId]
        );
        let country = await connection.query(
            `
            SELECT name FROM countries where code=?;
            `,
            [orderData.country]
        );
        const totalPrice = await connection.query(
            `
            SELECT 
                p.name AS name,
                opj.quantity AS quantity,
                p.price AS price,
                opj.quantity * p.price AS cost
            FROM 
                orders o
            JOIN 
                orders_products_junction opj ON o.id = opj.order_id
            JOIN 
                products p ON opj.product_id = p.id
            WHERE 
                o.id = ?
            GROUP BY p.id;
             `
            , [orderId]
        )
        await connection.commit();
        const userPrivateInfo = paymentInfo[0];
        const totalPriceInfo = totalPrice[0];
        country = country[0];
        return { orderId, country, userPrivateInfo, totalPriceInfo };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
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