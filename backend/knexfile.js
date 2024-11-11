// knexfile.js

module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host: "mysql",  // Docker service name
            user: "root",
            password: "rootpassword",  // Replace with your MySQL root password
            database: "testdb" // Replace with your database name
        },
        migrations: {
            directory: "./migrations"
        },
        seeds: {
            directory: "./seeds"
        }
    },

    production: {
        client: "mysql2",
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        },
        migrations: {
            directory: "./migrations"
        },
        seeds: {
            directory: "./seeds"
        }
    }
};
