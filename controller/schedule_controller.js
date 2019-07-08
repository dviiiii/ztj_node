const schedule_controller = require('node-schedule');



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