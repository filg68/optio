//config.js
/* Created by Fil G on August 25, 2019
   Based on info at https://codingsans.com/blog/node-config-best-practices.
   If ports/names different from defaults set appropriate env value in .env file on your machine.
   !!! Make sure you've added .env to your .gitignore file or we will clobber each other's configuration !!! */

require("dotenv").config();

const env = process.env.NODE_ENV || "dev"; // defaults to dev environment if nothing set
console.log(
    `Configuration loaded for \x1b[32m${env.toUpperCase()}\x1b[0m environment`
);

const production = {
    app: {
        port: parseInt(process.env.PORT) || 3001,
        secretOrKey: process.env.PASSWORD_CRYPTO_KEY,
        samplePassword: process.env.SAMPLE_USER_PWD
    },
    db: {
        host: process.env.REMOTE_DB_HOST,
        name: process.env.REMOTE_DB_NAME,
        userName: process.env.REMOTE_DB_USER,
        pwd: process.env.REMOTE_DB_PWD,
        options: process.env.REMOTE_DB_OTHR,
        type: process.env.REMOTE_DB_TYPE
    }
};

const dev = {
    app: {
        port: parseInt(process.env.PORT) || 3001,
        secretOrKey: process.env.PASSWORD_CRYPTO_KEY,
        samplePassword: process.env.SAMPLE_USER_PWD
    },
    db: {
        host: process.env.DEV_DB_HOST || "localhost",
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || "evergreen_dev",
        type: process.env.DEV_DB_TYPE || "mongodb"
    }
};

const test = {
    app: {
        port: parseInt(process.env.PORT) || 3001,
        secretOrKey: process.env.PASSWORD_CRYPTO_KEY,
        samplePassword: process.env.SAMPLE_USER_PWD
    },
    db: {
        host: process.env.TEST_DB_HOST || "localhost",
        port: parseInt(process.env.TEST_DB_PORT) || 27017,
        name: process.env.TEST_DB_NAME || "evergreen_test",
        type: process.env.TEST_DB_TYPE || "mongodb"
    }
};

const config = {
    production,
    dev,
    test
};

module.exports = config[env];
