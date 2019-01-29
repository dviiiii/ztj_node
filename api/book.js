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

    addBook(params) {
        return new Promise((resolve, reject) => {
            query('insert into ol_book_info(username, bookname, booknumber, readtype) values(?,?,?,?)',
                [params.userName, params.bookName, params.bookNumber, params.readType], function(err,results){
                if(err){
                    reject(err);
                }

                resolve(results);
            });
        });
    },

    checkBook(params) {
        return new Promise((resolve, reject) => {
            query('select id from ol_book_info where username=? and bookname=? and isdelete="0"',
                [params.userName, params.bookName], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

};