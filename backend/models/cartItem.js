const pool = require('../config/db')

const getCartItems = async (data) => {
    const { cartId } = data;
    const connection = await pool.getConnection();
    try {
        // Start transaction
        await connection.beginTransaction();

        // Validate that the cart exists
        const [cartRows] = await connection.query(
            `
            SELECT id FROM carts WHERE id = ?;
            `,
            [cartId]
        );

        if (!cartRows.length) {
            throw new Error('Cart not found');
        }

        // Fetch all items in the cart
        const [items] = await connection.query(
            `
            SELECT 
                cpj.cart_id,
                cpj.product_id,
                cpj.quantity,
                p.name AS name,
                p.price AS price,
                (cpj.quantity * p.price) AS total_cost,
                p.stock AS stock
            FROM carts_products_junction cpj
            INNER JOIN products p ON cpj.product_id = p.id
            WHERE cpj.cart_id = ?;
            `,
            [cartId]
        );

        // Commit transaction
        await connection.commit();

        return items;
    } catch (error) {
        // Rollback transaction on error
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const createCartItem = async (data) => {
    const connection = await pool.getConnection();
    const { cartId, productId, quantity } = data;
    try {
        await connection.beginTransaction();

        // Step 1: Check product stock availability
        const [productStock] = await connection.query(
            `SELECT stock 
             FROM products 
             WHERE id = ?`,
            [productId]
        );

        if (!productStock.length) {
            throw new Error(`Product with ID ${productId} does not exist in stock`);
        }

        const currentStock = productStock[0].stock;

        if (quantity > currentStock) {
            throw new Error(
                `Requested quantity (${quantity}) exceeds available stock (${currentStock})`
            );
        }

        // Step 2: Add product to cart
        await connection.query(
            `INSERT INTO carts_products_junction (cart_id, product_id, quantity)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
            [cartId, productId, quantity]
        );

        // Step 3: Update product stock
        const updatedStock = currentStock - quantity;
        await connection.query(
            `UPDATE products 
             SET stock = ? 
             WHERE id = ?`,
            [updatedStock, productId]
        );

        await connection.commit();
        return { cartId, productId, quantity, updatedStock };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }

}
const getCartItem = async (data) => {
    const { cartId, productId } = data;
    const connection = await pool.getConnection();
    try {
        // Start transaction
        await connection.beginTransaction();

        // Validate that the cart exists
        const [cartRows] = await connection.query(
            `
            SELECT id FROM carts WHERE id = ?;
            `,
            [cartId]
        );

        if (!cartRows.length) {
            throw new Error('Cart not found');
        }
        // Validate that the product exists
        const [productRows] = await connection.query(
            `
            SELECT id FROM products WHERE id = ?;
            `,
            [productId]
        );
        if (!productRows.length) {
            throw new Error('Product not found');
        }
        // Fetch the specific item in the cart
        const [rows] = await connection.query(
            `
            SELECT 
                cpj.cart_id,
                cpj.product_id,
                cpj.quantity,
                p.name AS name,
                p.price AS price,
                (cpj.quantity * p.price) AS total_cost,
                p.stock AS stock
            FROM carts_products_junction cpj
            INNER JOIN products p ON cpj.product_id = p.id
            WHERE cpj.cart_id = ? AND cpj.product_id = ?;
            `,
            [cartId, productId]
        );

        // Commit transaction
        await connection.commit();

        return rows[0] || null;
    } catch (error) {
        // Rollback transaction on error
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
const updateCartItemQuantity = async (data) => {
    const connection = await pool.getConnection();
    const { cartId, productId } = data;
    const newQuantity = data.quantity
    try {
        await connection.beginTransaction();

        // Step 1: Get the current quantity of the product in the cart
        const [cartItem] = await connection.query(
            `SELECT quantity 
                 FROM carts_products_junction 
                 WHERE cart_id = ? AND product_id = ?`,
            [cartId, productId]
        );

        if (!cartItem.length) {
            throw new Error(
                `Product with ID ${productId} not found in cart ${cartId}`
            );
        }

        const currentCartQuantity = cartItem[0].quantity;

        // Step 2: Check stock availability
        const [productStock] = await connection.query(
            `SELECT stock 
                 FROM products 
                 WHERE id = ?`,
            [productId]
        );

        if (!productStock.length) {
            throw new Error(`Product with ID ${productId} does not exist in stock`);
        }

        const currentStock = productStock[0].stock;

        // Calculate the total available stock (stock + current cart quantity)
        const totalAvailableStock = currentStock + currentCartQuantity;

        if (newQuantity > totalAvailableStock) {
            throw new Error(
                `Requested quantity (${newQuantity}) exceeds available stock (${totalAvailableStock})`
            );
        }

        // Step 3: Update the quantity in the cart
        await connection.query(
            `UPDATE carts_products_junction 
                 SET quantity = ? 
                 WHERE cart_id = ? AND product_id = ?`,
            [newQuantity, cartId, productId]
        );

        // Step 4: Update the product stock
        const updatedStock = totalAvailableStock - newQuantity;
        await connection.query(
            `UPDATE products 
                 SET stock = ? 
                 WHERE id = ?`,
            [updatedStock, productId]
        );

        await connection.commit(); // Commit the transaction
        return { cartId, productId, newQuantity, updatedStock };
    } catch (error) {
        await connection.rollback(); // Rollback the transaction on error
        throw error;
    } finally {
        connection.release(); // Release the connection
    }
}
const deleteCartItem = async (data) => {
    const connection = await pool.getConnection();
    const { cartId, productId } = data;
    try {
        await connection.beginTransaction();

        // Step 1: Get the current quantity of the product in the cart
        const [cartItem] = await connection.query(
            `SELECT quantity 
             FROM carts_products_junction 
             WHERE cart_id = ? AND product_id = ?`,
            [cartId, productId]
        );

        if (!cartItem.length) {
            throw new Error(
                `Product with ID ${productId} not found in cart ${cartId}`
            );
        }

        const currentCartQuantity = cartItem[0].quantity;

        // Step 2: Remove the product from the cart
        await connection.query(
            `DELETE FROM carts_products_junction 
             WHERE cart_id = ? AND product_id = ?`,
            [cartId, productId]
        );

        // Step 3: Update the product stock
        const [productStock] = await connection.query(
            `SELECT stock 
             FROM products 
             WHERE id = ?`,
            [productId]
        );

        if (!productStock.length) {
            throw new Error(`Product with ID ${productId} does not exist in stock`);
        }

        const updatedStock = productStock[0].stock + currentCartQuantity;
        await connection.query(
            `UPDATE products 
             SET stock = ? 
             WHERE id = ?`,
            [updatedStock, productId]
        );

        await connection.commit();
        return { cartId, productId, removedQuantity: currentCartQuantity, updatedStock };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
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