<template>
    <div class="success">
        <div class="header">
        </div>
        <div class="user-content">
            <div class="user-info">
                <p>恭喜你获得价值<span>98</span>元BAN红包！</p>
                <p>请在7天内使用手机号{{newPhone}}</p>
                <p>注册登录BAN APP，即可完成激活</p>
                <div class="money">
                    <span class="one">¥</span><span class="two">98</span>
                </div>
            </div>
        </div>
        <div class="shop">
            <div class="shop-img">

            </div>
        </div>
        <div class="code">
            <img :src="wx">
        </div>
        <footer>
            <div class="left">
                <img :src="ban">
                <span>下载BAN APP</span>
            </div>
            <a href="javascript:;" @click="all()">下载</a>
        </footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import wx from 'weixin-js-sdk'
    export default{
        data(){
            return {
                wx:require("../assets/img/invite/wx.png"),
                ban:require("../assets/img/get/BAN.png"),
                phone:this.$route.query.p,
                newPhone:[]
            }
        },
        created(){

        },
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
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=396.398";
                }else if(isMobile.Android()){
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=370.329";
                }
            },
            getData(){
                var phone = this.phone;
                this.newPhone = phone.replace(phone.substr(3,4),"****");
                this.getConfig();
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
                var title ='我在BAN,邀你一起为鞋狂！';
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com/assets/_layouts/front/img/BAN.png';
                var desc = '众多Sneaker与潮流达人的聚集地，一分钟找到和你一样引领潮流的人~';
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
        components: {},
        mounted(){
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
    .success{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .header{
        width: 100%;
        height: 10.75rem;
        background: url('../assets/img/get/BG_get.png') no-repeat;
        background-size: 100% 10.75rem;
    }
    /*用户部分*/
    .user-content{
        width: 100%;
        display: flex;
        justify-content:center;
        box-sizing: border-box;
    }
    .user-content .user-info{
        width: 70%;
        text-align: center;
        margin-top: -9.0625rem;
        background-color: #fff;
        box-shadow: 0px 0px 0.8125rem -0.3125rem #656565;
        border-radius: 0.625rem;
    }
    .user-content .user-info p:nth-child(1){
        margin-top: 2.1875rem;
        font-size: 1rem;
        color: rgb(40,40,40);
        font-weight: 600;
    }
    .user-content .user-info p:nth-child(1) span{
        color: rgb(94,149,244);
    }
    .user-content .user-info p:nth-child(2){
        margin-top:0.9375rem;
        font-size: 0.8125rem;
        color: rgb(40,40,40);
    }
    .user-content .user-info p:nth-child(3){
        font-size: 0.8125rem;
        color: rgb(40,40,40);
    }
    .user-content .user-info .money{
        margin-top: 0.9375rem;
        border-top: 0.0625rem dashed #cdcdcd;
        padding:1.3125rem 0px;
        color: #5e95f4;
        box-sizing: border-box;
    }
    .user-content .user-info .money .one{
        font-size: 0.875rem;
        color: rgb(94,149,244);
        font-weight: 600;
    }
    .user-content .user-info .money .two{
        display: inline-block;
        margin-top: -0.25rem;
        font-size: 1.9375rem;
        vertical-align: top;
        margin-left: 0.1875rem;
        font-weight: 600;
    }
    /*shop*/
    .shop{
        width: 100%;
        height: 7rem;
        margin-top: 1.5625rem;
        padding: 0px 0.625rem;
        box-sizing: border-box;
    }
    .shop .shop-img{
        width: 100%;
        height: 100%;
        background: url("../assets/img/get/1214.png") no-repeat;
        background-size: 100%;
    }
    /*code*/
    .code{
        width: 100%;
        margin: 2.625rem 0px 6.375rem 0px;
        text-align: center;
    }
    .code img{
        width: 6.25rem;
        height: 6.25rem;
    }
    /*footer*/
    footer{
        width: 100%;
        height: 3.75rem;
        line-height: 3.75rem;
        position: fixed;
        left: 0;
        bottom: 0;
        border-top: 0.0625rem solid #f7f7f7;
        padding: 0px 1.25rem;
        box-sizing: border-box;
        display:-webkit-flex;
        display:flex;
        justify-content:space-between;
        align-items: center;
        background-color: #fff;
    }
    footer .left img{
        width: 2.6875rem;
        height: 2.6875rem;
        vertical-align: middle;
    }
    footer .left span{
        font-size: 0.875rem;
        color: rgb(0,0,0);
        margin-left: 0.625rem;
    }
    footer a{
        width: 3.4375rem;
        height: 1.9375rem;
        text-align: center;
        line-height: 1.9375rem;
        font-size: 0.875rem;
        border: 0.0625rem solid rgb(94,149,244);
        color: rgb(94,149,244);
    }
</style>