// controller/user.js
const query = require('../db/mysql');

module.exports = {
    //查询实例配置
    queryConfig() {
        return new Promise((resolve, reject) => {
            query('SELECT * from db_config WHERE is_delete = 0', [], function(err,results){
                if(err){
                    reject(err);
                }

                resolve(results);
            });
        });
    },

    //新增实例
    addConfig(params) {
        return new Promise((resolve, reject) => {
            query('INSERT INTO db_config(db_describe, db_name, db_type, db_host, db_user, db_password, db_port, db_sid, db_bk_addr) VALUES(?,?,?,?,?,?,?,?,?)',
                [params.db_describe, params.db_name, params.db_type, params.db_host, params.db_user, params.db_password, params.db_port, params.db_sid, params.db_bk_addr], function(err,results){
                if(err){
                    reject(err);
                }

                resolve(results);
            });
        });
    },

    //删除实例
    removeConfig(params) {
        return new Promise((resolve, reject) => {
            query('update db_config set is_delete=1 where id=?',
                [params.id], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

    //新增备份信息
    addBkLogs(params) {
        return new Promise((resolve, reject) => {
            let sqlStr = '';
            for(let i in params) {
                sqlStr += `('${params[i].db_id}','${params[i].file_name}','${params[i].file_size}','${params[i].create_time}'),`
            }

            sqlStr = sqlStr.slice(0,-1);
            query('INSERT INTO db_bk_log(db_id, file_name, file_size, create_time) VALUES'+sqlStr,
                [params.db_id, params.file_name, params.file_size, params.create_time], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

};