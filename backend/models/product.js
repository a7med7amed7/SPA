const pool = require('../config/db')

const getAllProducts = async (callback) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM products;`,
            []
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const createProduct = async (data) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction(); // Start the transaction

        const [productResult] = await connection.query(
            `INSERT INTO products (name, stock, price, cover, rating)
             VALUES (?, ?, ?, ?, ?)`,
            [data.name, data.stock, data.price, data.cover, data.rating]
        );

        const productId = productResult.insertId;

        await connection.query(
            `INSERT INTO product_details (id, description)
             VALUES (?, ?)`,
            [productId, data.description]
        );

        if (data.images && data.images.length) {
            const imageValues = data.images.map((image) => [image, productId]);
            await connection.query(
                `INSERT INTO product_images (src, product_id)
                 VALUES ?`,
                [imageValues]
            );
        }
        if (data.comments && data.comments.length) {
            const commentValues = data.comments.map((comment) => [comment, productId]);
            await connection.query(
                `INSERT INTO comments (content, product_id)
                 VALUES ?`,
                [commentValues]
            );
        }
        await connection.commit(); // Commit the transaction
        return { productId };
    } catch (error) {
        await connection.rollback(); // Rollback the transaction in case of failure
        throw error;
    } finally {
        connection.release(); // Release the connection
    }
};

const getProduct = async (id) => {
    try {
        const [result] = await pool.query(
            `
            select * from products
            inner join product_details
            on products.id=product_details.id
            where products.id = ?;
            `,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
const updateProduct = async (data) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction(); // Start the transaction

        const [productResult] = await connection.query(
            `update products set name=?, stock=?, price=?, cover=?, rating=?
             where id = ?`,
            [data.name, data.stock, data.price, data.cover, data.rating, data.id]
        );

        await connection.query(
            `update product_details set description=?
             where id = ?`,
            [data.description, data.id]
        );
        await connection.commit(); // Commit the transaction
        return productResult;
    } catch (error) {
        await connection.rollback(); // Rollback the transaction in case of failure
        console.log(err)
        throw error;
    } finally {
        connection.release(); // Release the connection
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
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction(); // Start the transaction

        const [productResult] = await connection.query(
            `DELETE FROM products WHERE id=?;`,
            [id]
        );
        await connection.query(
            `DELETE FROM product_details WHERE id=?;`,
            [id]
        );
        await connection.commit(); // Commit the transaction
        return productResult;
    } catch (error) {
        await connection.rollback(); // Rollback the transaction in case of failure
        console.log(err)
        throw error;
    } finally {
        connection.release(); // Release the connection
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