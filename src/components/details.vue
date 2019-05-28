<template>
    <div>
        <div class="activity">
            <img :src="Data.image">
        </div>
        <div class="activity-intro">
            <div class="activity-intro-name">
                <h3>{{Data.name}}</h3>
                <ul>
                    <li><img :src="time">开始时间：{{Data.start_time}}</li>
                    <li><img :src="time">结束时间：{{Data.end_time}}</li>
                    <li><img :src="num">中奖人数：{{Data.win_num}}</li>
                </ul>
                <span>中奖几率 X N</span>
            </div>
            <div class="activity-intro-content">
                <p>活动介绍</p>
                <p><pre>{{Data.description}}</pre></p>
                <p>活动奖品</p>
                <p><pre>{{Data.prize}}</pre></p>    
            </div>
        </div>
        <div class="user-num">
            <span>参与用户</span>
            <span>{{Data.join_num}}人</span>
        </div>
        <div class="none" v-if="NumComment == 0" v-show="isTrue">
            <img :src="noComment">
            <p>还没有人参与</p>
        </div>
        <div class="user">
            <div class="user-info" v-for="(item,index) in Extra" :key="index">
                <div class="user-info-name">
                    <img :src="item.avatar">
                    <span>{{item.name}}</span>
                    <span class="winning" v-if="item.is_win ==  true" v-show="isTrue"><img :src="jiangpai">已中奖</span>
                </div>
                <span class="time">{{item.join_at}}</span>
            </div>
        </div>
        <div class="enroll">
            <a href="javascript:;" @click="all()">参与报名</a>
        </div>
        <!--在微信中打开-->
        <div class="weixin">
            请在浏览器中打开
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import wx from 'weixin-js-sdk'
    export default{
        data(){
            return {
                bg:require("../assets/img/details/header.png"),
                header:require("../assets/img/article/head1.png"),
                noComment:require("../assets/img/trends/无评论.png"),
                jiangpai:require('../assets/img/details/jiangpai.png'),
                num:require('../assets/img/details/num.png'),
                time:require('../assets/img/details/time.png'),
                isTrue:true,
                id:this.$route.params.id,
                code:this.$route.query.invite,
                Data:[],
                Extra:[],
                NumComment:[],
                detail:[],
                title:[]
            }
        },
        components: {

        },
        methods: {
            all:function(){
                // location.href = "https://www.tosneaker.com/m/#/invite/"+this.code;
                var newId = this.id
                var ua = window.navigator.userAgent.toLowerCase();
                //微信
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    document.getElementsByClassName('weixin')[0].style.display = 'block';
                }else{//非微信浏览器
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                        window.location.href = "iOSBAN://?drawActivityDetailIID="+newId;//ios app协议
                        window.setTimeout(function() {
                            window.location.href = "https://www.tosneaker.com/app/download?ADTAG=396.392";
                        }, 2000);
                    }else if (navigator.userAgent.match(/android/i)) {
                        window.location.href = 'ban://tosneaker.android/sys/activity/draw?id='+newId;
                        setTimeout(function(){
                            window.location.href= "https://www.tosneaker.com/app/download?ADTAG=370.337"; //android下载地址
                        },2000);
                    }
                }
            },
            getData(){
                var url = '/api/ext/activity/'+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Data = res.data.data;
                            this.Extra = res.data.extra;
                            for(var i=0;i<this.Extra.length;i++){
                                this.Extra[i].avatar = 'https://static.tosneaker.com'+this.Extra[i].avatar;
                            };
                            this.NumComment = res.data.data.join_num;
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
                var title ='BAN-'+this.Data.name;
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com'+this.Data.image;
                var desc = '来不及解释了，抓紧上车，扶稳开车啦~';
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
    .activity{
        width: 100%;
        height: 13rem;
        position: relative;
    }
    .activity img{
        width: 100%;
        height: 13rem;
    }
    /*活动介绍*/
    .activity-intro{
        width: 100%;
        background-color: #fff;
        padding: 1.25rem 0.75rem 1rem;
        box-sizing: border-box;
    }
    .activity-intro .activity-intro-name{
        width: 19.6875rem;
        font-size: 0.9375rem;
        color: #282828;
        background-color: #fff;
        background-size: 100%;
        padding-left: 1.125rem;
        padding-top: 1.5625rem;
        padding-bottom: 1.25rem;
        box-sizing: border-box;
        margin: -3.4375rem auto 0px;
        position: relative;
        box-shadow: 0px 0px 20px 0px #f2f2f2;
        -webkit-box-shadow: 0px 0px 20px 0px #f2f2f2;
        -moz-box-shadow: 0px 0px 20px 0px #f2f2f2;
    }
    .activity-intro .activity-intro-name h3{
        margin-bottom: 0.9375rem;
        font-size: 1.25rem;
        color: #333;
    }
    .activity-intro .activity-intro-name ul li{
        margin-bottom: 0.3125rem;
        font-size: 0.875rem;
        color: #282828;
    }
    .activity-intro .activity-intro-name ul li img{
        width: 0.875rem;
        height: 0.875rem;
        vertical-align: middle;
        margin-top: -0.125rem;
        margin-right: 0.3125rem;
    }
    .activity-intro .activity-intro-name span{
        display: inline-block;
        width: 5.3125rem;
        height: 1.6875rem;
        color: #fff;
        font-size: 0.75rem;
        text-align: center;
        line-height: 1.6875rem;
        position: absolute;
        right: 0;
        bottom: 0.75rem;
        background: url("../assets/img/details/yuanjiao.png") no-repeat;
        background-size: 100%;
    }
    .activity-intro .activity-intro-content{
        width: 100%;
        margin-top: 1.5625rem;
    }
    .activity-intro .activity-intro-content p:nth-child(odd){
        font-size: 1rem;
        color: #5e95f4;
        font-weight: 600;
    }
    .activity-intro .activity-intro-content p:nth-child(even){
        font-size: 0.875rem;
        color: #282828;
        margin-top: 0.625rem;
    }
    .activity-intro .activity-intro-content p:nth-child(3){
        margin-top: 0.9375rem;
    }
    /*参与用户*/
    .user-num{
        width: 100%;
        height: 3.3125rem;
        background-color: #fff;
        margin-top: 0.75rem;
        padding: 0px 0.75rem;
        box-sizing: border-box;
        margin-bottom: 0.125rem;
        display:-webkit-flex;
        display:flex;
        justify-content:space-between;
        align-items: center;
    }
    .user-num span:nth-child(1){
        font-size: 0.9375rem;
        color: #282828;
    }
    .user-num span:nth-child(2){
        font-size: 0.9375rem;
        color: #5e95f4;
    }
    /*none部分*/
    .none{
        width: 100%;
        height: 13rem;
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
    /*user部分*/
    .user{
        width: 100%;
        padding: 0px 1.0625rem;
        box-sizing: border-box;
        background-color: #fff;
        margin-bottom: 3.3125rem;
    }
    .user .user-info{
        width: 100%;
        height: 4rem;
        display:-webkit-flex;
        display:flex;
        justify-content:space-between;
        align-items: center;
        border-bottom: 0.0625rem dashed #dddddd;
    }
    .user .user-info:last-child{
        border-bottom: none;
    }
    .user .user-info .time{
        font-size: 0.9375rem;
        color: #989898;
    }
    .user .user-info .user-info-name{
        display:-webkit-flex;
        display:flex;
        align-items: center;
    }
    .user .user-info .user-info-name img{
        width: 2.9375rem;
        height: 2.9375rem;
        float: left;
        border-radius: 50%;
    }
    .user .user-info .user-info-name span{
        font-size: 0.9375rem;
        color: #282828;
        margin-left: 0.875rem;
    }
    /*显示已中奖*/
    .user .user-info-name .winning{
        font-size: 0.9375rem;
        color: #5e94f5!important;
        margin-left: 0.875rem;
    }
    .user .user-info-name .winning img{
        width: 1.3125rem;
        height: 1.4375rem;
        margin-right: 0.3125rem;
        border-radius: 0;
    }
    /*参与报名*/
    .enroll{
        width: 100%;
        height: 3.3125rem;
        text-align: center;
        line-height: 3.3125rem;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .enroll a{
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 1rem;
        color: #fff;
        background-color: #5e94f3;
    }
    /*在微信中打开*/
    .weixin{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,1);
        z-index: 99;
        color: #fff;
        font-size: 2rem;
        text-align: center;
        padding-top: 20%;
        display: none;
    }
</style>