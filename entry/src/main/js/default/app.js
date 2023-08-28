export default {
    onCreate() {
        console.info('AceApplication onCreate');
    },
    onDestroy() {
        console.info('AceApplication onDestroy');
    },
    globalData: {
        //定义菜单项
        menus:[{"text":"首页","img1":"./common/shoyyeu.png","img2":"./common/shouyes.png"},
               {"text":"资讯","img1":"./common/zixunu.png","img2":"./common/zixuns.png"},
               {"text":"分类","img1":"./common/fenleiu.png","img2":"./common/fenleis.png"},
               {"text":"我的","img1":"./common/wodeu.png","img2":"./common/wodes.png"}],
        //定义一个下标
        cinidex:0,
        sessionId: '',
        username: "点击登录",
        isLogin: false
    }
};
