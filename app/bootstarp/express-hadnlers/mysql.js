module.exports = session=>{
    var MySQLStore = require('express-mysql-session')(session);

    var options = {
        host : process.env.MYSQL_HOST,
        port:process.env.MYSQL_PORT,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASSWORD,
        charset: process.env.MYSQL_CHARSET,
        database:process.env.MYSQL_DATABASE,
        clearExpired: true
     };
     return new MySQLStore(options)
}