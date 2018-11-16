const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const koaStatic = require('koa-static');
const logger = require('koa-logger');

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

module.exports = app;