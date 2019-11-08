const schedule_controller = require('node-schedule');
/*
*     *     *     *     *     *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ 每周 (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── 月 (1 - 12)
│    │    │    └────────── 每月 (1 - 31)
│    │    └─────────────── 小时 (0 - 23)
│    └──────────────────── 分钟 (0 - 59)
└───────────────────────── 秒 (0 - 59, OPTIONAL)
*/
function scheduleCronstyle () {
    //每天早上8点定时任务
    const DATA_STR = '0 0 8 * * *';
    schedule_controller.scheduleJob(DATA_STR,()=>{
        //定时获取备份信息

    });
}


module.exports = function () {
    scheduleCronstyle();
};