const fs = require('fs');
let insertSql = `INSERT into tb_zsyj(HQ_COMPANY_NAME, HQ_DEPARTMENT, HQ_OPERATOR, 
HQ_CONTRACT_TIME, HQ_CONTRACT_PARTY, HQ_OLDCODE, HQ_BUNK_TYPE,
HQ_BUNK_GRADE, HQ_AREA, HQ_RENT, HQ_TASK_NUMBERS, HQ_ACCOMPLISH_NUMBERS,
HQ_BONUS, HQ_IS_OBN) VALUES `
fs.writeFile('./message.txt', insertSql + '\n',{ 'flag': 'a' },function(err){
  if(err) console.log('写文件操作失败');
  // else console.log('写文件操作成功');
});

let gs = ['1056', '1058'];
let bm = ['招商部', '财务部'];
let zsjbr = ['钱多多', '孙小小', '赵大大', '李少少'];
// let qysj = ['2016/1/1','2016/2/1','2016/3/1','2016/4/1','2016/5/1','2016/6/1','2016/7/1','2016/8/1','2016/9/1','2016/10/1','2016/11/1','2016/12/1','2017/1/1','2017/2/1','2017/3/1','2017/4/1','2017/5/1','2017/6/1','2017/7/1','2017/8/1','2017/9/1','2017/10/1','2017/11/1','2017/12/1','2018/1/1','2018/2/1','2018/3/1','2018/4/1','2018/5/1','2018/6/1','2018/7/1','2018/8/1','2018/9/1','2018/10/1','2018/11/1','2018/12/1','2019/1/1','2019/2/1','2019/3/1','2019/4/1','2019/5/1','2019/6/1','2019/7/1','2019/8/1','2019/9/1','2019/10/1'];
let qysj = ['2019/11/1','2019/12/1' ];
let qyf = ['新东方', '蓝翔', '北大青鸟', '深圳XXX'];
let pw = ['A006,铺位,A,20,2250', 'A007,铺位,B,15,1550','A008,铺位,C,10,1150','A009,铺位,S,30,8150','A010,铺位,SS,40,11150'];
let ggw = ['B004,广告位,A,0,330','B005,广告位,A,0,220','B006,场地,A,,660'];
let rws = ['4,2', '4,3', '4,4', '4,5'];

let checkObj = {};

function getData() {
  let str = '';
  str += getRandomStr(gs);
  str += ',' + getRandomStr(bm);
  str += ',' + getRandomStr(zsjbr);
  str += ',' + getRandomStr(qysj);
  if(checkObj[str]) {
    return false;
  }else {
    checkObj[str] = 1
  }

  str += ',' + getRandomStr(qyf);

  let rwsStr = getRandomStr(rws);
  let num = parseInt(rwsStr.split(',')[1]);

  for(let i = 0; i < num+1; i++) {
    let resultStr = str;
    if(i<num) {
      resultStr += ',' + pw[i] + ',' + rwsStr;

      if(num === 5) {
        resultStr += ',' + '1115'
      }else {
        resultStr += ',' + '0'
      }


      if(Math.floor(Math.random()*10) > 8) {
        resultStr += ',' + '是'
      }else {
        resultStr += ',' + '否'
      }
    }else {
      resultStr += ',' + getRandomStr(ggw) + ',' + '0,0';
      resultStr += ',' + parseInt(getRandomStr(ggw).split(',')[4])*0.1;

      if(Math.floor(Math.random()*10) > 8) {
        resultStr += ',' + '是'
      }else {
        resultStr += ',' + '否'
      }
    }

    // let resultArr = [];
    // resultStr.split(',').map((val) => {
    //   resultArr.push("'" + val + "'")
    // });
    //
    // let result = '(' + resultArr.join(',') + '),';

    fs.writeFile('./message.txt', resultStr + '\n',{ 'flag': 'a' },function(err){
      if(err) console.log('写文件操作失败');
      // else console.log('写文件操作成功');
    });
  }


}

function getRandomStr(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

for(let i = 0; i < 10000; i++) {
  getData();
}
