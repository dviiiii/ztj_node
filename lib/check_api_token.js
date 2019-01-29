/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

const jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要
// 检查用户会话
module.exports = {
    async verify(ctx, next) {
        console.log('检查post的信息或者url查询参数或者头信息');
        const req = ctx.req;
        const res = ctx.res;
        //检查post的信息或者url查询参数或者头信息
        const token = req.headers['x-access-token'];
        // const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // 解析 token
        if (token) {
            // 确认token
            await jwt.verify(token, 'xyk_yplrm', async function(err, decoded) {
                if (err) {
                    ctx.status = 401;
                    ctx.body = { success: false, message: 'token信息错误.' };
                } else {
                    // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                    req.api_user = decoded;
                    console.dir(req.api_user);
                    await next();
                }
            });
        } else {
            // 如果没有token，则返回错误
            return res.status(401).send({
                success: false,
                message: '没有提供token！'
            });
        }
    }
}
