// api/ol_api.js
const query = require('../db/mysql');

module.exports = {
    //更新积分
    updateRank(params) {
        return new Promise((resolve, reject) => {
            query('UPDATE ol_user_info SET rank=rank + ? WHERE user_name = ? ;',
                [params.rankVal, params.user_name], function(err,results){
                    if(err){
                        console.log(err);
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

    //查询积分
    queryRank(params) {
        return new Promise((resolve, reject) => {
            query('SELECT rank from ol_user_info WHERE user_name = ?;',
                [params.user_name], function(err,results){
                    if(err){
                        console.log(err);
                        reject(err);
                    }

                    resolve(results);
                });
        });
    },

};