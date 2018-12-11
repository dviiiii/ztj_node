// router.js

const Router = require('koa-router');
const router = new Router();

const login = require('../controller/login');
const db = require('../controller/db');

router.get('/login/getUserInfo', login.getUserInfo);

router.post('/login', login.login);

router.get('/login/testtemp', login.testtemp);
router.get('/login/testtemp1', login.testtemp1);



router.post('/db/queryAllTables', db.queryAllTables);
router.post('/db/queryOneTableCol', db.queryOneTableCol);
router.post('/db/queryOneTable', db.queryOneTable);
router.post('/db/toMasking', db.toMasking);

module.exports = router;