// controller/user.js
const query = require('../db/mysql');

module.exports = {
    queryBookList(userName) {
        return new Promise((resolve, reject) => {
            query('select * from ol_book_info where user_name = ? AND is_delete = 0', [userName], function(err,results){
                if(err){
                    reject(err);
                }

                resolve(results);
            });
        });
    },

    addBook(params) {
        return new Promise((resolve, reject) => {
            query('insert into ol_book_info(user_name, book_name, book_number, read_type) values(?,?,?,?)',
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
            query('select id from ol_book_info where user_name=? and book_name=? and is_delete="0"',
                [params.userName, params.bookName], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

    //新增读书记录
    addReadInfo(params) {
        return new Promise((resolve, reject) => {
            query('insert into ol_book_reading(book_id, begin_page, end_page,create_date) values(?,?,?,?)',
                [params.bookid, params.bookPageNumberS, params.bookPageNumberE, params.today], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

    //查询某本书的读书记录
    queryBookReadingInfo(params) {
        return new Promise((resolve, reject) => {
            query('select begin_page,end_page from ol_book_reading where book_id=? and is_delete=0',
                [params.bookid], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

    //更新读书进度
    updateProgess(params, num) {
        return new Promise((resolve, reject) => {
            query('update ol_book_info set book_status=? where id=?',
                [num,params.bookid], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

    //删除图书
    deleteBook(params) {
        return new Promise((resolve, reject) => {
            query('update ol_book_info set is_delete=1 where id=?',
                [params.id], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

    //获取复习信息
    getReviewInfo(params, reviewDaY) {
        return new Promise((resolve, reject) => {
            query(`select b.id, a.book_name,b.begin_page,b.end_page,b.create_date,b.review_num from ol_book_info a LEFT JOIN ol_book_reading b ON a.id = b.book_id 
                    WHERE a.user_name=? 
                    and a.is_delete = '0'
                    and a.read_type='0' 
                    and (b.review_num = '0' and b.create_date <= ?)
                    or (b.review_num = '1' and b.create_date <= ?)
                    or (b.review_num = '2' and b.create_date <= ?)
                    or (b.review_num = '3' and b.create_date <= ?)
                    or (b.review_num = '4' and b.create_date <= ?)`,
                [params.userName, reviewDaY[0],reviewDaY[1],reviewDaY[2],reviewDaY[3],reviewDaY[4],], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

    //获取复习信息
    checkReview(params,fixDay) {
        return new Promise((resolve, reject) => {
            query(`UPDATE ol_book_reading SET review_num = review_num+1,create_date=? WHERE id = ?`,
                [fixDay, params.id], function(err,results){
                    if(err){
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

};