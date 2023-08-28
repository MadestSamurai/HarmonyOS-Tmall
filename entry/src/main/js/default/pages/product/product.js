import prompt from '@system.prompt';
import http from '@ohos.net.http';
import router from '@system.router';

export default {
    data: {
        goods_id: 78,
        goodsDetail: {
            "product": {
                "id": 87,
                "category": {
                    "id": 83,
                    "name": "平板电视",
                    "products": null,
                    "productsByRow": null
                },
                "name": "Konka/康佳 LED32S1卧室32吋安卓智能无线WIFI网络液晶平板电视机",
                "subTitle": "32吋电视机 8核智能 网络 全国联保 送货上门",
                "originalPrice": 1699.0,
                "promotePrice": 1104.35,
                "stock": 98,
                "createDate": "2022-01-05T08:43:32.000+0000",
                "firstProductImage": {
                    "id": 630,
                    "type": "type_single"
                },
                "productSingleImages": [
                    {
                        "id": 0,
                        "type": "type_single"
                    }
                ],
                "productDetailImages": [
                    {
                        "id": 0,
                        "type": "type_detail"
                    }
                ],
                "reviewCount": 0,
                "saleCount": 0
            },
            "reviews": [],
            "pvs": []
        }
    },
    onInit() {
        this.getGoodsDetail();
    },
    /**
     *  根据id获取商品详细信息
     */
    getGoodsDetail() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/foreproduct/' + this.goods_id, {
            method: http.RequestMethod.GET,
            header: {
                'Content-Type': 'application/json'
            }
        }, (err, data) => {
            if (!err) {
                console.log(data.result);
                let res = JSON.parse(data.result);
                this.goodsDetail = res.data;
                console.log(JSON.stringify(this.goodsDetail.product.productSingleImages));
            } else {
                console.info('error:' + JSON.stringify(err));
                console.log(data.result);
                httpRequest.destroy();
            }
        })
    },
    /**
     *  实现点击购物车跳转到购物车页面
     */
    goShortCart() {
        this.$app.$def.globalData.cinidex = 2;
        router.push({
            uri: 'pages/shopcart/shopcart',
        })
    },

    /**
     * 实现点击加入购物车后，将商品加入购物车
     */
    addShopCart() {
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
                    setTimeout(function () {
                        prompt.showToast({
                            message: "当前未登录或登录状态过期，跳转到登录页面"
                        });
                    }, 500);
                    router.push({
                        uri: 'pages/login/login',
                    })
                } else {
                    let httpRequest = http.createHttp();
                    httpRequest.on('headersReceive', (header) => {
                        console.info('header: ' + JSON.stringify(header));
                    });
                    httpRequest.request(
                        'http://49.234.6.100:8080/tmall_springboot-0.0.1/foreaddCart?pid='+ this.goods_id + '&num=1', {
                        header: {
                            'Content-Type': 'application/json',
                            'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
                        },
                    }, (err, data) => {
                        if (!err) {
                            console.log('Result: ' + data.result);
                            prompt.showToast({
                                message: "加入商品到购物车成功"
                            });
                        } else {
                            console.info('error:' + JSON.stringify(err));
                            httpRequest.destroy();
                        }
                    })
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },

    buy(){
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
                    setTimeout(function () {
                        prompt.showToast({
                            message: "当前未登录或登录状态过期，跳转到登录页面"
                        });
                    }, 500);
                    router.push({
                        uri: 'pages/login/login',
                    })
                } else {
                    let httpRequest = http.createHttp();
                    httpRequest.on('headersReceive', (header) => {
                        console.info('header: ' + JSON.stringify(header));
                    });
                    httpRequest.request(
                        'http://49.234.6.100:8080/tmall_springboot-0.0.1/forebuyone?pid='+ this.goods_id + '&num=1', {
                        header: {
                            'Content-Type': 'application/json',
                            'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
                        },
                    }, (err, data) => {
                        if (!err) {
                            console.log('Result: ' + data.result); //oiid
                            let httpRequest = http.createHttp();
                            httpRequest.on('headersReceive', (header) => {
                                console.info('header: ' + JSON.stringify(header));
                            });
                            httpRequest.request(
                                'http://49.234.6.100:8080/tmall_springboot-0.0.1/forebuy?oiid='+ data.result, {
                                header: {
                                    'Content-Type': 'application/json',
                                    'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
                                }
                            }, (err, data) => {
                                if (!err) {
                                    console.log('Result: ' + data.result);
                                    router.push({
                                        uri: 'pages/orderinfo/orderinfo',
                                    })
                                } else {
                                    console.info('error:' + JSON.stringify(err));
                                    httpRequest.destroy();
                                }
                            })
                        } else {
                            console.info('error:' + JSON.stringify(err));
                            httpRequest.destroy();
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
