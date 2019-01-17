// controller/user.js
const query = require('../db/mysql');
const querytemp = require('../db/mysql-temp');

module.exports = {
    queryPassword(username, key_password) {
        return new Promise((resolve, reject) => {
            query("select if(PASSWORD(?)=user_password,1,0) as p FROM system_user WHERE user_name=?;", [key_password, username], function(err,results){
                if(err){
                    reject(err);
                }

                resolve(results);
            });
        });
    },

    PASSWORD(password) {
        return new Promise((resolve, reject) => {
            query("select PASSWORD(?) as user_password", [password], function(err,results){
                if(err){
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    test_temp() {
        return new Promise((resolve, reject) => {
            querytemp("select * from post_info",[], function(err,results){
                if(err){
                    reject(err);
                }
                resolve(results);
            });
        });
    },

    test_temp1() {
        return new Promise((resolve, reject) => {
            query("select * from hqdba_user",[], function(err,results){
                if(err){
                    reject(err);
                }
                resolve(results);
            });
        });
    },

};