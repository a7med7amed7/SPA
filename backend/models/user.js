const pool = require('../config/db');

const getAllUsers = async (callback) => {
    try {
        const [result] = await pool.query(
            `SELECT id,username,email,password FROM users;`,
            []
        );
        return result;
    } catch (error) {
        throw error;
    }
};
const createUser = async (data) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO users(username,email,password) VALUES (?, ?, ?);`,
            [data.username, data.email, data.password]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

const getUser = async (id) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM users WHERE id=?;`,
            [id]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, data) => {
    try {
        const [result] = await pool.query(
            `UPDATE users SET username=?, email=?, password=? WHERE id=?;`,
            [data.username, data.email, data.password, id]
        );
        return result;
    } catch (error) {
        console.log(error)
        throw error;
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