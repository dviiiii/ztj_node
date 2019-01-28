// router.js

const Router = require('koa-router');
const router = new Router();

const login = require('../controller/login');
const db = require('../controller/db');

router.post('/login', login.login); //用户登录
router.get('/userInfo', login.getUserInfo); //获取用户信息



router.get('/login/testtemp', login.testtemp);
router.get('/login/testtemp1', login.testtemp1);



router.post('/db/queryAllTables', db.queryAllTables);
router.post('/db/queryOneTableCol', db.queryOneTableCol);
router.post('/db/queryOneTable', db.queryOneTable);
router.post('/db/toMasking', db.toMasking);

module.exports = router;