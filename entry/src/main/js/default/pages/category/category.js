import http from '@ohos.net.http';
import router from '@system.router';
export default {
    data: {
        actived: 0,
        cateList:[],
        cateLevel2:[],
        keyword: ""
    },
    onInit() {
        this.getCateList()
        //console.log(this.cateLevel2)
    },
    activeChange(index){
        this.actived = index
        this.cateLevel2 = this.cateList[index].children
    },
    //发送请求获取所有商品分类数据
    getCateList(){
        let httpRequest = http.createHttp();
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
            'http://49.234.6.100:5000/categories', {
            header: {
                'Content-Type': 'application/json'
            },
        }, (err, data) => {
            if (!err) {
                console.log('Result: ' + data.result);
                var result = JSON.parse(data.result);
                this.cateList = result.result;
                this.cateLevel2 = result.result[0].children
            } else {
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        })
    },
    //点击三级分类图片跳转到对应的分类列表页面
    gotoGoodsList(cateName){
        console.log(cateName)
        router.push({
            uri: 'pages/searchpage/searchpage',
            params: {
                keyword: cateName,
                pholder: cateName
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
