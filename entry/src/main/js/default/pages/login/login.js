import prompt from '@system.prompt';
import router from '@system.router';
import http from '@ohos.net.http';

export default {
    data: {
        title: "",
        name: "",
        pass: "",
        isMine: false
    },

    changeName(e) {
        console.log(JSON.stringify(e));
        this.name = e.text;
    },

    changePass(e) {
        console.log(JSON.stringify(e));
        this.pass = e.text;
    },

    login() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forelogin', {
            method: http.RequestMethod.POST,
            header: {
                'Content-Type': 'application/json'
            },
            extraData: {
                "name": this.name,
                "password": this.pass
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                let header = JSON.parse(data.header.toString().replace('null', '"null"'));
                let sessionId = header['Set-Cookie'].toString().match(/\w+/g)[1]
                console.log('Session:' + sessionId);
                this.$app.$def.globalData.sessionId = sessionId;
                if (JSON.parse(data.result).code == 0) {
                    prompt.showToast({
                        message: "登录成功！欢迎你" + this.name
                    });
                    this.$app.$def.globalData.username = this.name;
                    if (this.isMine) {
                        router.clear();
                        this.$app.$def.globalData.cinidex = 3;
                        router.replace({
                            uri: 'pages/mine/mine'
                        });
                    } else router.back();
                } else {
                    prompt.showToast({
                        message: "用户名或密码错误"
                    });
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },
    register() {
        router.push({
            uri: 'pages/signin/signin'
        })
    }
}
