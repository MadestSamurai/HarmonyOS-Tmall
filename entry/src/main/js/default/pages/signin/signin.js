import prompt from '@system.prompt';
import router from '@system.router';
import http from '@ohos.net.http';

export default {
    data: {
        name: "",
        pass: "",
        passConfirm: "",
    },
    changeName(e) {
        console.log(JSON.stringify(e));
        this.name = e.text;
    },

    changePass(e) {
        console.log(JSON.stringify(e));
        this.pass = e.text;
    },

    changePassConfirm(e) {
        console.log(JSON.stringify(e));
        this.passConfirm = e.text;
    },

    register() {
        if (this.passConfirm == this.pass) {
            let httpRequest = http.createHttp();
            httpRequest.on('headersReceive', (header) => {
                console.info('header: ' + JSON.stringify(header));
            });
            httpRequest.request(
                'http://49.234.6.100:8080/tmall_springboot-0.0.1/foreregister', {
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
                    if (JSON.parse(data.result).code == 0) {
                        router.back();
                        setTimeout(function () {
                            prompt.showToast({
                                message: "注册成功"
                            });
                        }, 500);
                    } else {
                        prompt.showToast({
                            message: JSON.parse(data.result).message
                        });
                    }
                } else {
                    console.info('error:' + JSON.stringify(err));
                    httpRequest.destroy();
                }
            })
        } else {
            prompt.showToast({
                message: "密码不一致"
            });
        }
    }
}
