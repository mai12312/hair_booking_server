
import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

/**
 * Connect mysql2 with create connection
 */
async function getConnectionMysql() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.HOST_MYSQL,
            user: process.env.USER_MYSQL,
            password: process.env.PASSWORD_MYSQL,
            port: process.env.PORT_MYSQL,
            database: process.env.DATABASE_MYSQL,
            insecureAuth: true
        })
        console.log("Connect mysql ok!");
        return conn;
    } catch (error) {
        console.error('Connect database mysql failed', error);
    }
}

export default getConnectionMysql;