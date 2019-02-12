// router.js

const Router = require('koa-router');
const router = new Router();

const login = require('../controller/login');
const book = require('../controller/book');
const db = require('../controller/db');
const db_backup = require('../controller/db_backup');
const check_api_token = require('../lib/check_api_token');

router.post('/login', login.login); //用户登录
router.get('/userInfo',check_api_token.verify, login.getUserInfo); //获取用户信息

router.post('/online/book',check_api_token.verify, book.addBook); //新增图书
router.post('/online/readInfo',check_api_token.verify, book.addReadInfo); //新增读书记录
router.post('/online/deleteBook',check_api_token.verify, book.deleteBook); //删除图书
router.post('/online/checkReview',check_api_token.verify, book.checkReview); //确认已复习
router.get('/online/bookList',check_api_token.verify, book.getBookList); //获取书籍信息
router.get('/online/getReviewInfo',check_api_token.verify, book.getReviewInfo); //获取复习信息

router.get('/ftptest', db_backup.ftptest);

router.get('/login/testtemp', login.testtemp);
router.get('/login/testtemp1', login.testtemp1);



router.post('/db/queryAllTables', db.queryAllTables);
router.post('/db/queryOneTableCol', db.queryOneTableCol);
router.post('/db/queryOneTable', db.queryOneTable);
router.post('/db/toMasking', db.toMasking);

module.exports = router;