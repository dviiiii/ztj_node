// controller/user.js
const {queryPassword, PASSWORD} = require('../api/login_api');
const jwt = require('jsonwebtoken');
const token_key = 'xyk_yplrm';

module.exports = {
    async login (ctx) {
        const key = 'ztj_';
        const userName = ctx.request.body.userName;
        const password = ctx.request.body.password;
        const key_password = key + password;

        const checkPassword = await queryPassword(userName, key_password);

        // let userPassword = await PASSWORD(key + password);
        if(checkPassword.length === 0 || checkPassword[0].p === 0) {
            ctx.status = 401
            ctx.body = {
                msg: '用户名密码错误！'
            }
        } else {
            const token = jwt.sign({
                userName
            }, token_key, { expiresIn: '2h' });

            ctx.status = 201
            ctx.body = {
                msg: '登录成功！',
                token
            }
        }
    },
    async getUserInfo (ctx) {

        //假数据
        //如果权限没问题，那么交个下一个控制器处理
        ctx.body = {
            status: '0',
            data: {
                name: 'super_admin',
                user_id: '1',
                access: ['super_admin', 'admin'],
                avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
            }
        }


    },
};