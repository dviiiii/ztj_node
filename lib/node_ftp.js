const Client = require('node-ftp');
const {ftp_config} = require('../config/config');
const moment = require('moment');
const hqdbaApi = require('../api/hqdba');

// 检查用户会话
module.exports = {
    async getAll(bk_info) {

        const fdate = moment().add(-1, 'days');
        // const fdate = moment();
        console.log(fdate)

        const c = new Client();
        c.on('ready', () => {
            console.log('ready');


            for(let i in bk_info) {
                console.log(bk_info[i]);
                //进入目录
                c.cwd(bk_info[i].db_bk_addr,(err, res)=>{
                    console.log(res)
                });

                //查看目录里文件
                c.list(function (err, list) {
                    if (err) throw err;

                    let now_bk_info = bk_info[i];
                    let data = [];
                    // console.log(list)
                    for(let i in list) {
                        if(list[i].date > fdate) {
                            // console.log(now_bk_info)
                            data.push({db_id: now_bk_info.id, file_name: list[i].name, file_size:list[i].size, create_time: moment(list[i].date).format('YYYY-MM-DD HH:mm:ss')})
                        }
                    }
                    //将备份信息插入到数据库
                    if(data.length !== 0) hqdbaApi.addBkLogs(data);

                    // data.push({pwd: bk_addr[i].addr, list: list});
                    // console.log(data)
                    c.end()
                    // list.forEach(function (element, index, array) {
                        // console.log(element.name)
                        // //Ignore directories
                        // if (element.type === 'd') {
                        //     console.log('ignoring directory ' + element.name);
                        //     return;
                        // }
                        // //Ignore non zips
                        // if (path.extname(element.name) !== '.zip') {
                        //     console.log('ignoring file ' + element.name);
                        //     return;
                        // }
                        // //Download files
                        // c.get(element.name, function (err, stream) {
                        //     if (err) throw err;
                        //     stream.once('close', function () {
                        //         c.end();
                        //     });
                        //     stream.pipe(fs.createWriteStream(element.name));
                        // });
                    // });
                });

            }


        });

        c.connect(ftp_config);

    }
}
