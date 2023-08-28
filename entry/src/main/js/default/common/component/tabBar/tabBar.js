import router from '@system.router';

export default {
    //定义菜单项
    data: {
        menus: [{
                    "text": "精选",
                    "img1": "./common/images/tab_bar/precision-hl.png",
                    "img2": "./common/images/tab_bar/precision.png",
                    "src": "pages/precision/precision"
                },
                {
                    "text": "分类",
                    "img1": "./common/images/tab_bar/category-hl.png",
                    "img2": "./common/images/tab_bar/category.png",
                    "src": "pages/category/category"
                },
                {
                    "text": "购物车",
                    "img1": "./common/images/tab_bar/shopcart-hl.png",
                    "img2": "./common/images/tab_bar/shopcart.png",
                    "src": "pages/shopcart/shopcart"
                },
                {
                    "text": "我",
                    "img1": "./common/images/tab_bar/mine-hl.png",
                    "img2": "./common/images/tab_bar/mine.png",
                    "src": "pages/mine/mine"
                }],
        cindex: 0
    },
    changecontent(index) {
        //赋值
        if(this.$app.$def.globalData.cinidex != index) {
            this.$app.$def.globalData.cinidex = index;
            router.replace({
                uri: this.menus[index].src,
            });
        }
    }
}
