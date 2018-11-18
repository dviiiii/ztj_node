// controller/user.js
const query = require('../db/mysql');

module.exports = {
    queryPassword(username) {
        return new Promise((resolve, reject) => {
            query("SELECT `userpw` FROM `user` WHERE username=?", [username], function(err,results){
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

};