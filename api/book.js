// controller/user.js
const query = require('../db/mysql');

module.exports = {
    queryBookList(userName) {
        return new Promise((resolve, reject) => {
            query('select * from ol_book_info where username = ? AND isdelete = 0', [userName], function(err,results){
                if(err){
                    reject(err);
                }

                resolve(results);
            });
        });
    },

};