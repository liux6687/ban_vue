<template>
    <div class="invite">
        <div class="header">
        </div>
        <div class="user-content">
            <div class="user-info">
                <p><img :src="'https://static.tosneaker.com'+Data.avatar"></p>
                <p><span>{{Data.name}}</span></p>
                <p>送你价值<span>98</span>元红包</p>
                <p>立即注册登录BAN APP即可激活</p>
                <div class="money">
                    <p><span class="one">¥</span><span class="two">98</span></p>
                </div>
            </div>
        </div>
        <div class="shop">
            <div class="shop-img">
            </div>
        </div>
        <div class="handle">
            <div class="handle-input">
                <input type="number" placeholder="请输入您的手机号" ref="phone">
            </div>
            <div class="handle-confirm">
                <input type="submit" value="领取BAN红包" @click="sendcode">
            </div>
            <div class="handle-info">
                <span>仅支持大陆11位手机号领取，激活时需要使用该手机号注册登录BAN</span>
            </div>
        </div>
        <div class="introduce">
            <ul>
                <li><img :src="img1"></li>
                <li><img :src="img2"></li>
                <li><img :src="img3"></li>
                <li><img :src="img4"></li>
                <li><img :src="img5"></li>
            </ul>
        </div>
        <div class="download">
            <a href="javascript:;" @click="all()">下载BAN APP</a>
        </div>
        <div class="code">
            <img :src="wx">
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import wx from 'weixin-js-sdk'
    export default{
        data(){
            return {
                head1:require("../assets/img/article/head1.png"),
                img1:require("../assets/img/invite/img1.png"),
                img2:require("../assets/img/invite/img2.png"),
                img3:require("../assets/img/invite/img3.png"),
                img4:require("../assets/img/invite/img4.png"),
                img5:require("../assets/img/invite/img5.png"),
                wx:require("../assets/img/invite/wx.png"),
                phone:'',
                id:this.$route.params.id,
                Data:[],
                status:[],
                msg:[]
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
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=396.398";
                }else if(isMobile.Android()){
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=370.329";
                }
            },
            sendcode(){
                this.phone = this.$refs.phone.value;
                var url = '/api/user/invitation'
                this.$http.post(url,{'mobile':this.phone,'ic':this.id},{emulateJSON: true}).then(
                        res=>{
                            this.status = res.data.status;
                            this.msg = res.data.message;
                            if(this.status == 400){
                                this.$toast({
                                    message: this.msg,
                                    position: 'middle',
                                    duration: 2000
                                });
                            }else if(this.status==403){
                                this.$toast({
                                    message: this.msg,
                                    position: 'middle',
                                    duration: 2000
                                });
                            }else{
                                location.href = 'https://www.tosneaker.com/m/#/success?p='+this.phone
                            }
                        },
                        res=>{
                            console.log(error)
                        }
                )
            },
            getData(){
                var url = '/api/user/inviter?ic='+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Data = res.data.data;
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
    .invite{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .header{
        width: 100%;
        height: 15.4375rem;
        background: url('../assets/img/invite/bg.png') no-repeat;
        background-size: 100% 15.4375rem;
    }
    /*用户部分*/
    .user-content{
        width: 100%;
        justify-content:center;
        display: flex;
        box-sizing: border-box;
    }
    .user-content .user-info{
        width: 72%;
        text-align: center;
        margin-top: -13.75rem;
        background-color: #fff;
        box-shadow: 0px 0px 0.8125rem -0.3125rem #656565;
        border-radius: 0.625rem;
    }
    .user-content .user-info p:nth-child(1) img{
        width: 4rem;
        height: 4rem;
        margin-top:1.6875rem;
        border-radius: 50%;
    }
    .user-content .user-info p:nth-child(2){
        margin:0.625rem 0px;
    }
    .user-content .user-info p:nth-child(2) span{
        display: inline-block;
        font-size: 1rem;
        font-weight: 600;
        color: rgb(40,40,40);
    }
    .user-content .user-info p:nth-child(3){
        font-size: 0.8125rem;
        color: rgb(40,40,40);
    }
    .user-content .user-info p:nth-child(4){
        font-size: 0.8125rem;
        color: rgb(40,40,40);
        margin-bottom: 1.875rem;
    }
    .user-content .user-info .money{
        border-top: 0.0625rem dashed #cdcdcd;
        padding:1.3125rem 0px;
        color: #5e95f4;
        box-sizing: border-box;
    }
    .user-content .user-info .money p .one{
        font-size: 0.875rem;
        color: rgb(94,149,244);
        font-weight: 600;
    }
    .user-content .user-info .money p .two{
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
        margin-top: 1.25rem;
        padding: 0px 0.625rem;
        box-sizing: border-box;
    }
    .shop .shop-img{
        width: 100%;
        height: 100%;
        background: url("../assets/img/get/1214.png") no-repeat;
        background-size: 100% 7rem;
    }
    /*handle*/
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    .handle{
        width: 100%;
        /*margin-top:1.75rem;*/
    }
    .handle .handle-input{
        margin-top:1.75rem;
        justify-content:center;
        display: flex;
    }
    .handle .handle-input input{
        width: 60%;
        height: 2.4375rem;
        font-size: 0.875rem;
        border: 0.0625rem solid #e5e5e5;
        text-align: center;
        color: rgb(152,152,152);
    }
    .handle .handle-confirm{
        margin-top: 0.9375rem;
        justify-content:center;
        display: flex;
    }
    .handle .handle-confirm input{
        width: 61%;
        height: 2.4375rem;
        color: #fff;
        font-size: 0.875rem;
        background-color: rgb(94,149,244);
    }
    .handle .handle-info{
        margin-top: 0.75rem;
        justify-content:center;
        display: flex;
    }
    .handle .handle-info span{
        width: 61%;
        font-size: 0.8125rem;
        color: rgb(152,152,152);
    }
    /*introduce*/
    ::-webkit-scrollbar {
        width:0;
        height:0;
    }
    .introduce{
        width: 100%;
        height: 15.9375rem;
        margin-top: 1.875rem;
        padding:0.625rem 0px;
        box-sizing: border-box;
        background-color: #f2f2f2;
        overflow: hidden;
        overflow-x: auto;
        white-space: normal;
    }
    .introduce ul{
        width: 500%;
    }
    .introduce ul li{
        float: left;
        width: 8.3125rem;
        height: 14.6875rem;
        margin-left: 0.625rem;
    }
    .introduce ul li:last-child img{
        margin-right: 0.625rem;
    }
    .introduce ul li img{
        width: 100%;
        height: 14.6875rem;
    }
    /*download*/
    .download{
        margin-top: 1.75rem;
        justify-content:center;
        display: flex;
    }
    .download a{
        width: 61%;
        height: 2.4375rem;
        text-align: center;
        line-height: 2.4375rem;
        font-size: 0.875rem;
        color: #fff;
        background-color: rgb(94,149,244);
    }
    /*code*/
    .code{
        width: 100%;
        margin: 1.25rem 0px;
        text-align: center;
    }
    .code img{
        width: 6.25rem;
        height: 6.25rem;
    }
</style>