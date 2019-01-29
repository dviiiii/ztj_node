// controller/user.js
const bookApi = require('../api/book');
const jwt = require('jsonwebtoken');
const token_key = 'xyk_yplrm';

module.exports = {

    //获取已读书籍信息
    async getBookList (ctx) {
        const user_info = ctx.req.api_user;

        //如果权限没问题，那么交个下一个控制器处理
        const bookList = await bookApi.queryBookList(user_info.userName);
        ctx.status = 200;
        ctx.body = {
            data: bookList,
            status: 200
        };

    },
};