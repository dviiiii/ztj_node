// controller/user.js
const query = require('../db/mysql');
const querytemp = require('../db/mysql-temp');

module.exports = {
    queryPassword(username) {
        return new Promise((resolve, reject) => {
            query("SELECT `userpw` FROM `hqdba_user` WHERE username=?", [username], function(err,results){
                if(err){
                    reject(err);
                }

                resolve(results);
            });
        });
    },

    PASSWORD(password) {
        return new Promise((resolve, reject) => {
            query("select PASSWORD(?) as userpw", [password], function(err,results){
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