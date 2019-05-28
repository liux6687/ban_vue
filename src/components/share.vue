<template>
    <div @click="all()">
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="(item,index) in Data.item_image" :key="index">
                <img :src="'https://static.tosneaker.com'+item">
            </mt-swipe-item>
        </mt-swipe>
        <!--tab区域-->
        <div class="table">
            <div class="mt-table">
                <mt-navbar class="page-part" v-model="selected">
                    <mt-tab-item id="1">口碑</mt-tab-item>
                    <mt-tab-item id="2">配置</mt-tab-item>
                    <mt-tab-item id="3">圈评</mt-tab-item>
                </mt-navbar>
                <mt-tab-container class="page-content" v-model="selected">
                    <mt-tab-container-item id="1" class="one">
                        前往APP查看
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2" class="two">
                        <table>
                            <tr v-for="(items,index) in Data.attr_info" :key="index">
                                <td class="table-left">{{items.name}}</td>
                                <td class="table-right">{{items.value.join('，')== ''? '待更新...':items.value.join('，')}}</td>
                            </tr>
                        </table>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3" class="three">
                        前往APP查看
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <!--前往商城-->
        <div class="shop">
            <a href="javascript:;" @click="all()">
                下载APP
            </a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import wx from 'weixin-js-sdk'
    export default{
        name: 'page-navbar',
        data(){
            return {
                selected: '2',
                out:require("../assets/img/out.jpg"),
                Z:require("../assets/img/Z.png"),
                Data:[],
                id:this.$route.params.id,
                name:[],
                img:[]
            }
        },
        methods:{
            all:function(){
                var isMobile = {
                    Android: function() {
                        return navigator.userAgent.match(/Android/i) ? true : false;
                    },
                    BlackBerry: function() {
                        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
                    },
                    iOS: function() {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
                    },
                    Windows: function() {
                        return navigator.userAgent.match(/IEMobile/i) ? true : false;
                    },
                    any: function() {
                        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
                    }
                };
                if(isMobile.iOS()){
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=396.387";
                }else if(isMobile.Android()){
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=370.340";
                }
            },
//            数据请求
            getData(){
                var url = "/api/product/item-sku/"+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Data = res.data.data;
                            for(var img in this.Data.item_image){
                                if(img == 0){
                                    this.img = this.Data.item_image[img]
                                }
                            }
                            var names = this.Data.attr_info;
                            for(var i=0;i<names.length;i++){
                                if(names[i].name == '全称'){
                                    this.name = names[i].value.toString();
                                }
                            }
                            this.getConfig();
                        },
                        res=>{

                        }
                )
            },
            getConfig(){
                var url = location.href.split('#')[0];
                var dataUrl = 'https://www.tosneaker.com/api/wechat/official-account/jssdk-config?jsApiList[]=onMenuShareQQ&jsApiList[]=onMenuShareWeibo';
                this.$http.get(dataUrl,{params:{url:url}}).then(
                    res =>{
                        var res = res.data.data;
                        this.wxInit(res);
                    }
                )
            },
            // 微信分享
            wxInit(res){
                var title =this.name;
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com'+this.img;
                var desc = this.name;
                wx.config({
                    debug: false,
                    appId: res.appId,
                    timestamp: res.timestamp,
                    nonceStr: res.nonceStr,
                    signature: res.signature,
                    jsApiList: ['checkJsApi','onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                });
                wx.ready(function(){
                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: '', // 分享链接
                        imgUrl: urlImg, // 分享图标
                        success: function() {
                            // Toast({
                            //     message: '分享成功',
                            // })
                        },
                        cancel: function() {
                            // Toast({
                            //     message: '取消分享',
                            // })
                        },
                    });
                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: '', // 分享链接
                        imgUrl: urlImg, // 分享图标
                        success: function() {
                            // Toast({
                            //     message: '分享成功',
                            // })
                        },
                        cancel: function() {
                            // Toast({
                            //     message: '取消分享',
                            // })
                        },
                    });
                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: '', // 分享链接
                        imgUrl: urlImg, // 分享图标
                        success: function() {
                            // Toast({
                            //     message: '分享成功',
                            // })
                        },
                        cancel: function() {
                            // Toast({
                            //     message: '取消分享',
                            // })
                        },
                    });
                    wx.onMenuShareQZone({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: '', // 分享链接
                        imgUrl: urlImg, // 分享图标
                        success: function() {
                            // Toast({
                            //     message: '分享成功',
                            // })
                        },
                        cancel: function() {
                            // Toast({
                            //     message: '取消分享',
                            // })
                        },
                    });
                });
                
                wx.error(function(err) {
                    alert('出错了！')
                    // $toast({
                    //     message: JSON.stringify(err),
                    //     position: 'middle',
                    //     duration: 2000
                    // })
                    // alert(JSON.stringify(err));
                });
            }
        },
        created(){
            this.getData();
        },


    }
</script>
<style scoped>
    @media only screen and (max-width: 1080px), only screen and (max-device-width:1080px) {
        html,body {
            font-size:46.08px;
        }
    }
    @media only screen and (max-width: 960px), only screen and (max-device-width:960px) {
        html,body {
            font-size:40.96px;
        }
    }
    @media only screen and (max-width: 800px), only screen and (max-device-width:800px) {
        html,body {
            font-size:34.13333333333333px;
        }
    }
    @media only screen and (max-width: 720px), only screen and (max-device-width:720px) {
        html,body {
            font-size:30.72px;
        }
    }
    @media only screen and (max-width: 640px), only screen and (max-device-width:640px) {
        html,body {
            font-size:27.30666666666667px;
        }
    }
    @media only screen and (max-width: 600px), only screen and (max-device-width:600px) {
        html,body {
            font-size:25.6px;
        }
    }
    @media only screen and (max-width: 540px), only screen and (max-device-width:540px) {
        html,body {
            font-size:23.04px;
        }
    }
    @media only screen and (max-width: 480px), only screen and (max-device-width:480px) {
        html,body {
            font-size:20.48px;
        }
    }
    @media only screen and (max-width: 414px), only screen and (max-device-width:414px) {
        html,body {
            font-size:17.664px;
        }
    }
    @media only screen and (max-width: 400px), only screen and (max-device-width:400px) {
        html,body {
            font-size:17.066666666666666px;
        }
    }
    @media only screen and (max-width: 375px), only screen and (max-device-width:375px) {
        html,body {
            font-size:16px;
        }
    }
    @media only screen and (max-width: 360px), only screen and (max-device-width:360px) {
        html,body {
            font-size:15.36px;
        }
    }
    @media only screen and (max-width: 320px), only screen and (max-device-width:320px) {
        html,body {
            font-size:13.653333333333334px;
        }
    }
    @media only screen and (max-width: 240px), only screen and (max-device-width:240px) {
        html,body {
            font-size:10.24px;
        }
    }
    /*轮播图*/
    .mint-swipe{
        width: 100%;
        height: 14.1875rem;
    }
    .mint-swipe .mint-swipe-items-wrap img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: #fff;
    }

    /*table部分*/
    .table{
        width: 100%;
        background-color: #fff;
        margin-bottom: 3rem;
    }
    .table .mt-table{
        padding: 0 1.25rem 0.9375rem 1.25rem;
    }
    .table .mt-table .page-part{
        border-bottom: 1px solid #ccc;
    }
    .table .mt-table .page-part .mint-tab-item .mint-tab-item-label{
        font-size: 1.0625rem;
    }
    /*mt-table*/
    .table .mt-table .page-content{
        margin-top: 0.6875rem;
        width: 100%;
        font-size: 0.875rem;
    }
    .table .mt-table .page-content .two{
        width: 100%;
    }
    .table .mt-table .page-content .two table{
        width: 100%;
        font-size: 0.9375rem;
        border: 1px solid #ccc;
    }
    .table .mt-table .page-content .two tr{
        width: 100%;
    }
    .table .mt-table .page-content .two tr:last-child{
        border-bottom: 1px solid #ccc;
    }
    .table .mt-table .page-content .two .table-left{
        width: 35%;
        background-color: #898895;
        color: #fff;
        text-align: center;
        padding: 0.5rem 0;
    }
    .table .mt-table .page-content .two .table-right{
        width: 65%;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.9375rem;
        border-bottom: 1px solid #ccc;
    }
    /*前往商城*/
    .shop{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3rem;
        background-color: #5e95f4;
        text-align: center;
        line-height: 3rem;
    }
    .shop a{
        display: block;
        color: #fff;
    }
</style>
