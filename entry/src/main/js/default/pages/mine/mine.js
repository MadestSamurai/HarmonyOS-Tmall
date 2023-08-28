import prompt from '@system.prompt';
import http from '@ohos.net.http';
import router from '@system.router';

export default {
    data: {
        title: "",
        foreHome: [],
        username: ""
    },
    onInit() {
        this.username = this.$app.$def.globalData.username;
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forehome', {
            method: http.RequestMethod.GET,
            header: {
                'Content-Type': 'application/json'
            }
        }, (err, data) => {
            if (!err) {
                console.log(data.result);
                let res = JSON.parse(data.result);
                this.foreHome = res;
            } else {
                console.info('error:' + JSON.stringify(err));
                console.log(data.result);
                httpRequest.destroy();
            }
        })
    },

    onShow() {
        this.username = this.$app.$def.globalData.username;
    },

    onActive() {
        this.username = this.$app.$def.globalData.username;
    },

    toLogin() {
        router.push({
            uri: 'pages/login/login',
            params: {
                isMine: true
            }
        });
    },

    waitPay() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forecheckLogin', {
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                if (JSON.parse(data.result).code == 1) {
                    prompt.showToast({
                        message: "您当前未登录，请先登录！"
                    });
                } else {
                    router.push({
                        uri: 'pages/orderitem/orderitem',
                        params: {
                            type: 'waitPay'
                        }
                    });
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },

    waitDelivery() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forecheckLogin', {
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                if (JSON.parse(data.result).code == 1) {
                    prompt.showToast({
                        message: "您当前未登录，请先登录！"
                    });
                } else {
                    router.push({
                        uri: 'pages/orderitem/orderitem',
                        params: {
                            type: 'waitDelivery'
                        }
                    });
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },

    waitConfirm() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forecheckLogin', {
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                if (JSON.parse(data.result).code == 1) {
                    prompt.showToast({
                        message: "您当前未登录，请先登录！"
                    });
                } else {
                    router.push({
                        uri: 'pages/orderitem/orderitem',
                        params: {
                            type: 'waitConfirm'
                        }
                    });
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },

    waitReview() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forecheckLogin', {
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                if (JSON.parse(data.result).code == 1) {
                    prompt.showToast({
                        message: "您当前未登录，请先登录！"
                    });
                } else {
                    router.push({
                        uri: 'pages/orderitem/orderitem',
                        params: {
                            type: 'waitReview'
                        }
                    });
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },
    detail(id) {
        router.push({
            uri: 'pages/product/product',
            params: {
                goods_id: id
            }
        })
    },
    logout() {
        this.$app.$def.globalData.sessionId = "";
        this.$app.$def.globalData.username = "点击登录";
        router.clear();
        this.$app.$def.globalData.cinidex = 3;
        router.replace({
            uri: 'pages/mine/mine'
        });
    }
}
