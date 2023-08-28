import prompt from '@system.prompt';
import router from '@system.router';
import http from '@ohos.net.http';
export default {
    data: {
        keyword: "",
        content: [],
        pholder: "搜索",
        fresh: false
    },

    onInit() {
        this.searchGoods();
    },

    changeKeyword(e) {
        console.log(JSON.stringify(e));
        this.keyword = e.text;
    },

    searchGoods() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/foresearch?keyword=' + this.keyword, {
            method: http.RequestMethod.POST,
            header: {
                'Content-Type': 'application/json'
            }
        }, (err, data) => {
            if (!err) {
                console.log(data.result);
                this.pholder = this.keyword;
                this.content = JSON.parse(data.result).content;
            } else {
                console.info('error:' + JSON.stringify(err));
                console.log(data.result);
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
    refresh(e) {
        this.fresh = e.refreshing;
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/foresearch?keyword=' + this.keyword, {
            method: http.RequestMethod.POST,
            header: {
                'Content-Type': 'application/json'
            }
        }, (err, data) => {
            if (!err) {
                console.log(data.result);
                this.pholder = this.keyword;
                this.content = JSON.parse(data.result).content;
                var that = this;
                that.fresh = e.refreshing;
                setTimeout(function () {
                    that.fresh = false;
                    prompt.showToast({
                        message: '刷新完成!'
                    })
                }, 500)
            } else {
                console.info('error:' + JSON.stringify(err));
                console.log(data.result);
                httpRequest.destroy();
            }
        })
    }
}
