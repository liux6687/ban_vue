<template>
    <div>
        <header>
            <div class="header">鞋圈详情</div>
        </header>
        <div class="circle clearfix">
            <div class="top">
                <div class="circle-name">
                    <img :src="'https://static.tosneaker.com'+Data.avatar">
                    <div>
                        <span class="name">{{Data.name}}</span>
                        <span class="id">ID:{{Data.im_tid}}</span>
                    </div>
                </div>
            </div>
            <div class="circle-jianjie">
                {{Data.description}}
            </div>
            <div class="circle-location">
                <img :src="location">
                <span>地区圈子 • {{Data.location}}</span>
            </div>
        </div>
        <div class="content">
            <div class="member clearfix">
                <ul>
                    <li v-for="(item,index) in Users.members" :key="index" v-if="index<4"><img :src="'https://static.tosneaker.com'+item.avatar"></li>
                    <li><img :src="add"></li>
                </ul>
                <span class="num">{{Data.member_cnt}}人<img :src="more"></span>
            </div>
            <div class="circle-hot clearfix">
                <span class="hot-name"><img :src="hot" alt="">圈子热度</span>
                <span class="hot-num"><a>{{Data.total_hot}}</a><img :src="more"></span>
            </div>
        </div>
        <div class="activity">
            <div class="activity-title clearfix">
                <span class="left">
                    <img :src="activity" alt="">
                    当前活动
                </span>
                <span class="right">
                    全部活动
                    <img :src="more">
                </span>
            </div>
            <div class="item" v-if="List != null" v-show="isTrue">
                <div class="item-name">
                    {{List.name}}
                </div>
                <div class="item-info clearfix">
                    <span>开始时间<a>{{List.created_at | moment}}</a></span>
                    <span>所需金额
                        <a v-if="List.cost_per_person==0">免费</a>
                        <a else="List.cost_per_person!=0">{{List.cost_per_person}}</a>
                    </span>
                </div>
                <div class="item-img">
                    <img :src="enroll" class="label" v-if="imgNum==1">
                    <img :src="finished" class="label" else="imgNum==0">
                    <img :src="'https://static.tosneaker.com'+List.cover_image">
                </div>
                <div class="didian clearfix">
                    <span><img :src="locationTwo" alt="">{{List.gather_location}}</span>
                    <span>{{List.join_num}}人参与/{{List.upper_limit_num}} <img :src="moreBlue" alt=""></span>
                </div>
            </div>
        </div>
        <div class="join">
            <a href="javascript:;" @click="judge()">加入鞋圈</a>
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
                head:require('../assets/img/article/head1.png'),
                location:require('../assets/img/circle/location.png'),
                more:require('../assets/img/circle/more.png'),
                add:require('../assets/img/circle/add.png'),
                hot:require('../assets/img/circle/hot.png'),
                activity:require('../assets/img/circle/activity.png'),
                moreBlue:require('../assets/img/circle/more-blue.png'),
                enroll:require('../assets/img/circle/enroll.png'),
                having:require('../assets/img/circle/having.png'),
                finished:require('../assets/img/circle/finished.png'),
                locationTwo:require('../assets/img/circle/location-two.png'),
                isTrue:true,
                num:1,
                imgNum:0,
                id:this.$route.params.id,
                List:[],
                Data:[],
                Users:[],
                Name:[]
            }
        },
        components: {},
        methods: {
            judge:function(){
                var newId = this.id;
                var name = this.Name;
                var ua = window.navigator.userAgent.toLowerCase();
                //微信
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    document.getElementsByClassName('weixin')[0].style.display = 'block';
                }else{//非微信浏览器
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                        window.location.href = "iOSBAN://?teamID="+newId;//ios app协议
                        window.setTimeout(function() {
                            window.location.href = "https://www.tosneaker.com/app/download?ADTAG=396.389";
                        }, 2000);
                    }else if (navigator.userAgent.match(/android/i)) {
                        window.location.href = 'ban://tosneaker.android/circle?id='+newId+'&name='+name;
                        setTimeout(function(){
                            window.location.href= "https://www.tosneaker.com/app/download?ADTAG=370.338"; //android下载地址
                        },2000);
                    }
                }
            },
            getDataOne(){
                var url = '/api/circle/group/'+this.id
                this.$http.get(url).then(
                        res=>{
                            this.Data=res.data.data;
                            this.Users = res.data.extra;
                            this.List = res.data.extra.lastest_activity;
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
                var title ='快来加入我们--'+this.Data.name;
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com'+this.Data.avatar;
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
            this.getDataOne();
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
    /*头部详情*/
    header{
        width: 100%;
        padding: 0.9375rem 0px;
        background-color: #fff;
        box-sizing: border-box;
        border-bottom: 2px solid #e5e6e9;
    }
    header .header{
        font-size: 1rem;
        color: #282828;
        text-align: center;
    }
    /*circle圈子信息*/
    .circle{
        width: 100%;
        background-color: #fff;
    }
    .circle .top{
        padding: 1.25rem 0.8125rem;
        box-sizing: border-box;
    }
    .circle .top .circle-name{
        width: 100%;
        height: 3.75rem;
        display: flex;
        align-items: center;
    }
    .circle .top .circle-name img{
        float: left;
        width: 3.75rem;
        height: 3.75rem;
        border: 2px solid #e5e6e9;
        border-radius: 50%;
        margin-right: 0.9375rem;
    }
    .circle .top .circle-name span{
        display: block;
    }
    .circle .top .circle-name .name{
        font-size: 1rem;
        color: #282828;
        font-weight: 600;
        margin-bottom: 0.3125rem;
    }
    .circle .top .circle-name .id{
        font-size: 0.9375rem;
        color: #656565;
    }
    /*圈子简介*/
    .circle .circle-jianjie{
        padding: 0px 1.125rem;
        font-size: 0.9375rem;
        color: #282828;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    /*location位置信息*/
    .circle .circle-location{
        padding: 1.25rem 1.125rem;
        box-sizing: border-box;
    }
    .circle .circle-location img{
        width: 1.25rem;
        height: 1.25rem;
        vertical-align: middle;
        margin-top: -0.3125rem;
        margin-right: 0.5rem;
    }
    .circle .circle-location span{
        font-size: 0.9375rem;
        color: #5e95f4;
    }
    /*content*/
    .content{
        width: 100%;
        background-color: #fff;
        margin-top:0.625rem;
    }
    .content .member{
        padding: 0.9375rem 0.75rem;
    }
    .content .member ul{
        float: left;
    }
    .content .member ul li{
        float: left;
        width: 2.8125rem;
        height: 2.8125rem;
        border: 2px solid #e5e6e9;
        border-radius: 50%;
        margin-right: 0.3125rem;
    }
    .content .member ul li:first-child{
        border: 2px solid #5e95f4;
    }
    .content .member ul li img{
        width: 100%;
        border-radius: 50%;
    }
    .content .member .num{
        font-size: 0.9375rem;
        color: #808080;
        float: right;
        line-height: 3rem;
    }
    .content .member .num img{
        width: 0.5rem;
        height: 0.8125rem;
        vertical-align: middle;
        margin-left: 0.75rem;
    }
    .content .circle-hot{
        padding: 0.9375rem 0.75rem;
        border-top: 1px solid #e5e6e9;
    }
    .content .circle-hot .hot-name{
        float: left;
        font-size: 1rem;
        color: #282828;
    }
    .content .circle-hot .hot-name img{
        width: 1.375rem;
        height: 1.375rem;
        margin-right: 0.9375rem;
        vertical-align: middle;
    }
    .content .circle-hot .hot-num{
        float: right;
    }
    .content .circle-hot .hot-num a{
        padding: 0.375rem 0.625rem;
        font-size: 0.875rem;
        color: #fff;
        background-color: #99cbff;
        border-radius: 4px;
        margin-right: 0.75rem;
    }
    .content .circle-hot .hot-num img{
        width: 0.5rem;
        height: 0.8125rem;
        vertical-align: middle;
    }
    /*圈子活动*/
    .activity{
        width: 100%;
        margin-top: 0.625rem;
        margin-bottom: 3.125rem;
    }
    .activity .activity-title{
        background-color: #fff;
        padding: 1.25rem 0.75rem 0px;
    }
    .activity .activity-title .left{
        float: left;
        font-size: 1rem;
        color: #282828;
    }
    .activity .activity-title .left img{
        width: 1.375rem;
        height: 1.375rem;
        margin-right: 0.9375rem;
        vertical-align: middle;
    }
    .activity .activity-title .right{
        float: right;
        font-size: 1rem;
        color: #808080;
    }
    .activity .activity-title .right img{
        width: 0.5rem;
        height: 0.8125rem;
        vertical-align: middle;
        margin-left: 0.75rem;
    }
    /*活动详情*/
    .activity .item{
        width: 100%;
        padding: 1.25rem 0.9375rem 0px;
        box-sizing: border-box;
        margin-bottom: 0.75rem;
        background-color: #fff;
    }
    .activity .item .item-name{
        padding: 0px 0px 0.75rem 0px;
        font-size: 1.0625rem;
        color: #282828;
        font-weight: 600;
    }
    .activity .item .item-info{
        width: 100%;
        padding-bottom: 0.9375rem;
        box-sizing: border-box;
    }
    .activity .item .item-info span:first-child{
        float: left;
        font-size: 0.8125rem;
        color: #282828;
    }
    .activity .item .item-info span:first-child a{
        margin-left: 0.625rem;
    }
    .activity .item .item-info span:last-child{
        float: right;
        font-size: 0.8125rem;
        color: #282828;
    }
    .activity .item .item-info span:last-child a{
        margin-left: 0.625rem;
    }
    .activity .item .item-img{
        width: 100%;
        position: relative;
    }
    .activity .item .item-img .label{
        position: absolute;
        top: 0;
        left: 0;
        width: 3.125rem;
        height: 3.125rem;
    }
    .activity .item .item-img img{
        display: block;
        width: 100%;
    }
    .activity .item .didian{
        padding: 0.9375rem 0px 1.25rem;
        box-sizing: border-box;
    }
    .activity .item .didian span:first-child{
        float: left;
        font-size: 0.875rem;
        color: #5e94f3;
    }
    .activity .item .didian span:first-child img{
        width: 0.8125rem;
        height: 0.8125rem;
        margin-right: 0.625rem;
        vertical-align: middle;
        margin-top: -0.25rem;
    }
    .activity .item .didian span:last-child{
        float: right;
        font-size: 0.875rem;
        color: #5e94f3;
    }
    .activity .item .didian span:last-child img{
        width: 0.8125rem;
        height: 0.8125rem;
        margin-left: 0.625rem;
        vertical-align: middle;
        margin-top: -0.25rem;
    }
    /*加入圈子*/
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
    /*微信*/
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