import getConnectionMysql from "../configs/mysql.config";


// Qeury has arguments
async function queryArgument(sql, ...rest) {
    try {
        const conn = await getConnectionMysql();
        const res = await conn.query(sql, [...rest])
        await conn.end();
        return res[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

// Query has no arguments.
async function queryNoArgument(sql) {
    try {
        const conn = await getConnectionMysql();
        const res = await conn.query(sql);
        await conn.end();
        return res[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

export {
    queryArgument,
    queryNoArgument
}