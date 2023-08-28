import prompt from '@system.prompt';
import router from '@system.router';
import http from '@ohos.net.http';

export default {
    data: {
        // 购物车数据
        carts: [],
        login: false,
        selected: [],
        total: 0,
        checkedCount: 0,
        checkedGoodsPrice: 0,
        isFullCheck: false,
        foreHome: []
    },
    onInit() {
        this.getShopCartData();
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
                    this.login = false;
                } else {
                    this.login = true;
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
        httpRequest = http.createHttp();
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
                res.sort(function () {
                    return Math.random() - 0.5
                })
                let index;
                for (index in res) {
                    res[index].products.sort(function () {
                        return Math.random() - 0.5
                    })
                }
                this.foreHome = res;
            } else {
                console.info('error:' + JSON.stringify(err));
                console.log(data.result);
                httpRequest.destroy();
            }
        })
    },

    onShow() {
        this.getShopCartData();
        let x;
        for (x in this.selected) {
            this.selected[x] = false;
        }
        this.refreshData();
    },

    refreshData() {
        this.total = this.carts.reduce((total, item) => total += item.number, 0);
        var x;
        var checked = 0;
        var price = 0;
        for (x in this.selected) {
            if (this.selected[x]) {
                checked += this.carts[x].number;
                price += this.carts[x].number * this.carts[x].product.promotePrice;
            }
        }
        this.checkedCount = checked;
        this.checkedGoodsPrice = price;
        this.isFullCheck = (this.checkedCount == this.total);
        console.log("执行刷新" + checked + " " + price + " " + this.isFullCheck);
    },

    checkboxOnChange(index, isSelected) {
        this.selected[index] = !isSelected;
        console.log("执行单选");
        this.refreshData();
    },

    // 获取购物车数据
    getShopCartData() {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forecart', {
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                var result = JSON.parse(data.result);
                if (result.code == 1) {
                    this.login = false;
                } else {
                    if (result == null) this.carts = [];
                    else this.carts = result;
                    var x;
                    if (this.selected.length == 0) {
                        for (x in result) {
                            this.selected[x] = false;
                        }
                        console.log(this.selected)
                    }
                    this.refreshData();
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },

    // 点击每个商品的+/-按钮的事件处理
    sub(index) {
        if (this.carts[index].number == 1) {
            return;
        }
        this.changeNumber(this.carts[index].product.id, this.carts[index].number - 1);
    },
    add(index) {
        this.changeNumber(this.carts[index].product.id, this.carts[index].number + 1);
    },
    changeNumber(pid, num) {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/forechangeOrderItem?pid=' + pid + '&num=' + num, {
            method: http.RequestMethod.GET,
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                var result = JSON.parse(data.result);
                if (result.code == 1) {
                    this.login = false;
                } else {
                    // 重新获取数据
                    this.getShopCartData();
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },
    // 点击删除按钮的事件处理
    removeGoods(index) {
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:8080/tmall_springboot-0.0.1/foredeleteOrderItem?oiid=' + this.carts[index].id, {
            method: http.RequestMethod.GET,
            header: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=' + this.$app.$def.globalData.sessionId,
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                var result = JSON.parse(data.result);
                if (result.code == 1) {
                    this.login = false;
                } else {
                    this.selected.splice(index, 1);
                    // 重新获取数据
                    this.getShopCartData();
                }
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },

    // 点击全选的事件处理
    changeAllState() {
        var x;
        var array = [];
        for (x in this.selected) {
            array[x] = !this.isFullCheck;
        }
        this.selected = array;
        this.refreshData();
        console.log("执行全选");
    },

    settlement() {
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
                    let oiidArray = "";
                    let index;
                    for (index in this.carts) {
                        if (this.selected[index])
                        oiidArray += ("oiid=" + this.carts[index].id + "&");
                    }
                    console.log(oiidArray);
                    let httpRequest = http.createHttp();
                    httpRequest.on('headersReceive', (header) => {
                        console.info('header: ' + JSON.stringify(header));
                    });
                    httpRequest.request(
                        'http://49.234.6.100:8080/tmall_springboot-0.0.1/forebuy?' + oiidArray.slice(0, -1), {
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
    goLogin() {
        router.push({
            uri: 'pages/login/login',
        })
    }
}
