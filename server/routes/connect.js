// 数据库连接
var mysql = require('mysql');

//创建连接池
var poll = mysql.createPool({
    host: '120.79.220.248',
    port: '3306',
    user: 'root',
    password: 'Fuyf961010',
    database: 'landlord'
});



/** 
 * Promise 封装 连接池 查询 方法
 * @param {string}  sql  sql查询语句
 * @param {Array}  param sql查询语句 携带参数  如insert时  可不传 默认false
 * @Fuyf 2019/01/16
 * */ 

function sqlQuery(sql, param = false, callBack) {
    return new Promise((reslove, reject) => {
        poll.getConnection((error, conn) => {//连接池建立连接
            if (error) {
                console.log("databases connect error", error)
                return reject({ msg: '连接失败！', err: err });
            } else {
                conn.query(sql, param, (err, result) => {
                    conn.release();// 释放连接池的连接  
                    if (err) reject({ msg: '查询失败！', err: err });
                    reslove(result);
                });
            }
        });
        
    });
}

module.exports = {
    sqlQuery
}

