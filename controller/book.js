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
        };
    },

    //新增图书
    async addBook (ctx) {
        const user_info = ctx.req.api_user;
        const params = ctx.request.body;
        params.userName = user_info.userName;
        console.log(params)

        //如果权限没问题，那么交个下一个控制器处理
        const checkBook = await bookApi.checkBook(params);
        if(checkBook.length === 0 ){
            const data = await bookApi.addBook(params);
            ctx.status = 201;
            ctx.body = {
                msg: '新增成功！'
            };
        }else{
            ctx.status = 409;
            ctx.body = {
                msg: '重复书籍！'
            };
        }
    },
};