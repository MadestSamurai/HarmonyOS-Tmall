import router from '@system.router';
import http from '@ohos.net.http';

export default {
    data: {
        topList: [
            {
                "title": "超市", "pic": "/common/images/menu_list/shop.png"
            },
            {
                "title": "进口", "pic": "/common/images/menu_list/import.png"
            },
            {
                "title": "猫享", "pic": "/common/images/menu_list/catonly.png"
            },
            {
                "title": "奢品", "pic": "/common/images/menu_list/luxury.png"
            },
            {
                "title": "捡漏", "pic": "/common/images/menu_list/lowprice.png"
            },
            {
                "title": "电器", "pic": "/common/images/menu_list/electric.png"
            },
            {
                "title": "免税", "pic": "/common/images/menu_list/notax.png"
            },
            {
                "title": "露营", "pic": "/common/images/menu_list/camping.png"
            }
        ],
        goodsList: {
            "flash": {
                "topPic": "",
                "good1": {
                    "pic": "",
                    "preferential": "直降47元",
                    "preferPic": "",
                    "price": 82
                },
                "good2": {
                    "pic": "",
                    "preferential": "直降60元",
                    "preferPic": "",
                    "price": 139
                },
            },
            "top": {
                "topPic": "",
                "topWord": "天猫官方",
                "preferColor": "",
                "preferBG": "",
                "good1": {
                    "pic": "",
                    "preferential": "千人加购",
                },
                "good2": {
                    "pic": "",
                    "preferential": "同类排行第一",
                },
            },
            "newComing": {
                "topPic": "",
                "topWord": "抢大牌新品",
                "preferColor": "",
                "preferBG": "",
                "good1": {
                    "pic": "",
                    "preferential": "AKKO",
                },
                "good2": {
                    "pic": "",
                    "preferential": "酵素",
                },
            },
            "trend": {
                "topPic": "",
                "topWord": "每周一发布",
                "preferColor": "",
                "preferBG": "",
                "good1": {
                    "pic": "",
                    "preferential": "伪素颜",
                },
                "good2": {
                    "pic": "",
                    "preferential": "油皮",
                },
            }
        },
        rollBarPosition: 0,
        foreHome: [],
        keyword: ""
    },
    onInit() {
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
                res.sort(function() {
                    return Math.random() - 0.5
                })
                let index;
                for(index in res) {
                    res[index].products.sort(function() {
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
    trackBar() {
        var offset = this.$element("menulist").currentOffset()
        console.log(JSON.stringify(offset));
        this.rollBarPosition = this.$element("menulist").currentOffset().x / 5.4;
    },
    detail(id) {
        router.push({
            uri: 'pages/product/product',
            params: {
                goods_id: id
            }
        })
    },
    changeKeyword(e) {
        console.log(JSON.stringify(e));
        this.keyword = e.text;
    },
    searchGoods() {
        router.push({
            uri: 'pages/searchpage/searchpage',
            params: {
                keyword: this.keyword,
                pholder: this.keyword
            }
        })
    }
}
