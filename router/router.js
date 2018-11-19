// router.js

const Router = require('koa-router');
const router = new Router();

const login = require('../controller/login');

router.get('/login/getUserInfo', login.getUserInfo);

router.post('/login', login.login);


module.exports = router;