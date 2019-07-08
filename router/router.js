// router.js

const Router = require('koa-router');
const router = new Router();

const login = require('../controller/login_controller');
const book_controller = require('../controller/book_controller');
const ol_controller = require('../controller/ol_controller');

const check_api_token = require('../lib/check_api_token');

router.post('/login', login.login); //用户登录
router.get('/userInfo',check_api_token.verify, login.getUserInfo); //获取用户信息

//不如读书模块
router.post('/book/addbook',check_api_token.verify, book_controller.addBook); //新增图书
router.post('/book/readInfo',check_api_token.verify, book_controller.addReadInfo); //新增读书记录
router.post('/book/deleteBook',check_api_token.verify, book_controller.deleteBook); //删除图书
router.post('/book/checkReview',check_api_token.verify, book_controller.checkReview); //确认已复习
router.get('/book/bookList',check_api_token.verify, book_controller.getBookList); //获取书籍信息
router.get('/book/getReviewInfo',check_api_token.verify, book_controller.getReviewInfo); //获取复习信息

router.get('/ol/getRank',check_api_token.verify, ol_controller.getRank); //获取复习信息
router.post('/ol/updateRank',check_api_token.verify, ol_controller.updateRank); //获取复习信息

module.exports = router;