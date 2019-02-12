const query = require('../db/mysql');
const ftp = require('../lib/node_ftp');


module.exports = {
    async ftptest (ctx) {
        await ftp.getAll();
        ctx.body = [];
    },
};