const Client = require('node-ftp');
const {ftp_config} = require('../config/config');


// 检查用户会话
module.exports = {
    async getAll() {
        console.log(ftp_config)
        const c = new Client();
        c.on('ready', () => {
            console.log('ready');
            c.cwd('/BF/mysqldb_bakcup_test/172.20.11.37',(err, res)=>{
                console.log(res)
            });
            c.list(function (err, list) {
                if (err) throw err;
                console.dir(list)
                c.end()
                list.forEach(function (element, index, array) {
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
                });
            });
        })

        c.connect(ftp_config);
    }
}
