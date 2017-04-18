module.exports = {
    port: 3000,
    origin: "http://127.0.0.1:3000",
    publicPath: '/1104',//后台静态资源存储区
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
