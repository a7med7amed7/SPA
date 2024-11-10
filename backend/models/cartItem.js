const pool = require('../config/db')

const getCartItems = async (userId) => {
    try {
        const [result] = await pool.query(
            `SELECT id,product_id,quantity FROM cart_items WHERE user_id=?;`,
            [userId]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const createCartItem = async (data) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO cart_items(user_id, product_id, quantity) VALUES (?, ?, ?);`,
            [data.userId, data.productId, data.quantity]
        );
        return result;
    } catch (error) {
        throw error;
    }

}
const getCartItem = async (id) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM cart_items WHERE id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
const updateCartItemQuantity = async (id, quantity) => {
    try {
        const [result] = await pool.query(
            `UPDATE cart_items SET quantity=? WHERE id=?;`,
            [quantity, id]
        );
        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
const deleteCartItem = async (id) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM cart_items WHERE id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

const clearCart = async (id) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM cart_items WHERE user_id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

const getCustomCartItem = async (userId, productId) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM cart_items WHERE user_id=? AND product_id=?;`,
            [userId, productId]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteCartItemByProductId = async (id) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM cart_items WHERE product_id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCartItems,
    createCartItem,
    getCartItem,
    updateCartItemQuantity,
    deleteCartItem,
    getCustomCartItem,
    clearCart,
    deleteCartItemByProductId
}