<template>
    <div>
        <!--大图-->
        <div class="details-img">
            <img :src="Data.image">
        </div>
        <!--@用户部分-->
        <div class="choose">
            <p>
                <img :src="'https://static.tosneaker.com'+Vote.user_avatar">
                <span><a>{{Vote.join_no}}号</a>@{{Vote.user_name}}</span>
            </p>
            <img :src="'https://static.tosneaker.com'+Vote.image">
        </div>
        <!--详情区域-->
        <div class="activityOut">
            <div class="activity">
                <img :src="sanjiao" class="sanjiao">
                <div class="activity-top">
                    <h2>{{Data.name}}</h2>
                    <p>[奖品设置]</p>
                    <span><pre>{{Data.prize}}</pre></span>
                </div>
                <div class="activity-bottom clearfix">
                    <div class="enroll-end end">
                        <span>报名截止：</span>
                        <p>{{Data.deadline_time}}</p>
                    </div>
                    <span class="slash"></span>
                    <div class="activity-end end">
                        <span>活动结束：</span>
                        <p>{{Data.end_time}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!--活动规则-->
        <div class="rule">
            <h2>活动规则</h2>
            <div class="rule-content">
                <p><pre>{{Data.rule}}</pre></p>
            </div>
        </div>
        <!--参与用户-->
        <div class="user">
            <div class="user-title">
                <span class="title">参与用户</span>
                <span class="user-num">{{Data.join_num}}人</span>
            </div>
            <div class="user-item">
                <div class="item" v-for="(item,index) in Extra" :key="index">
                    <div class="left">
                        <div class="num">{{item.join_no}}号</div>
                        <div class="user-info">
                            <img :src="'https://static.tosneaker.com'+item.avatar">
                            <div class="info">
                                <p>{{item.name}} <span>{{item.join_at}}</span></p>
                                <p>{{item.bio}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="follow" @click="judge()">
                        关注
                    </div>
                </div>
            </div>
        </div>
        <!--参与报名-->
        <div class="join" @click="judge()">
            给TA投票
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
                header:require('../assets/img/article/head1.png'),
                sanjiao:require('../assets/img/article/bule-right.png'),
                id:this.$route.params.id,
                vote:this.$route.query.vote_id,
                Data:[],
                Extra:[],
                Vote:[],
                status:[],
                name:[]
            }
        },
        components: {},
        methods: {
            judge:function(){
                var newId = this.id;
                var newStatus = this.status;
                var newName = this.name;
                var ua = window.navigator.userAgent.toLowerCase();
                //微信
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    document.getElementsByClassName('weixin')[0].style.display = 'block';
                }else{//非微信浏览器
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                        window.location.href = "iOSBAN://?showActivityVoteID="+newId;//ios app协议
                        window.setTimeout(function() {
                            window.location.href = "https://www.tosneaker.com/app/download?ADTAG=396.393";
                        }, 2000);
                    }else if (navigator.userAgent.match(/android/i)) {
                        window.location.href = 'ban://tosneaker.android/sys/activity/show/vote?id='+newId+'&status='+newStatus+'&name'+newName;
                        setTimeout(function(){
                            window.location.href= "https://www.tosneaker.com/app/download?ADTAG=370.336"; //android下载地址
                        },2000);
                    }
                }
            },
            getData(){
                var url = '/api/ext/activity-vote/'+this.id+'?vote_id='+this.vote
                this.$http.get(url).then(
                        res=>{
                            this.Data = res.data.data;
                            this.Extra = res.data.extra;
                            this.Vote = res.data.vote;
                            this.status = this.Data.activity_status;
                            this.name = this.Data.name;
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
    .choose{
        width: 100%;
        background-color: #fff;
        padding: 0px 0.75rem 1.25rem;
        box-sizing: border-box;
    }
    .choose p{
        padding: 1.25rem 0px 0.9375rem;
    }
    .choose p img{
        width: 2.1875rem;
        height: 2.1875rem;
        margin-right: 0.625rem;
        vertical-align: middle;
    }
    .choose p span{
        font-size: 0.9375rem;
    }
    .choose p span a{
        color: #5e94f5;
        font-size: 0.9375rem;
    }
    .choose img{
        width: 100%;
        border-radius: 5px;
    }
    /*详情区域*/
    .activityOut{
        width: 100%;
        padding: 0px 0.75rem;
        box-sizing: border-box;
        margin-top: 0.625rem;
    }
    .activityOut .activity{
        background-color: #fff;
        position: relative;
    }
    .activityOut .activity .sanjiao{
        width: 1.8125rem;
        height: 1.8125rem;
        position: absolute;
        top: 0;
        right: 0;
    }
    .activityOut .activity .activity-top{
        padding: 0px 0.9375rem 0.9375rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e7e7e7;
    }
    .activityOut .activity .activity-top h2{
        font-size: 0.9375rem;
        color: #333;
        padding: 1.125rem 0px 0.9375rem;
    }
    .activityOut .activity .activity-top p{
        font-size: 0.875rem;
        color: #62666e;
        padding-bottom: 0.3125rem;
    }
    .activityOut .activity .activity-top span{
        font-size: 0.875rem;
        color: #62666e;
    }
    .activityOut .activity .activity-bottom{
        padding: 0px 1.5625rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e7e7e7;
    }
    .activityOut .activity .activity-bottom .enroll-end{
        float: left;
        margin-top: 0.9375rem;
    }
    .activityOut .activity .activity-bottom .slash{
        float: left;
        display: inline-block;
        width: 0.0625rem;
        height: 5rem;
        background-color: #f1f1f1;
        transform:rotate(7deg);
        -ms-transform:rotate(7deg); 	/* IE 9 */
        -moz-transform:rotate(7deg); 	/* Firefox */
        -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
        -o-transform:rotate(7deg);
        margin: 0px 1.5625rem 0px 1.5625rem;
    }
    .activityOut .activity .activity-bottom .activity-end{
        float: left;
        margin-top: 0.9375rem;
    }
    .activityOut .activity .activity-bottom .end span{
        font-size: 0.875rem;
        color: #62666e;
        font-weight: 600;
    }
    .activityOut .activity .activity-bottom .end p{
        font-size: 1.125rem;
        color: #5e94f3;
        font-weight: 600;
    }
    /*活动规则*/
    .rule{
        width: 100%;
        background-color: #fff;
        padding: 0.9375rem 0.75rem;
        box-sizing: border-box;
        margin-top: 0.625rem;
    }
    .rule h2{
        font-size: 0.9375rem;
        color: #333;
    }
    .rule .rule-content{
        margin-top: 0.9375rem;
    }
    .rule .rule-content p{
        font-size: 0.875rem;
        color: #62666e;
    }
    /*参与用户*/
    .user{
        width: 100%;
        margin-top: 0.625rem;
        margin-bottom: 3.125rem;
    }
    .user .user-title{
        width: 100%;
        height: 3.4375rem;
        line-height: 3.4375rem;
        background-color: #fff;
        padding: 0px 0.75rem;
        box-sizing: border-box;
        border-bottom: 1px solid #f2f2f2;
    }
    .user .user-title .title{
        float: left;
        font-size: 0.9375rem;
        color: #282828;
    }
    .user .user-title .user-num{
        float: right;
        font-size: 0.9375rem;
        color: #5e95f4;
    }
    .user .user-item{
        padding: 0px 0.75rem;
        background-color: #fff;
    }
    .user .user-item .item{
        width: 100%;
        height:4.6875rem;
        border-bottom: 1px solid #f2f2f2;
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        -webkit-justify-content:space-between;
        justify-content:space-between;
    }
    .user .user-item .item .left{
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        -webkit-justify-content:flex-start;
        justify-content:flex-start;
    }
    .user .user-item .item .num{
        font-size: 0.9375rem;
        color: #282828;
        margin-right: 0.625rem;
    }
    .user .user-item .item .user-info{
        display:-webkit-flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        -webkit-justify-content:flex-start;
        justify-content:flex-start;
    }
    .user .user-item .item .user-info img{
        width: 2.875rem;
        height:2.875rem;
        margin-right: 0.75rem;
    }
    .user .user-item .item .user-info .info p:nth-child(1){
        font-size: 0.9375rem;
        color: #282828;
    }
    .user .user-item .item .user-info .info p:nth-child(1) span{
        font-size: 0.75rem;
        color: #989898;
    }
    .user .user-item .item .user-info .info p:nth-child(2){
        width: 9.375rem;
        font-size: 0.8125rem;
        color: #989898;
        margin-top: 0.3125rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .user .user-item .item .follow{
        width: 4.25rem;
        height: 1.9375rem;
        text-align: center;
        line-height: 1.875rem;
        font-size: 0.875rem;
        background-color: #5e95f4;
        color: #fff;
    }
    /*参与报名*/
    .join{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3.125rem;
        background-color: #5e95f4;
        text-align: center;
        line-height: 3.125rem;
        color: #fff;
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