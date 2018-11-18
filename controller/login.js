// controller/user.js
const {queryPassword, PASSWORD} = require('../api/login');

module.exports = {
    async login (ctx) {
        let userName = ctx.request.body.userName;
        let password = ctx.request.body.password;

        let dbPassword = await queryPassword(userName);
        let userPassword = await PASSWORD(password);


        if(dbPassword.length === 0) {
            ctx.body = {
                status: '1',
                msg: '用户名密码错误！'
            }
        }else if(dbPassword.userpw === userPassword.userpw) {
            ctx.body = {
                status: '0',
                msg: '登录成功！'
            }
        }else {
            ctx.body = {
                status: '1',
                msg: '用户名密码错误！'
            }
        }
     },
};