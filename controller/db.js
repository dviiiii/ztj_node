
const querytemp = require('../db/mysql-temp');


function mobileMask(tableName, tableCol) {
    return new Promise((resolve, reject) => {
        querytemp("select distinct " + tableCol +" from " + tableName, [], function(err,results){
            if(err){
                reject(err);
            }
            // console.log(results)
            for(let i in results) {
                console.log(results[i])
                let newNum = parseInt(results[i][tableCol]) + 1234;
                querytemp("update " + tableName +" set " + tableCol + " =? where " + tableCol + " = ?", [newNum, results[i][tableCol]], function(err,results){
                    console.log(results)
                });
            }

            resolve(results);
        });
    });
}

let cardIdMask = function () {
    console.log(data)
    return new Promise((resolve, reject) => {
        querytemp("show tables", [], function(err,results){
            if(err){
                reject(err);
            }

            resolve(results);
        });
    });
}

let amountMask = function () {
    console.log(data)
    return new Promise((resolve, reject) => {
        querytemp("show tables", [], function(err,results){
            if(err){
                reject(err);
            }

            resolve(results);
        });
    });
}



module.exports = {
    async queryAllTables (ctx) {
        let res = await db_queryAllTables();
        let result = [];
        for(let i in res) {
            for(let j in res[i]) {
                result.push({'tablename': res[i][j]})
            }
        }
        ctx.body = result;
    },

    async queryOneTableCol (ctx) {
        let tablename = ctx.request.body.tablename;
        console.log(tablename)
        let res = await db_queryOneTableCol(tablename);
        // let result = [];
        // for(let i in res) {
        //     for(let j in res[i]) {
        //         result.push({'tablename': res[i][j]})
        //     }
        // }
        ctx.body = res;
    },

    async queryOneTable (ctx) {
        let tablename = ctx.request.body.tablename;
        let res = await db_queryOneTable(tablename);
        ctx.body = res;
    },

    async toMasking (ctx) {
        let tableName = ctx.request.body.tableName;
        let tableCol = ctx.request.body.tableCol;
        let maskType = ctx.request.body.maskType;
        console.log(ctx.request.body)
        // let res;
        //
        // if(maskType === '0') {
        //     res = await mobileMask({tableName,tableCol})
        // }else if(maskType === '1') {
        //     res = await cardIdMask({tableName,tableCol})
        // }
        // else if(maskType === '2') {
        //     res = await amountMask({tableName,tableCol})
        // }
        console.log(tableName)
        console.log(tableCol)
        let res = await mobileMask(tableName,tableCol);

        ctx.body = res;
    },
};


function db_queryAllTables() {
    return new Promise((resolve, reject) => {
        querytemp("show tables", [], function(err,results){
            if(err){
                reject(err);
            }

            resolve(results);
        });
    });
}

function db_queryOneTableCol(tablename) {
    return new Promise((resolve, reject) => {
        querytemp("SHOW COLUMNS FROM " + tablename, [], function(err,results){
            if(err){
                reject(err);
            }

            resolve(results);
        });
    });
}

function db_queryOneTable(tablename) {
    return new Promise((resolve, reject) => {
        querytemp("select * FROM " + tablename + " limit 1,10", [], function(err,results){
            if(err){
                reject(err);
            }

            resolve(results);
        });
    });
}