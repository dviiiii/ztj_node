const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const router = require('./router');
const bodyParser = require('koa-bodyparser');


app.use(bodyParser());
app.use(json());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);