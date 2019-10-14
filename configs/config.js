require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "dialectOptions": {
            useUTC: false //for reading from database
        },
        // "timezone": process.env.TIMEZONE
    },
    "test": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "dialectOptions": {
            useUTC: false //for reading from database
        },
        // "timezone": process.env.TIMEZONE
    },
    "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "dialectOptions": {
            useUTC: false //for reading from database
        },
        // "timezone": process.env.TIMEZONE
    }
}
