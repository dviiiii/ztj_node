const query = require('../db/mysql');
const ftp = require('../lib/node_ftp');
const hqdbaApi = require('../api/hqdba');
const node_ftp = require('../lib/node_ftp');


module.exports = {
    async ftptest (ctx) {
        await ftp.getAll();
        ctx.body = [];
    },

    async queryConfig(ctx) {
        const user_info = ctx.req.api_user;

        //如果权限没问题，那么交个下一个控制器处理
        const dbConfig = await hqdbaApi.queryConfig();
        ctx.status = 200;
        ctx.body = {
            data: dbConfig,
        };
    },

    async addConfig(ctx) {
        const user_info = ctx.req.api_user;
        const params = ctx.request.body;

        //如果权限没问题，那么交个下一个控制器处理
        const status = await hqdbaApi.addConfig(params);
        ctx.status = 200;
        ctx.body = {
            msg: status,
        };
    },

    async removeConfig(ctx) {
        const user_info = ctx.req.api_user;
        const params = ctx.request.body;

        //如果权限没问题，那么交个下一个控制器处理
        const status = await hqdbaApi.removeConfig(params);
        ctx.status = 200;
        ctx.body = {
            msg: status,
        };
    },

    async queryBkInfo(ctx) {
        const user_info = ctx.req.api_user;

        //如果权限没问题，那么交个下一个控制器处理
        const dbConfig = await hqdbaApi.queryConfig();
        let bk_info = [];
        for(let i in dbConfig) {
            if(dbConfig[i].db_bk_addr) bk_info.push(dbConfig[i])
        }

        const data = await node_ftp.getAll(bk_info);
        ctx.status = 200;
        ctx.body = {
            data: data,
        };
    },
};