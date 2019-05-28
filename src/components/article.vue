<template>
    <div @click="all()">
        <div class="content full clearfix">
            <span class="content-title">{{Data.title}}</span>
            <header>
                <div class="name">
                    <img :src="'https://static.tosneaker.com'+Data.user_avatar">
                    <span>{{Data.user_name}}</span>
                    <span>{{Data.publish_time}}</span>
                </div>
                <div class="follow">
                    <span>+ 关注</span>
                </div>
            </header>
            <div class="cover-image">
                <img :src="Data.cover_image">
            </div>
            <span class="content-introduce" v-html="Data.mb_content"></span>
            <div class="option">
                <ul>
                    <li v-for="(item,index) in Data.tags" :key="index">{{item.name}}</li>
                </ul>
            </div>
            <div class="handle">
                <ul>
                    <li>
                        <img :src="praise"><span>{{Data.like_cnt}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="all-comment full">
            <span>评论 {{Data.comment_cnt}}</span>
        </div>
        <div class="none" v-if="NumComment == 0" v-show="isTrue">
            <img :src="noComment">
            <p>还没有人评论</p>
        </div>
        <div class="people full">
            <div class="people-comment" v-for="(item,index) in Comment.data" :key="index">
                <div class="people-comment-name">
                    <img :src="'https://static.tosneaker.com'+item.user.avatar ">
                    <span>{{item.user.name}}</span>
                    <span>{{item.created_at}}</span>
                </div>
                <div class="people-comment-content">
                    {{item.content}}
                </div>
                <div class="people-comment-handle">
                    <img :src="praise">
                    <span>{{item.like_cnt}}</span>
                    <img :src="comment">
                    <span>{{item.comment_cnt}}</span>
                </div>
            </div>
        </div>
        <div class="shop">
            <router-link to="">
                下载APP
            </router-link>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import wx from 'weixin-js-sdk'
    export default{
        data(){
            return {
                browse:require("../assets/img/article/browse.png"),
                head1:require("../assets/img/article/head1.png"),
                head2:require("../assets/img/article/header2.png"),
                like:require("../assets/img/article/like.png"),
                house:require("../assets/img/article/collect.png"),
                transmit:require("../assets/img/article/transmit.png"),
                sort:require("../assets/img/article/sort.png"),
                praise:require("../assets/img/article/点赞(1)(1).png"),
                comment:require("../assets/img/article/评论(2).png"),
                noComment:require("../assets/img/trends/无评论.png"),
                isTrue: true,
                id: this.$route.params.id,
                Data:[],
                Comment:[],
                NumComment:[]
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
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=396.396";
                }else if(isMobile.Android()){
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=370.331";
                }
            },
            getData(){
                var url = "/api/cms/article/"+this.id;
                this.$http.get(url).then(
                        res=>{
                            this.Data = res.data.data;
                            this.NumComment = res.data.data.comment_cnt;
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
                var title =this.Data.title;
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com'+this.Data.cover_image;
                var desc = '';
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
            },
            getComment(){
                var url = "/api/cms/article-comment?article_id="+this.id;
                this.$http.get(url).then(
                        res=>{
                            this.Comment = res.data;
                        },
                        res=>{}
                )
            }
        },
        created(){
            this.getData();
            this.getComment();
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
    /*top部分*/
    /* .top{
        width: 100%;
        height: 14.3125rem;
        background: url("../assets/img/article/gruop13.png") no-repeat;
        background-size: 100% 14.3125rem;
        position: relative;
    }
    .top .top-browse{
        position: absolute;
        bottom: 0.625rem;
        right: 0.8125rem;
    }
    .top .top-browse img{
        width: 1.125rem;
        height: 0.75rem;
        vertical-align: middle;
    }
    .top .top-browse span{
        font-size: 0.625rem;
        color: #fff;
    } */
    /*公共部分*/
    .full{
        padding-left: 0.8125rem;
        padding-right: 0.8125rem;
    }
    /*header部分*/
    header{
        width: 100%;
        height: 2.625rem;
        background-color: #fff;
        box-sizing: border-box;
        margin-top: 1rem;
        margin-bottom:0.5rem;
    }
    header .name{
        float: left;
        width: 80%;
    }
    header .name img{
        float: left;
        width: 2.25rem;
        height: 2.25rem;
        /*margin-top: -1.0625rem;*/
        vertical-align: middle;
        position: relative;
        border-radius: 50%;
        margin-right: 0.625rem;
    }
    header .name span{
        display: block;
        font-size: 0.9375rem;
    }
    header .name span:nth-child(3){
        color: #999999;
        font-size: 0.625rem;
    }
    header .follow{
        float: right;
        width: 20%;
        line-height: 2.625rem;
        text-align: right;
    }
    header .follow span{
        display: inline-block;
        width: 3.5625rem;
        height: 1.875rem;
        text-align: center;
        line-height: 1.875rem;
        font-size: 0.9375rem;
        background-color: #5e95f4;
        border-radius: 0.3125rem;
        color: #fff;
    }
    /*content部分*/
    .content{
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
    }
    .content .content-title{
        display: inline-block;
        width: 100%;
        height: 2.125rem;
        font-size: 1.1875rem;
        color: #282828;
        font-weight: 700;
        margin-top:1rem;
    }
    .content .cover-image img{
        width: 100%;
        /*display: block;*/
    }
    .content .content-introduce{
        padding-left: 0.9333333333333333rem;
        padding-right: 0.9333333333333333rem;
    }
    .content .content-introduce p{
        font-size: 1rem;
        line-height: 1.6666666666666667rem;
        letter-spacing: 0.06666666666666667rem;
        margin-bottom: 0.7333333333333333rem;
        box-sizing: border-box;
        color: #000000;
    }
    .content .content-introduce p img{
        width: 100%;
    }
    .content .option{
        width: 100%;
        margin-bottom:2.5625rem;
    }
    .content .option ul li{
        float: left;
        font-size: 0.75rem;
        padding: 0.4375rem 0.5rem;
        background-color: #f2f2f2;
        border-radius: 5px;
        margin-right: 0.5625rem;
        margin-bottom: 0.5625rem;
    }
    .content .handle{
        width: 100%;
        text-align: center;
        margin-bottom: 1rem;
    }
    .content .handle ul{
        display: inline-block;
    }
    .content .handle ul li{
        float: left;
        width: 5.4375rem;
        height: 2.5rem;
        line-height: 2.5rem;
        border: 1px solid #ccc;
        border-radius: 3.125rem;
    }
    .content .handle ul li img{
        width: 0.9375rem;
        height: 0.9375rem;
        margin-right: 0.3rem;
    }
    .content .handle ul li span{
        font-size: 0.9375rem;
    }
    /*.content .handle ul li p{*/
        /*font-size: 0.625rem;*/
        /*color: #989898;*/
    /*}*/
    /*sort部分*/
    .all-comment{
        width: 100%;
        height: 2.1875rem;
        background-color: #fff;
        margin-top: 0.75rem;
        line-height: 2.1875rem;
        font-size: 0.8125rem;
        box-sizing: border-box;
    }
    .all-comment span:nth-child(1){
        float: left;
    }
    .none{
        width: 100%;
        height: 13rem;
        margin-top: 0.125rem;
        background-color: #fff;
        text-align: center;
    }
    .none img{
        width: 9.375rem;
        height: 4.875rem;
        margin-top: 2.875rem;
        margin-bottom: 1.6875rem;
    }
    .none p{
        color: #989898;
        font-size: 0.9375rem;
    }
    /*.sort{*/
        /*width: 100%;*/
        /*height: 2.0625rem;*/
        /*box-sizing: border-box;*/
        /*line-height: 2.0625rem;*/
    /*}*/
    /*.sort img{*/
        /*width: 0.9375rem;*/
        /*height:0.75rem;*/
        /*vertical-align: middle;*/
    /*}*/
    /*.sort span{*/
        /*font-size: 0.75rem;*/
        /*color: #656565;*/
    /*}*/
    /*people部分*/
    .people{
        width: 100%;
        background-color: #fff;
        margin-top: 0.125rem;
        box-sizing: border-box;
        margin-bottom: 3.4375rem;
    }
    .people .people-comment{
        width: 100%;
        border-bottom: 1px solid #f2f2f2;
    }
    .people .people-comment .people-comment-name{
        width: 100%;
        height: 3.875rem;
        line-height: 3.875rem;
    }
    .people .people-comment .people-comment-name img{
        width: 2.1875rem;
        height: 2.1875rem;
        vertical-align: middle;
        margin-right: 0.6875rem;
        border-radius: 50%;
    }
    .people .people-comment .people-comment-name span{
        font-size: 0.8125rem;
    }
    .people .people-comment .people-comment-name span:nth-child(3){
        float: right;
        font-size: 0.625rem;
        color: #989898;
    }
    .people .people-comment .people-comment-content{
        width: 100%;
        font-size: 0.8125rem;
    }
    .people .people-comment .people-comment-handle{
        text-align: right;
    }
    .people .people-comment .people-comment-handle img{
        width: 0.75rem;
        height: 0.75rem;
        vertical-align: middle;
        margin-left: 0.625rem;
    }
    .people .people-comment .people-comment-handle span{
        font-size: 0.75rem;
        color: #898989;
    }
    /*add-comment部分*/
    /*.add-comment{*/
        /*width: 100%;*/
        /*height: 3.4375rem;*/
        /*position: fixed;*/
        /*left: 0;*/
        /*bottom: 0;*/
        /*background-color: #fff;*/
        /*box-shadow: 0 0 0.625rem #eef1f6;*/
        /*line-height: 3.4375rem;*/
    /*}*/
    /*.add-comment .int{*/
        /*float: left;*/
        /*margin-right: 0.6875rem;*/
    /*}*/
    /*.add-comment .int input{*/
        /*height: 1.875rem;*/
        /*width: 18.4375rem;*/
        /*font-size: 0.8125rem;*/
        /*color: #999999;*/
        /*border-bottom: 1px solid #999999;*/
    /*}*/
    /*.add-comment #a1 {*/
        /*float: left;*/
        /*width: 1.125rem;*/
        /*height: 1.125rem;*/
        /*color: #5e95f4;*/
        /*position: relative;*/
        /*font-size: 0.6875rem;*/
    /*}*/
    /*.add-comment #a1 img{*/
        /*width: 100%;*/
        /*height: 100%;*/
    /*}*/
    /*.add-comment #a1:after {*/
        /*content: attr(data-num);*/
        /*line-height: 0.625rem;*/
        /*width: 0.75rem;*/
        /*height: 0.75rem;*/
        /*border-radius: 50%;*/
        /*background-color: #fff;*/
        /*position: absolute;*/
        /*top: 0.625rem;*/
        /*right: -0.375rem;*/
    /*}*/
    .add-comment{
        width: 100%;
        height: 3.4375rem;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #fff;
        box-shadow: 0 0 0.625rem #eef1f6;
        line-height: 3.4375rem;
    }
    .add-comment .int{
        width: 100%;
        /*margin-right: 1.125rem;*/
    }
    .add-comment .int input{
        height: 1.875rem;
        /*width: 14.375rem;*/
        width: 80%;
        font-size: 0.8125rem;
        margin-right: 0.75rem;
        border: 1px solid #999999;
        padding-left: 0.5rem;
        box-sizing: border-box;
    }
    .add-comment .int span{
        display: inline-block;
        font-size: 0.9375rem;
        color: #323741;
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
        color: #fff;
    }
</style>