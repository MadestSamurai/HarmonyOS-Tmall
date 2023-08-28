import prompt from '@system.prompt';
import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        bought: [],
        type: "",
        fresh: false
    },
    onInit() {
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
                        message: "当前未登录或登录状态过期，跳转到登录页面"
                    });
                    router.push({
                        uri: 'pages/login/login',
                    })
                } else {
                    this.getBought();
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },
    getBought() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forebought', {
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            }
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                this.bought = JSON.parse(data.result)
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },
    pay(oid) {
        let sessionId = this.$app.$def.globalData.sessionId;
        let type = this.type;
        prompt.showDialog({
            title: '支付页',
            message: '点击确认按钮支付',
            buttons: [
                {
                    text: '确认支付',
                    color: '#f51250',
                },
            ],
            success: function() {
                let httpRequest = http.createHttp();
                httpRequest.on('headersReceive', (header) => {
                    console.info('header: ' + JSON.stringify(header));
                });
                httpRequest.request(
                    'http://49.234.6.100:8080/tmall_springboot-0.0.1/forepayed?oid=' + oid, {
                    method: http.RequestMethod.GET,
                    header: {
                        'Content-Type': 'application/json',
                        'Cookie': 'JSESSIONID=' + sessionId,
                    }
                }, (err, data) => {
                    if (!err) {
                        console.log(data.result);
                        router.replace({
                            uri: 'pages/orderitem/orderitem',
                            params: {
                                type: type
                            },
                        });
                    } else {
                        console.info('error:' + JSON.stringify(err));
                        console.log(data.result);
                        httpRequest.destroy();
                    }
                })
            },
            cancel: function() {
                console.log('dialog cancel callback');
            },
        });
    },
    confirm(oid) {
        let sessionId = this.$app.$def.globalData.sessionId;
        let type = this.type;
        prompt.showDialog({
            title: '确认页',
            message: '点击按钮确认收货',
            buttons: [
                {
                    text: '确认收货',
                    color: '#f51250',
                },
            ],
            success: function() {
                let httpRequest = http.createHttp();
                httpRequest.on('headersReceive', (header) => {
                    console.info('header: ' + JSON.stringify(header));
                });
                httpRequest.request(
                    'http://49.234.6.100:8080/tmall_springboot-0.0.1/foreorderConfirmed?oid=' + oid, {
                    method: http.RequestMethod.GET,
                    header: {
                        'Content-Type': 'application/json',
                        'Cookie': 'JSESSIONID=' + sessionId,
                    }
                }, (err, data) => {
                    if (!err) {
                        console.log(data.result);
                        router.replace({
                            uri: 'pages/orderitem/orderitem',
                            params: {
                                type: type
                            },
                        });
                    } else {
                        console.info('error:' + JSON.stringify(err));
                        console.log(data.result);
                        httpRequest.destroy();
                    }
                })
            },
            cancel: function() {
                console.log('dialog cancel callback');
            },
        });
    },
    onRefresh(e) {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forebought', {
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            }
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                this.bought = JSON.parse(data.result);
                var that = this;
                that.fresh = e.refreshing;
                that.fresh = false;
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    }
}
