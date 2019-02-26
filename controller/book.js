// controller/user.js
const bookApi = require('../api/book');
const jwt = require('jsonwebtoken');
const token_key = 'xyk_yplrm';
const moment = require('moment');

module.exports = {

    //获取已读书籍信息
    async getBookList (ctx) {
        const user_info = ctx.req.api_user;

        //如果权限没问题，那么交个下一个控制器处理
        const bookList = await bookApi.queryBookList(user_info.userName);
        ctx.status = 200;
        ctx.body = {
            data: bookList,
        };
    },

    //新增图书
    async addBook (ctx) {
        const user_info = ctx.req.api_user;
        const params = ctx.request.body;
        params.userName = user_info.userName;


        //如果权限没问题，那么交个下一个控制器处理
        const checkBook = await bookApi.checkBook(params);
        console.log(checkBook)
        if(checkBook.length === 0 ){
            const data = await bookApi.addBook(params);
            ctx.status = 201;
            ctx.body = {
                msg: '新增成功！'
            };
        }else{
            ctx.status = 409;
            ctx.body = {
                msg: '重复书籍！'
            };
        }
    },

    //新增读书记录
    async addReadInfo (ctx) {
        const user_info = ctx.req.api_user;
        const params = ctx.request.body;
        params.userName = user_info.userName;
        params.today = moment().format('YYYY-MM-DD');
        console.log(params)
        const maxPage = params.pagenumber;

        const result = await bookApi.addReadInfo(params);
        const book_reading_info = await bookApi.queryBookReadingInfo(params);
        console.log(result)
        console.log(getProgess(maxPage, book_reading_info))
        await bookApi.updateProgess(params, getProgess(maxPage, book_reading_info));

        ctx.status = 201;
        ctx.body = {
            msg: '添加成功！'
        };

    },

    //删除图书
    async deleteBook (ctx) {
        const user_info = ctx.req.api_user;
        const params = ctx.request.body;
        params.userName = user_info.userName;

        console.log(params)
        const result = await bookApi.deleteBook(params);

        ctx.status = 201;
        ctx.body = {
            msg: '删除成功！'
        };

    },

    //获取复习信息
    async getReviewInfo (ctx) {
        const user_info = ctx.req.api_user;
        const params = ctx.request.body;
        params.userName = user_info.userName;

        const reviewDay = getFullData();
        console.log(reviewDay)
        const data = await bookApi.getReviewInfo(params, reviewDay);

        ctx.status = 200;
        ctx.body = {
            data
        };

    },

    //确认已复习
    async checkReview (ctx) {
        const user_info = ctx.req.api_user;
        const params = ctx.request.body;
        params.userName = user_info.userName;
        const num = params.num;
        //实际间隔天数
        let b_day;
        switch (num) {
            case 0: b_day =1;break;
            case 1: b_day =2;break;
            case 2: b_day =4;break;
            case 3: b_day =7;break;
            case 4: b_day =15;break;
        }

        const formatNow = parseInt((moment()-moment(params.date))/(3600*24*1000));
        //修正天数
        const fixDay = moment(params.date).add(formatNow-b_day, 'd').format('YYYY-MM-DD');

        const data = await bookApi.checkReview(params,fixDay);

        ctx.status = 200;
        ctx.body = {
            data
        };

    },
};

//得到进度
function getProgess(pageNumber, docs) {
    let arr = [];

    for(let i in docs) {
        for(let start = parseInt(docs[i].begin_page), end = parseInt(docs[i].end_page); start <= end; start++) {
            if(!arr[start]) arr[start] = 1;
        }
    }

    const result = arr.filter((x) => { return x === 1 });
    return parseInt(result.length*100/pageNumber);
}

//得到复习时间
function getFullData() {
    const one = moment().add(-1, 'd').format('YYYY-MM-DD');
    const two = moment().add(-2, 'd').format('YYYY-MM-DD');
    const four = moment().add(-4, 'd').format('YYYY-MM-DD');
    const seven = moment().add(-7, 'd').format('YYYY-MM-DD');
    const fifteen = moment().add(-15, 'd').format('YYYY-MM-DD');

    return [one, two, four, seven, fifteen];
}