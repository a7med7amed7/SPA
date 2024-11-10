const pool = require('../config/db')

const getAllProducts = async (callback) => {
    try {
        const [result] = await pool.query(
            `SELECT id,name,price,stock FROM products;`,
            []
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const createProduct = async (data) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO products(name, price, stock) VALUES (?, ?, ?);`,
            [data.name, data.price, data.stock]
        );
        return result;
    } catch (error) {
        throw error;
    }

}
const getProduct = async (id) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM products WHERE id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
const updateProduct = async (id, data) => {
    try {
        const [result] = await pool.query(
            `UPDATE products SET name=?, price=?, stock=? WHERE id=?;`,
            [data.name, data.price, data.stock, id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
const updateProductStock = async (rem, id) => {
    try {
        const [result] = await pool.query(
            `UPDATE products SET stock=? WHERE id=?;`,
            [rem, id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
const deleteProduct = async (id) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM products WHERE id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

const getListOfProducts = async (list) => {
    try {
        const placeholders = list.map(() => '?').join(', ');
        const query = `SELECT * FROM products WHERE id IN (${placeholders})`;
        console.log(query, list);
        const [result] = await pool.query(query, list)
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getListOfProducts,
    updateProductStock
}