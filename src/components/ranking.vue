<template>
    <div @click="all()">
        <!--大图-->
        <div class="details-img">
            <img :src="'https://static.tosneaker.com'+Extra.banner">
        </div>
        <!--@用户部分-->
        <div class="region">
            <div class="choose" v-for="(item,index) in Data" :key="index">
                <p class="clearfix">
                <span class="left">
                    <span class="rank">第{{++index}}名</span>
                    <span><a>{{item.join_no}}号</a>@{{item.user_name}}</span>
                </span>
                    <span class="right">关注</span>
                </p>
                <p class="bigImg">
                    <img :src="'https://static.tosneaker.com'+item.image">
                    <span class="bottom clearfix">
                        <span class="bottom-left">
                            <img :src="piao">{{item.ticket_cnt}}票
                        </span>
                        <span class="bottom-right">
                            <img :src="hand">粉丝榜
                        </span>
                    </span>
                </p>
            </div>
        </div>
        <!--前往商城-->
        <div class="shop">
            <a href="javascript:;">
                参与其他活动
            </a>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import wx from 'weixin-js-sdk'
    export default{
        data(){
            return {
                hand:require('../assets/img/ranking/hand.png'),
                piao:require('../assets/img/ranking/piaoshu.png'),
                id:this.$route.params.id,
                Data:[],
                Extra:[],
                Item:[]
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
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=396.408";
                }else if(isMobile.Android()){
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=370.407";
                }
            },
            getData(){
                var url = '/api/ext/activity/'+this.id+'/rank'
                this.$http.get(url).then(
                        res=>{
                            this.Data = res.data.data;
                            this.Extra = res.data.extra;
                        },
                        res=>{

                        }
                )
            },
            getItem(){
                var url = '/api/ext/activity-vote/'+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Item = res.data.data;
                            console.log(this.Item);
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
                var title ='BAN-'+this.Item.name;
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com'+this.Item.image;
                var desc = '中奖结果出来了，快来看看有你么~';
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
                });
            }
        },
        created(){
            this.getData();
            this.getItem();
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
    /*大图*/
    .details-img{
        width: 100%;
        height:13.125rem;
    }
    .details-img img{
        width: 100%;
        height:100%;
    }
    /*@用户部分*/
    .region{
        margin-bottom: 3rem;
    }
    .choose{
        width: 100%;
        background-color: #fff;
        padding: 0px 0.75rem 1.25rem;
        box-sizing: border-box;
        margin-top: 0.75rem;
    }
    .choose p{
        padding: 1.25rem 0px 0.9375rem;
    }
    .choose p .left{
        float: left;
    }
    .choose p .left .rank{
        color: #5e94f5;
        font-size: 0.9375rem;
    }
    .choose p .right{
        float: right;
        font-size: 0.875rem;
        color: #5e94f5;
        padding: 0.0625rem 0.3125rem;
        border: 1px solid #5e94f5;
    }
    .choose p span a{
        /*color: #5e94f5;*/
        font-size: 0.9375rem;
    }
    .choose .bigImg{
        width: 100%;
        padding: 0;
        position: relative;
    }
    .choose .bigImg img{
        width: 100%;
        border-radius: 5px;
        display: block;
    }
    .choose .bigImg .bottom{
        position: absolute;
        left: 0;
        bottom: 0;
        display: inline-block;
        width: 100%;
        height: 3.125rem;
        line-height: 3.125rem;
        background-color: rgba(0,0,0,.3);
        color: #fff;
        border-bottom-left-radius: 0.3125rem;
        border-bottom-right-radius: 0.3125rem;
        padding: 0 0.75rem;
        box-sizing: border-box;
    }
    .choose .bigImg .bottom .bottom-left{
        float: left;
        font-size: 0.875rem;
    }
    .choose .bigImg .bottom .bottom-right{
        float: right;
        font-size: 0.875rem;
    }
    .choose .bigImg .bottom img{
        display: inline-block;
        width: 1.875rem;
        height:1.875rem;
        vertical-align: middle;
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