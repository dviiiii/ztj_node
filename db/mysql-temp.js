'use strict';

const mysql = require('mysql');
const config = require('../config/mysql-config');

const db = mysql.createPool(config);
console.log('数据连接成功');

const query=function(sql,options,callback){
    db.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,options,function(err,results,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err,results,fields);
            });
        }
    });
};

// query("select * from loginusers where uId = ?", ['sysadmin'], function(err,results,fields){
//     //do something
//     console.log(err);
//     console.log('--------------');
//     console.log(results);
//
//
// });

module.exports = query;