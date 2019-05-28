<template>
    <div>
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="(item,index) in Imgs" :key="index">
                <img :src="'https://static.tosneaker.com'+item">
            </mt-swipe-item>
        </mt-swipe>
        <div class="nav">
            <img :src="nav" class="nav-img">
            <ul class="clearfix">
                <li>
                    <router-link :to="{path:'/product/item/'+id}">
                        <img :src="peizhi">
                        <p>配置</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <img :src="dongtai">
                        <p>动态</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <img :src="zixun">
                        <p>资讯</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <img :src="koubei">
                        <p>口碑</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <img :src="jianding">
                        <p>鉴定</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <!--鞋圈-->
        <div class="circle clearfix">
            <div class="rele-circle">
                <span>{{count}}</span>个相关鞋圈
            </div>
            <div class="head">
                <ul>
                    <li v-for="(item,index) in items" :key="index" v-if="index<4"><img :src="'https://static.tosneaker.com'+item.avatar"></li>
                    <li><img :src="left"></li>
                </ul>
            </div>
        </div>
        <!--口碑评价-->
        <div class="praise">
            <p class="clearfix"><span>口碑评价</span><span>查看更多<img :src="left"></span></p>
            <p class="no">暂无口碑评价</p>
            <!--<ul class="clearfix">-->
                <!--<li class="li-style">鞋底柔软</li>-->
                <!--<li>内部坚韧</li>-->
                <!--<li>其他相关内容</li>-->
                <!--<li>其他相关内容</li>-->
                <!--<li>其他相关内容</li>-->
            <!--</ul>-->
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
        data(){
            return {
                dongtai:require('../assets/img/equ/dongtai.png'),
                jianding:require('../assets/img/equ/jianding.png'),
                koubei:require('../assets/img/equ/koubei.png'),
                peizhi:require('../assets/img/equ/peizhi.png'),
                zixun:require('../assets/img/equ/zixun.png'),
                nav:require('../assets/img/equ/nav.png'),
                left:require('../assets/img/equ/left.png'),
                id:this.$route.params.id,
                Imgs:[],
                spuId:[],
                count:[],
                items:[],
                name:[],
                img:[]
            }
        },
        components: {},
        methods: {
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
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=396.410";
                }else if(isMobile.Android()){
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=370.409";
                }
            },
            getData(){
                var url = "/api/product/item-sku/"+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Imgs = res.data.data.item_image;
                            for(var img in this.Imgs){
                                if(img == 0){
                                    this.img = this.Imgs[img]
                                }
                            }
                            this.spuId = res.data.extra.spu_id;
                            var names = res.data.data.attr_info;
                            for(var i=0;i<names.length;i++){
                                if(names[i].name == '全称'){
                                    this.name = names[i].value.toString();
                                }
                            }
                            this.getConfig();
                            var url = '/api/circle/group?spu_id='+this.spuId+'&page=1'
                            this.$http.get(url).then(
                                    res=>{
                                        this.count = res.data.count;
                                        this.items = res.data.data;
                                    },
                                    res=>{

                                    }
                            )
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
        }
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
    .nav{
        padding: 0px 0px 1.25rem;
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;
    }
    .nav .nav-img{
        width: 100%;
    }
    .nav ul li {
        float: left;
        text-align: center;
        margin: 0 1.356rem;
    }
    .nav ul li a{
        font-size: 0.875rem;
        color: #282828;
    }
    .nav ul li img{
        width: 1.5625rem;
        height: 1.4375rem;
    }
    /*相关鞋圈*/
    .circle{
        background-color: #fff;
        padding: 0px 0.75rem;
        width: 100%;
        height: 3.75rem;
        line-height: 3.75rem;
        box-sizing: border-box;
    }
    .circle .rele-circle{
        float: left;
        font-size: 0.875rem;
        color: #656565;
    }
    .circle .rele-circle span{
        font-size: 1.125rem;
        color: #5e94f5;
    }
    .circle .head{
        float: right;
    }
    .circle .head ul li{
        float: left;
    }
    .circle .head ul li img{
        display: inline-block;
        width: 1.875rem;
        height: 1.875rem;
        vertical-align: middle;
        border: 3px solid #fff;
        border-radius: 50%;
        margin-left: -0.375rem;
    }
    .circle .head ul li:last-child{
        margin-left: 0.9375rem;
    }
    .circle .head ul li:last-child img{
        width: 0.625rem;
        height: 0.9375rem;
    }
    /*口碑*/
    .praise{
        margin-top: 0.75rem;
        background-color: #fff;
        padding: 0px 0.75rem 0.625rem;
        margin-bottom: 3.125rem;
    }
    .praise .no{
        font-size: 0.875rem;
    }
    .praise p{
        /*padding: 0.9375rem 0px;*/
        height: 3.1875rem;
        line-height: 3.1875rem;
    }
    .praise p span:first-child{
        float: left;
        font-size: 1rem;
        color: #282828;
    }
    .praise p span:last-child{
        float: right;
        font-size: 0.875rem;
        color: #989898;
    }
    .praise p span:last-child img{
        display: inline-block;
        width: 0.625rem;
        height: 0.9375rem;
        margin-left: 0.75rem;
        vertical-align: middle;
    }
    .li-style{
        border: 1px solid #5e94f5!important;
        background-color: #f4f9ff;
        color: #5e94f5!important;
    }
    .praise ul li{
        float: left;
        font-size: 0.875rem;
        color: #656565;
        border-radius: 20px;
        padding: 0.625rem 0.9375rem;
        margin-left: 0.5rem;
        margin-top: 0.5rem;
        border: 1px solid #f2f2f2;
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