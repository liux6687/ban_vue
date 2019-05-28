<template>
    <div @click="all()">
        <div class="info full clearfix">
            <header>
                <div class="mes">
                    <img :src="'https://static.tosneaker.com'+Data.user_avatar">
                    <span>{{Data.user_name}}</span>
                </div>
                <div class="follow">
                    <span>+ 关注</span>
                </div>
            </header>
            <div class="img1" v-if="imgNumber==1" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="img2" v-if="imgNumber==2" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="img3" v-if="imgNumber==3" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="img4" v-if="imgNumber==4" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="img5" v-if="imgNumber==5" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="img6" v-if="imgNumber==6" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="img7" v-if="imgNumber==7" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="img8" v-if="imgNumber==8" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="img9" v-if="imgNumber==9" v-show="isTrue">
                <div class="box" v-for="(item,index) in Data.content_image" :key="index">
                    <img :src="'https://static.tosneaker.com'+item">
                </div>
            </div>
            <div class="info-mes">
                <span>{{Data.content}}</span>
                <a href="javascript:;">{{Data.topic_name}}</a>
            </div>
        </div>
        <div class="all-comment full">
            <span>评论 {{Num.comment_num}}</span>
            <span>点赞 {{Num.like_num}}</span>
        </div>
        <div class="none" v-if="NumComment == 0" v-show="isTrue">
            <img :src="noComment">
            <p>还没有人评论</p>
        </div>
        <div class="people full">
            <div class="people-comment" v-for="(item,index) in Comment" :key="index">
                <div class="people-comment-name">
                    <img :src="'https://static.tosneaker.com'+item.user.avatar">
                    <span>{{item.user.name}}</span>
                </div>
                <div class="people-comment-content">
                    {{item.content}}
                </div>
                <div class="people-comment-handle">
                    <a>2017-08-01 12:36:33</a>
                    <img :src="comment">
                    <span>{{item.comment_cnt}}</span>
                    <img :src="admire">
                    <span>{{item.like_cnt}}</span>
                </div>
            </div>
        </div>
        <!--前往商城-->
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
                left:require("../assets/img/trends/向右.png"),
                follow:require("../assets/img/trends/关注.png"),
                mes:require("../assets/img/trends/1.png"),
                comment:require("../assets/img/trends/评论-(2).png"), //上面评论图片
                admire:require("../assets/img/trends/点赞-(1)-(1).png"),
                discuss:require("../assets/img/trends/评论-(1).png"),  //下评论图片
                house:require("../assets/img/trends/收藏-(2)-拷贝-2.png"),
                transmit:require("../assets/img/trends/转发-(1).png"),
                noComment:require("../assets/img/trends/无评论.png"),
                id:this.$route.params.id,
                Data:[],
                isTrue:true,
                imgNumber:[],
                img:[],
                showImg:false,
                Comment:[],
                Num:[],
                NumComment:[],
                outImg:[]
            }
        },
        components: {
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
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=396.395";
                }else if(isMobile.Android()){
                    location.href = "https://www.tosneaker.com/app/download?ADTAG=370.332";
                }
            },
            getData(){
                var url = "/api/circle/moment/"+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Data = res.data.data;
                            this.imgNumber = res.data.data.content_image.length;
                            this.img = res.data.data.content_image;
                            for(var img in this.img){
                                if(img == 0){
                                    this.outImg = this.img[img]
                                }
                            }
                            this.getConfig();
                        },
                        res=>{

                        }
                )
            },
            getComment(){
                var url = "/api/circle/moment-comment?moment_id="+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Comment = res.data.data;
                        },
                        res=>{

                        }
                )
            },
            getNum(){
                var url = "/api/circle/moment/"+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Num = res.data.data;
                            this.NumComment = res.data.data.comment_num;
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
                var title ='BAN动态';
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com'+this.outImg;
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
            }
        },
        created(){
            this.getData();
            this.getComment();
            this.getNum();
        }
    }
</script>
<style scoped>
    /*header部分*/
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
    header{
        /*height: 2.625rem;*/
        height: 3rem;
        width: 100%;
        background-color: #fff;
        line-height: 3rem;
        text-align: center;
        box-sizing: border-box;
    }
    /*header .back{*/
        /*float: left;*/
        /*width: 10%;*/
        /*font-size: 1.875rem;*/
    /*}*/
    header .mes {
        float: left;
        width: 85%;
        text-align: left;
    }
    header .mes img{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        vertical-align: middle;
        /*margin-right: 0.75rem;*/
    }
    header .mes span{
        font-size: 0.875rem;
    }
    header .follow{
        float: right;
        width: 15%;
        height: 100%;
        color: #78a7f7;
    }
    header .follow span{
        height: 1.1875rem;
        padding: 0.3125rem;
        font-size: 0.625rem;
        border-radius: 0.3125rem;
        color: #fff;
        background-color: #78a7f7;
    }
    /*公共部分*/
    .full{
        padding-left: 0.8125rem;
        padding-right: 0.8125rem;
    }
    /*info部分*/
    .info{
        width: 100%;
        background-color: #fff;
        margin-top: 0.125rem;
        box-sizing: border-box;
    }
    .info .info-mes{
        width: 100%;
        /*line-height: 2.3125rem;*/
    }
    .info .info-mes a{
        display: block;
        margin-bottom: 0.4rem;
        color: #989898;
        font-size: 0.875rem;
    }
    .info .info-mes span{
        font-size: 0.9375rem;
    }
    /*img1样式*/
    .info img{
        margin-bottom: 0.4375rem;
    }
    .info .img1 .box{
        width: 100%;
        height: 12.3125rem;
    }
    .info .img1 img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*img2样式*/
    .info .img2{
        width: 100%;
    }
    .info .img2 .box:nth-child(1){
        float: left;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img2 .box:nth-child(2){
        float: right;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img2 .box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*img3样式*/
    .info .img3{
        width: 100%;
        box-sizing: border-box;
    }
    .info .img3 .box:nth-child(1){
        float: left;
        width: 100%;
        height: 10.8125rem;
    }
    .info .img3 .box:nth-child(2){
        float: left;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img3 .box:nth-child(3){
        float: right;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img3 .box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*img4样式*/
    .info .img4{
        width: 100%;
    }
    .info .img4 .box:nth-child(1){
        float: left;
        width: 49%;
        height: 10.8125rem;
        margin-bottom: 0.4375rem;
    }
    .info .img4 .box:nth-child(2){
        float: right;
        width: 49%;
        height: 10.8125rem;
        margin-bottom: 0.4375rem;
    }
    .info .img4 .box:nth-child(3){
        float: left;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img4 .box:nth-child(4){
        float: right;
        width: 49%;
        height: 10.8125rem;
        margin-bottom: 0.4375rem;
    }
    .info .img4 .box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*img5样式*/
    .info .img5{
        width: 100%;
    }
    .info .img5 .box:nth-child(1){
        float: left;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img5 .box:nth-child(2){
        float: right;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img5 .box:nth-child(3){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img5 .box:nth-child(4){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img5 .box:nth-child(5){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img5 .box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*img6样式*/
    .info .img6{
        width: 100%;
    }
    .info .img6 .box:nth-child(1){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img6 .box:nth-child(2){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img6 .box:nth-child(3){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img6 .box:nth-child(4){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img6 .box:nth-child(5){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img6 .box:nth-child(6){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img6 .box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*img7样式*/
    .info .img7{
        width: 100%;
    }
    .info .img7 .box:nth-child(1){
        float: left;
        width: 100%;
        height: 10.8125rem;
    }
    .info .img7 .box:nth-child(2){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img7 .box:nth-child(3){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img7 .box:nth-child(4){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img7 .box:nth-child(5){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img7 .box:nth-child(6){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img7 .box:nth-child(7){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img7 .box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*img8样式*/
    .info .img8{
        width: 100%;
    }
    .info .img8 .box:nth-child(1){
        float: left;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img8 .box:nth-child(2){
        float: right;
        width: 49%;
        height: 10.8125rem;
    }
    .info .img8 .box:nth-child(3){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img8 .box:nth-child(4){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img8 .box:nth-child(5){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img8 .box:nth-child(6){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img8 .box:nth-child(7){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img8 .box:nth-child(8){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img8 .box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*img9样式*/
    .info .img9{
        width: 100%;
    }
    .info .img9 .box:nth-child(1){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img9 .box:nth-child(2){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img9 .box:nth-child(3){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img9 .box:nth-child(4){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img9 .box:nth-child(5){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img9 .box:nth-child(6){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img9 .box:nth-child(7){
        float: left;
        width: 32%;
        height: 7.0625rem;
        margin-right: 0.375rem;
    }
    .info .img9 .box:nth-child(8){
        float: left;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img9 .box:nth-child(9){
        float: right;
        width: 32%;
        height: 7.0625rem;
    }
    .info .img9 .box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
    }
    /*all-comment部分*/
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
    .all-comment span:nth-child(2){
        float: right;
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
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 0.6875rem;
    }
    .people .people-comment .people-comment-name span{
        font-size: 0.8125rem;
    }
    .people .people-comment .people-comment-content{
        width: 100%;
        font-size: 0.8125rem;
    }
    .people .people-comment .people-comment-handle{
        margin-top: 0.3rem;
        text-align: right;
    }
    .people .people-comment .people-comment-handle a{
        float: left;
        font-size: 0.75rem;
        color: #898989;
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
