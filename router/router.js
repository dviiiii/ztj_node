// router.js

const Router = require('koa-router');
const router = new Router();

const login = require('../controller/login');
const db = require('../controller/db');

router.get('/login/getUserInfo', login.getUserInfo);

router.post('/login', login.login);

router.get('/login/testtemp', login.testtemp);
router.get('/login/testtemp1', login.testtemp1);



router.post('/db/queryalltables', db.queryAllTables);
router.post('/db/queryonetablecol', db.queryOneTableCol);
router.post('/db/queryonetable', db.queryOneTable);
router.post('/db/tomasking', db.toMasking);

module.exports = router;