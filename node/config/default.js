module.exports = {
    port: 1104,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/myblog',
    mysql: {
        host: 'localhost',
        port: 3306,
        database: "node_mysql",
        user: 'root',
        password: 'root'
    },
    mysql_pool: {
        host: 'localhost',
        port: 3306,
        database: "node_mysql",
        user: 'root',
        password: 'root'
    }
};
