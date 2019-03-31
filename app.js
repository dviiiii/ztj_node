const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const router = require('./router/router');
const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const koaStatic = require('koa-static');
const logger = require('koa-logger');
const jwt = require('jsonwebtoken');
const schedule = require('./controller/schedule');

//错误处理
onerror(app);

app.use(bodyParser());
app.use(logger());
app.use(json());
app.use(koaStatic(__dirname + '/public'));


// logger日志
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

//启动定时任务
schedule();

// // 错误处理
// app.use((ctx, next) => {
//     return next().catch((err) => {
//         if(err.status === 401){
//             ctx.status = 401;
//             ctx.body = 'Protected resource, use Authorization header to get access\n';
//         }else{
//             throw err;
//         }
//     })
// })



// token 统一认证
// app.use(jwt({
//     secret: 'xyk_yplrm'
// }).unless({
//     path: [/\/login/]
// }));

// let test = [];
// for(let i = 0; i< 100000; i++) {
//     test.push(i)
// }

module.exports = app;