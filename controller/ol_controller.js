// controller/ol_controller.js
const ol_api = require('../api/ol_api');

module.exports = {

    //获取已读书籍信息
    async updateRank (ctx) {
        const user_info = ctx.req.api_user;
        let params = ctx.request.body;
        params.user_name = user_info.userName;

        //如果权限没问题，那么交个下一个控制器处理
        try {
            await ol_api.updateRank(params);
            ctx.status = 200;
            ctx.body = {
                status: 0,
                data: '积分更新成功',
            };
        }catch (e) {
            ctx.status = 200;
            ctx.body = {
                status: 1,
                data: '更新积分失败',
            };
        }
    },

    //新增图书
    async getRank (ctx) {
        const user_info = ctx.req.api_user;
        let params = ctx.request.body;
        params.user_name = user_info.userName;


        //如果权限没问题，那么交个下一个控制器处理

        try {
            const data = await ol_api.queryRank(params);
            ctx.status = 200;
            ctx.body = {
                status: 0,
                data: data[0].rank,
            };
        }catch (e) {
            ctx.status = 200;
            ctx.body = {
                status: 1,
                data: '查询失败',
            };
        }
    },
};