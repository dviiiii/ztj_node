// controller/user.js
const {queryPassword, PASSWORD, test_temp, test_temp1} = require('../api/login');
const jwt = require('jsonwebtoken');

module.exports = {
    async login (ctx) {
        const key = 'ztj_';
        let userName = ctx.request.body.userName;
        let password = ctx.request.body.password;

        let dbPassword = await queryPassword(userName);
        let userPassword = await PASSWORD(key + password);

        if(dbPassword.length === 0) {
            ctx.body = {
                status: '1',
                msg: '用户名密码错误！'
            }
        }else if(dbPassword[0].user_password === userPassword[0].user_password) {
            const token = jwt.sign({
                userName
            }, 'xyk_yplrm', { expiresIn: '2h' });

            ctx.body = {
                status: '0',
                msg: '登录成功！',
                token
            }
        }else {
            ctx.body = {
                status: '1',
                msg: '用户名密码错误！'
            }
        }
    },
    async getUserInfo (ctx) {
        let token = ctx.query.token;
        let decoded = jwt.decode(token, 'xyk_yplrm');
        if(token) {
            if(decoded.exp <= new Date()/1000){
                ctx.status = 401;
                ctx.body = {
                    message: 'token过期'
                };
            }else{
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
            }
        }
    },

    async testtemp (ctx) {
        let test = await test_temp();
        console.log(test);
        ctx.body = {
            status: '0',
            data: test
        }
    },

    async testtemp1 (ctx) {
        let test = await test_temp1();
        console.log(test);
        ctx.body = {
            status: '1',
            data: test
        }
    },
};