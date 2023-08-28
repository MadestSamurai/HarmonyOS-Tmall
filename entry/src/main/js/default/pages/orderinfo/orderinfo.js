import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        name: "",
        mobile: "",
        postcode: "",
        address: "",
        message: ""
    },
    onInit() {
    },
    changeName(e) {
        console.log(JSON.stringify(e));
        this.name = e.text;
    },

    changeMobile(e) {
        console.log(JSON.stringify(e));
        this.mobile = e.text;
    },

    changePostcode(e) {
        console.log(JSON.stringify(e));
        this.postcode = e.text;
    },

    changeAddress(e) {
        console.log(JSON.stringify(e));
        this.address = e.text;
    },

    changeMessage(e) {
        console.log(JSON.stringify(e));
        this.message = e.text;
    },

    submit() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forecreateOrder', {
            method: http.RequestMethod.POST,
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            },
            extraData: {
                "address": this.address,
                "post": this.postcode,
                "receiver": this.name,
                "mobile": this.mobile,
                "userMessage": this.message
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                if (JSON.parse(data.result).code == 0) {
                    router.push({
                        uri: 'pages/orderitem/orderitem',
                        params: {
                            type: 'waitPay'
                        }
                    })
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    }
}
