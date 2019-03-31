const schedule = require('node-schedule');
const hqdba = require('./hqdba');


function scheduleCronstyle () {
    //每天早上8点定时任务
    const DATA_STR = '0 0 8 * * *';
    schedule.scheduleJob(DATA_STR,()=>{
        //定时获取备份信息
        hqdba.addBkInfo();
    });
}


module.exports = function () {
    scheduleCronstyle();
};