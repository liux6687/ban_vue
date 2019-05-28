<template>
    <div>
        <div class="img">
            <img :src="'https://static.tosneaker.com'+Data.cover_image">
        </div>
        <section>
            <div class="activity-name">
                {{Data.name}}
            </div>
            <div class="activity-money clearfix">
                <div class="money-line clearfix">
                    <span class="money-left" v-if="Data.cost_per_person==0">免费</span>
                    <span class="money-left" v-if="Data.cost_per_person!=0">{{Data.cost_per_person}}</span>
                    <span class="money-right">{{Data.join_num}}人已参与/<span>{{Data.upper_limit_num}}</span></span>
                </div>
            </div>
            <div class="activity-time">
                <div class="time-line">
                    <img :src="time">
                    {{Data.gather_time}}
                </div>
            </div>
            <div class="region clearfix">
                <span class="region-left">
                    <img :src="region">
                    {{Data.gather_location}}
                </span>
                <span class="region-right">
                    <img :src="more">
                </span>
            </div>
        </section>
        <div class="user">
            <div class="user-title">创建者</div>
            <div class="user-img">
                <img :src="'https://static.tosneaker.com'+Data.organiser_user_avatar">
                <p>{{Data.organiser_user_name}}</p>
            </div>
            <div class="user-num clearfix">
                <span class="num-left">其他成员
                    <span v-if="Data.join_num==0">（{{Data.join_num}}）</span>
                    <span v-else>（{{Data.join_num-1}}）</span>
                </span>
                <span class="num-right">
                    全部
                    <img :src="more">
                </span>
            </div>
            <div class="user-other clearfix">
                <ul>
                    <li v-for="(item,index) in Extra" :key="index" v-if="index<6"><img :src="'https://static.tosneaker.com'+item.cover"></li>
                    <!--<li><img :src="add"></li>-->
                </ul>
            </div>
        </div>
        <div class="introduce clearfix">
            <span class="introduce-left">活动介绍</span>
            <span class="introduce-right"><img :src="more"></span>
        </div>
        <div class="remind">
            <img :src="lamp">
            <div class="remind-text">
                <p>提醒：本活动由用户自发组织，在参与活动过程中请注意核实活动信息，谨慎付款。</p>
                <p>如在活动参与中出现任何问题，请咨询活动组织者；</p>
                <p>如发现虚假信息，请及时联系客服举报反馈。</p>
            </div>
        </div>
        <div class="join">
            <a href="javascript:;" @click="judge()">参与活动</a>
        </div>
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
                img:require('../assets/img/actDetails/bigImg.png'),
                time:require('../assets/img/actDetails/time.png'),
                region:require('../assets/img/actDetails/region.png'),
                more:require('../assets/img/circle/more.png'),
                header:require('../assets/img/article/head1.png'),
                add:require('../assets/img/actDetails/add.png'),
                lamp:require('../assets/img/actDetails/lamp.png'),
                id:this.$route.params.id,
                Data:[],
                Extra:[]
            }
        },
        components: {},
        methods: {
            judge:function(){
                var newId = this.id
                var ua = window.navigator.userAgent.toLowerCase();
                //微信
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    document.getElementsByClassName('weixin')[0].style.display = 'block';
                }else{//非微信浏览器
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                        window.location.href = "iOSBAN://?activityID="+newId;//ios app协议
                        window.setTimeout(function() {
                            window.location.href = "https://www.tosneaker.com/app/download?ADTAG=396.388";
                        }, 2000);
                    }else if (navigator.userAgent.match(/android/i)) {
                        window.location.href = 'ban://tosneaker.android/circle/activity?id='+newId;
                        setTimeout(function(){
                            window.location.href= "https://www.tosneaker.com/app/download?ADTAG=370.339"; //android下载地址
                        },2000);
                    }
                }
            },
            getData(){
                var url= '/api/circle/group-activity/'+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Data = res.data.data;
                            this.Extra = res.data.extra;
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
                var title ='快来和我一起参加--'+this.Data.name;
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com'+this.Data.cover_image;
                var desc = this.Data.description;
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
    .img{
        width: 100%;
        height: 10.9375rem;
    }
    .img img{
        width: 100%;
        height: 100%;
    }
    /*section*/
    section{
        width: 100%;
        margin-bottom: 0.625rem;
    }
    section .activity-name{
        font-size: 1rem;
        font-weight: 600;
        color: #282828;
        background-color: #fff;
        padding: 1.25rem 0.9375rem 0.75rem;
        box-sizing: border-box;
    }
    section .activity-money{
        padding: 0px 0.9375rem 0px;
        box-sizing: border-box;
        background-color: #fff;
    }
    section .activity-money .money-line{
        border-bottom: 1px solid #f2f2f2;
        padding: 0px 0px 0.75rem;
        box-sizing: border-box;
    }
    section .activity-money .money-left{
        float: left;
        font-size: 0.9375rem;
        color: #f21731;
    }
    section .activity-money .money-right{
        float: right;
        font-size: 0.9375rem;
        color: #5e94f3;
    }
    section .activity-time{
        padding: 0px 0.9375rem;
        box-sizing: border-box;
        background-color: #fff;
        font-size: 0.9375rem;
        color: #282828;
    }
    section .activity-time .time-line{
        border-bottom: 1px solid #f2f2f2;
        padding: 1.25rem 0px;
        box-sizing: border-box;
    }
    section .activity-time img{
        width: 1.0625rem;
        height: 1.0625rem;
        margin-right: 0.625rem;
        vertical-align: middle;
        margin-top: -0.3125rem;
    }
    section .region{
        padding: 1.25rem 0.9375rem;
        box-sizing: border-box;
        background-color: #fff;
    }
    section .region .region-left{
        float: left;
        font-size: 0.9375rem;
        color: #282828;
    }
    section .region .region-left img{
        width: 1.0625rem;
        height: 1.0625rem;
        vertical-align: middle;
        margin-right: 0.625rem;
        margin-top: -0.3125rem;
    }
    section .region .region-right{
        float: right;
    }
    section .region .region-right img{
        width: 0.5rem;
        height: 0.8125rem;
    }
    /*user部分*/
    .user{
        width: 100%;
        margin-bottom: 0.625rem;
    }
    .user .user-title{
        width: 100%;
        padding: 0.9375rem;
        box-sizing: border-box;
        font-size: 0.9375rem;
        color: #282828;
        background-color: #fff;
    }
    .user .user-img{
        width: 100%;
        padding: 0.625rem 0.9375rem 1.25rem;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;
    }
    .user .user-img img{
        width: 2.8125rem;
        height: 2.8125rem;
        margin-bottom: 0.75rem;
        border: 2px solid #5e95f4;
        border-radius: 50%;
    }
    .user .user-num{
        width: 100%;
        padding: 0.9375rem 0.9375rem 0.3125rem;
        box-sizing: border-box;
        background-color: #fff;
    }
    .user .user-num .num-left{
        float: left;
        font-size: 0.9375rem;
        color: #282828;
    }
    .user .user-num .num-right{
        float: right;
        font-size: 0.9375rem;
        color: #656565;
    }
    .user .user-num .num-right img{
        width: 0.5rem;
        height: 0.8125rem;
        vertical-align: middle;
        margin-left: 0.625rem;
    }
    .user .user-other{
        width: 100%;
        padding: 1.25rem 0.9375rem;
        box-sizing: border-box;
        background-color: #fff;
    }
    .user .user-other ul li{
        float: left;
        width: 2.8125rem;
        height: 2.8125rem;
        border: 2px solid #e5e6e9;
        border-radius: 50%;
        margin-right: 0.3125rem;
    }
    .user .user-other ul li img{
        width: 100%;
        border-radius: 50%;
    }
    /*活动介绍*/
    .introduce{
        width: 100%;
        padding: 1.25rem 0.9375rem;
        box-sizing: border-box;
        background-color: #fff;
        margin-bottom: 0.9375rem;
    }
    .introduce .introduce-left{
        float: left;
        font-size: 0.9375rem;
        color: #282828;
    }
    .introduce .introduce-right{
        float: right;
    }
    .introduce .introduce-right img{
        width: 0.5rem;
        height: 0.8125rem;
    }
    /*remind提醒*/
    .remind{
        width: 100%;
        padding: 0px 0.9375rem 1.25rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-bottom: 3.125rem;
    }
    .remind img{
        width: 0.8125rem;
        height: 0.8125rem;
        margin-right: 0.5rem;
    }
    .remind .remind-text p{
        font-size: 0.8125rem;
        color: #656565;
    }
    /*参与活动*/
    .join{
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .join a{
        display: inline-block;
        width: 100%;
        height: 3.125rem;
        line-height: 3.125rem;
        font-size: 0.9375rem;
        color: #fff;
        background-color: #5e95f4;
    }
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