// router.js

const Router = require('koa-router');
const router = new Router();

const login = require('../controller/login');
const book = require('../controller/book');
const db = require('../controller/db');
const check_api_token = require('../lib/check_api_token');

router.post('/login', login.login); //用户登录
router.get('/userInfo',check_api_token.verify, login.getUserInfo); //获取用户信息

router.get('/online/bookList',check_api_token.verify, book.getBookList); //获取书籍信息

router.get('/login/testtemp', login.testtemp);
router.get('/login/testtemp1', login.testtemp1);



router.post('/db/queryAllTables', db.queryAllTables);
router.post('/db/queryOneTableCol', db.queryOneTableCol);
router.post('/db/queryOneTable', db.queryOneTable);
router.post('/db/toMasking', db.toMasking);

module.exports = router;