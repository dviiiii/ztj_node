const nodemailer = require('nodemailer');

module.exports = {
    sendInfo (params) {
        const transporter = nodemailer.createTransport({
            service: '163',
            auth: {
                user: 'dviiiii931245@163.com',
                pass: 'foryou931245wei' //授权码,通过邮箱获取

            }
        });

        const mailOptions = {
            from: 'dviiiii931245@163.com', // 发送者
            to: '913284195@qq.com', // 接受者,可以同时发送多个,以逗号隔开
            subject: params.subject, // 标题
            text: params.text, // 文本
            html: params.html
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('邮件发送成功');
        });
    }
};