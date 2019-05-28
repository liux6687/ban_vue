<template>
    <div>
        <!-- 鉴定师部分 -->
        <div class="identifier">
            <ul class="clearfix">
                <li>
                    <p class="identifier-img">
                        <img :src="'https://static.tosneaker.com'+appraisersOne.appraiser_avatar" v-if="Data.final_result ==0 || Data.final_result ==1 || Data.final_result ==2">
                        <img :src="headerLight" v-else-if="appraisersNum >= 1">
                        <img :src="headerblack" v-else>
                    </p>
                    <span class="go" v-if="appraisersOne.add_status == 1 && appraisersOne.result == 10" v-show="isTrue">待补图</span>
                    <span class="identified" v-else-if="appraisersOne.add_status == 2 && appraisersOne.result == 10" v-show="isTrue">已补图</span>
                    <span class="complementation" v-else-if="appraisersOne.add_status == 0 ||appraisersOne.add_status == 1 || appraisersOne.add_status == 2 && appraisersOne.result == 0 || appraisersOne.result == 1 || appraisersOne.result == 2" v-show="isTrue">已鉴定</span>
                    <span class="empty" v-else-if="appraisersNum != 1" v-show="isTrue"></span>
                </li>
                <li>
                    <p class="identifier-img">
                        <img :src="'https://static.tosneaker.com'+appraisersTwo.appraiser_avatar" v-if="Data.final_result ==0 || Data.final_result ==1 || Data.final_result ==2">
                        <img :src="headerLight" v-else-if="appraisersNum >= 2">
                        <img :src="headerblack" v-else>
                    </p>
                    <span class="go" v-if="appraisersTwo.add_status == 1 && appraisersTwo.result == 10" v-show="isTrue">待补图</span>
                    <span class="identified" v-else-if="appraisersTwo.add_status == 2 && appraisersTwo.result == 10" v-show="isTrue">已补图</span>
                    <span class="complementation" v-else-if="appraisersTwo.add_status == 0 ||appraisersTwo.add_status == 1 || appraisersTwo.add_status == 2 && appraisersTwo.result == 0 || appraisersTwo.result == 1 || appraisersTwo.result == 2" v-show="isTrue">已鉴定</span>
                    <span class="empty" v-else-if="appraisersNum != 2" v-show="isTrue"></span>
                </li>
                <li>
                    <p class="identifier-img">
                        <img :src="'https://static.tosneaker.com'+appraisersThree.appraiser_avatar" v-if="Data.final_result ==0 || Data.final_result ==1 || Data.final_result ==2">
                        <img :src="headerLight" v-else-if="appraisersNum >= 3">
                        <img :src="headerblack" v-else>
                    </p>
                    <span class="go" v-if="appraisersThree.add_status == 1 && appraisersThree.result == 10" v-show="isTrue">待补图</span>
                    <span class="identified" v-else-if="appraisersThree.add_status == 2 && appraisersThree.result == 10" v-show="isTrue">已补图</span>
                    <span class="complementation" v-else-if="appraisersThree.add_status == 0 ||appraisersThree.add_status == 1 || appraisersThree.add_status == 2 && appraisersThree.result == 0 || appraisersThree.result == 1 || appraisersThree.result == 2" v-show="isTrue">已鉴定</span>
                    <span class="empty" v-else-if="appraisersNum != 3" v-show="isTrue"></span>
                </li>
                <li>
                    <p class="identifier-img">
                        {{Data.consume_time}}
                    </p>
                    <span><img :src="time"></span>
                </li>
            </ul>
        </div>
        <!-- 鉴定信息 -->
        <div class="info-title">
            鉴定结果根据用户提供信息得出
        </div>
        <div class="info">
            <img :src="search">BAN装备鉴定内输入<span>{{Data.appr_sn}}</span>查询鉴定记录
            <img :src="jia" class="styleTwo" v-if="Data.final_result == 0">
            <img :src="really" class="styleTwo" v-else-if="Data.final_result == 1">
            <img :src="no_way" class="styleTwo" v-else-if="Data.final_result == 2">
            <img :src="to_be_identified" class="styleOne" v-else-if="Data.final_result == 10">
            <img :src="pending_map" class="styleOne" v-else-if="Data.final_result == 11">
            <img :src="Identification1" class="styleOne" v-else-if="Data.final_result == 12 && Data.valid_appraise_num == 1">
            <img :src="Identification2" class="styleOne" v-else-if="Data.final_result == 12 && Data.valid_appraise_num == 2">
            <img :src="Identification3" class="styleOne" v-else-if="Data.final_result == 12 && Data.valid_appraise_num == 3">
        </div>
        <!-- 用户信息 -->
        <div class="user">
            <!-- 用户姓名 -->
            <div class="user-info clearfix">
                <img :src="'https://static.tosneaker.com'+Data.user_avatar">
                <span>{{Data.user_name}}</span><span>{{Data.publish_at}}</span>
            </div>
            <!-- 鞋子信息 -->
            <div class="shose-info">
                <p>{{Data.cloud_sku_name}}</p>
                <p>{{Data.item_no}}</p>
            </div>
            <!-- 用户要求 -->
            <div class="say">
                {{Data.description}}
            </div>
            <!-- 鞋子详情 -->
            <div class="shose-details">
                <div class="pic" v-for="(item,index) in defaultImg" :key="index">
                    <img :src="'https://static.tosneaker.com'+item.path">
                    <span>{{item.position_name}}</span>
                </div>
                <div class="pic" v-for="(item,index) in othersImg">
                    <img :src="'https://static.tosneaker.com'+item.path">
                    <span>{{item.position_name}}</span>
                </div>
            </div>
        </div>
        <!-- 评论 -->
        <div class="comment">
            <div class="comment-num">
                <span>评论 {{comment.length}}</span>
                <!-- <span><a>830</a> 赞</span> -->
            </div>
            <div class="none" v-if="comment.length == 0" v-show="isTrue">
                <img :src="noComment">
                <p>还没有人评论</p>
            </div>
            <div class="items">
                <div class="item" v-for="(item,index) in comment" :key="index">
                    <div class="top clearfix">
                        <div class="topLeft">
                            <img :src="'https://static.tosneaker.com'+item.user.avatar">
                            <p>{{item.user.name}}</p>
                            <span>{{item.content}}</span>
                        </div>
                        <div class="topRight">
                            <img :src="zan"> {{item.like_cnt}}
                        </div>
                    </div>
                    <div class="bottom clearfix">
                        <div class="bottomLeft">
                            {{item.created_at | moment}} · <span>{{item.comment_cnt}}回复</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 前往鉴定 -->
        <div class="goBan">
            <a href="javascript:;" @click="judge()">前往鉴定</a> 
        </div>
        <div class="weixin">
            请在浏览器中打开
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import wx from 'weixin-js-sdk'
    export default {
        data(){
            return{
                headerLight:require('../assets/img/appraisal/header_light.png'),
                headerblack:require('../assets/img/appraisal/header_black.png'),
                time:require('../assets/img/appraisal/time.png'),
                to_be_identified:require('../assets/img/appraisal/to_be_identified.png'),//待鉴定
                pending_map:require('../assets/img/appraisal/pending_map.png'),//待补图
                Identification1:require('../assets/img/appraisal/Identification1.png'),//鉴定中1
                Identification2:require('../assets/img/appraisal/Identification2.png'),//鉴定中2
                Identification3:require('../assets/img/appraisal/Identification3.png'),//鉴定中3
                really:require('../assets/img/appraisal/really.png'),//鉴定为真
                jia:require('../assets/img/appraisal/false.png'),//鉴定为假
                no_way:require('../assets/img/appraisal/no_way.png'),//无法鉴定
                search:require('../assets/img/appraisal/search.png'),
                head:require('../assets/img/article/head1.png'),
                buchong:require('../assets/img/appraisal/buchong.png'),//补充
                cebiao:require('../assets/img/appraisal/cebiao.png'),//侧标
                fanmian:require('../assets/img/appraisal/fanmian.png'),//反面
                gangyin:require('../assets/img/appraisal/gangyin.png'),//钢印
                hegezheng:require('../assets/img/appraisal/hegezheng.png'),//合格证
                hougen:require('../assets/img/appraisal/hougen.png'),//后跟
                toubu:require('../assets/img/appraisal/toubu.png'),//头部
                waiguan:require('../assets/img/appraisal/waiguan.png'),//外观
                xiebiao:require('../assets/img/appraisal/xiebiao.png'),//鞋标
                xiecheng:require('../assets/img/appraisal/xiecheng.png'),//鞋撑
                xiedi:require('../assets/img/appraisal/xiedi.png'),//鞋底
                zhengbiao:require('../assets/img/appraisal/zhengbiao.png'),//正标
                zhengmian:require('../assets/img/appraisal/zhengmian.png'),//正面
                zouxian:require('../assets/img/appraisal/zouxian.png'),//走线
                zan:require('../assets/img/appraisal/zan.png'),
                noComment:require('../assets/img/trends/无评论.png'),//没有评论
                isTrue:true,
                noPeople:1,
                id:this.$route.params.id,
                Data:[],
                appraisers:[],
                appraisersOne:[],
                appraisersTwo:[],
                appraisersThree:[],
                appraisersNum:[],
                defaultImg:[],
                othersImg:[],
                comment:[],
            }
        },
        components:{},
        methods:{
            judge:function(){
                var newId = this.id
                var ua = window.navigator.userAgent.toLowerCase();
                //微信
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    document.getElementsByClassName('weixin')[0].style.display = 'block';
                }else{//非微信浏览器
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                        window.location.href = "iOSBAN://?determineDetailID="+newId;//ios app协议
                        window.setTimeout(function() {
                            window.location.href = "https://www.tosneaker.com/app/download?ADTAG=396.480";
                        }, 2000);
                    }else if (navigator.userAgent.match(/android/i)) {
                        window.location.href = 'ban://tosneaker.android/appraise/info?id='+newId;
                        setTimeout(function(){
                            window.location.href= "https://www.tosneaker.com/app/download?ADTAG=370.479"; //android下载地址
                        },2000);
                    }
                }
            },
            getData(){
                var url = 'https://www.tosneaker.com/api/appraisal/post/'+this.id
                this.$http.get(url).then(
                    res=>{
                        this.Data = res.data.data;  
                        this.appraisers = res.data.appraisers;
                        for(var app in this.appraisers){
                            if(app == 0){
                                this.appraisersOne = this.appraisers[app]
                            }else if(app == 1){
                                this.appraisersTwo = this.appraisers[app]
                            }else if(app == 2){
                                this.appraisersThree = this.appraisers[app]
                            }
                        }
                        this.appraisersNum = this.appraisers.length;
                        this.defaultImg = res.data.default_images;
                        this.othersImg = res.data.others_images;
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
                var title ='BAN独创鉴定2.0方案，让假货原形毕露！';
                var link = location.href.split('#')[0];
                var links = link+'#/ext/activity/draw/'+this.id;
                var urlImg = 'https://static.tosneaker.com'+this.Data.image;
                var desc = 'BAN装备鉴定内输入【'+this.Data.appr_sn+'】查询此鉴定贴';
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
                var url = '/api/appraisal/post-comment?post_id='+this.id+'&page=1'
                this.$http.get(url).then(
                    res=>{
                        this.comment = res.data.data;
                    }
                )
            }
        },
        mounted(){
            this.getData();
            this.getComment();
        }
    };
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
  .identifier{
        width: 100%;
        padding: 1.25rem 0px;
        background-color: #fff;
        text-align: center;
    }
    .identifier ul{
        display:-webkit-flex;
	    display:flex;
        -webkit-justify-content:space-between;
	    justify-content:space-between;
    }
    .identifier ul li{
        /* float: left;
        margin: 0 1.25rem; */
    }
    .identifier ul li p{
        width: 3.3125rem;
        height: 3.3125rem;
        border-radius: 50%;
    }
    .identifier ul li p img{
        width: 3.3125rem;
        height: 3.3125rem;
        border-radius: 50%;
    }
    .identifier ul li .go{
        display: inline-block;
        width: 3.3125rem;
        height: 1.5625rem;
        background-color: #5e94f5;
        border-radius: 20px;
        margin-top: 0.75rem;
        font-size: 0.8125rem;
        line-height: 1.5625rem;
        color: #fff;
    }
    .identifier ul li .identified{
        display: inline-block;
        width: 3.3125rem;
        height: 1.5625rem;
        background-color: #eceef5;
        border-radius: 20px;
        margin-top: 0.75rem;
        font-size: 0.8125rem;
        line-height: 1.5625rem;
    }
    .identifier ul li .complementation{
        display: inline-block;
        width: 3.3125rem;
        height: 1.5625rem;
        background-color: #eceef5;
        border-radius: 20px;
        margin-top: 0.75rem;
        font-size: 0.8125rem;
        line-height: 1.5625rem;
    }
    .identifier ul li .empty{
        display: inline-block;
        width: 0.8125rem; 
        height: 0.8125rem;
        background-color: #eceef5;
        border-radius: 50%;
        margin-top: 0.75rem;
    }
    .identifier ul li:last-child p{
        width: 3.25rem;
        height: 3.25rem;
        border: 2px solid #5e94f5;
        text-align: center;
        line-height: 3.25rem;
        color: #5e94f5;
        font-size: 0.8125rem;
        font-weight: 600; 
    }
    .identifier ul li:last-child span{
        display: inline-block;
        width: 3.3125rem;
        height: 1.5625rem;
        border-radius: 20px;
        margin-top: 0.75rem;
        font-size: 0.8125rem;
        line-height: 1.5625rem;
        background-color: transparent;
    }
    /* 鉴定信息 */
    .info-title{
        width: 100%;
        text-align: center;
        background-color: #fff;
        padding: 0.375rem 0px 0.875rem;
        font-size: 0.75rem;
        color: #282828;
    }
    .info{
        width: 100%;
        height: 2.625rem;
        line-height: 2.625rem;
        padding: 0px 0.75rem;
        box-sizing: border-box;
        background-color: #f2f2f2;
        font-size: 0.8125rem;
        color: #989898;
        position: relative;
    }
    .info img{
        display: inline-block;
        vertical-align: middle;
        width: 1rem;
        height: 1rem;
        margin-right: 0.4375rem;
    }
    .info span{
        padding: 0.3125rem 0.4375rem;
        background-color: #989898;
        border-radius: 4px;
        margin: 0 0.4375rem;
        color: #fff;
    }
    .info .styleOne{
        position: absolute;
        right: 0;
        top: 3.875rem;
        width: 3.5625rem;
        height: 1.5625rem; 
    }
    .info .styleTwo{
        position: absolute;
        right: 0;
        top: 3.375rem;
        width: 7.9375rem;
        height: 5.375rem;
    }
    /* 用户信息 */
    .user{
        width: 100%;
        background-color: #fff;
        padding-top: 1.25rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-bottom: 0.9375rem;
        box-sizing: border-box;
    }
    /* 用户姓名 */
    .user .user-info{
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        padding-bottom: 0.625rem;
    }
    .user .user-info img{
        float: left;
        width: 2.5rem; 
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.3125rem;
    }
    .user .user-info span{
        margin-left: 0.625rem;
        font-size: 0.875rem;
        color: #282828;
    }
    /* 鞋子信息 */
    .user .shose-info{
        padding: 1.0625rem 1.25rem;
        background-color: #f9f9f9;
    }
    .user .shose-info p:nth-child(1){
        font-size: 1.375rem;
        color: #282828;
    }
    .user .shose-info p:nth-child(2){
        font-size: 1.125rem;
        color: #282828;
    }
    /* 用户要求 */
    .user .say{
        padding: 1.25rem 0px;
        font-size: 0.9375rem;
        color: #282828;
    }
    /* 鞋子详情 */
    .user .shose-details .pic{
        width: 100%;
        position: relative;
        margin-bottom: 0.9375rem;
    }
    .user .shose-details .pic img{
        display: block;
        border-radius: 8px;
    }
    .user .shose-details .pic span{
        position: absolute;
        top: 0.5625rem;
        left: 0.5625rem;
        padding: 0.5625rem 0.5rem;
        border: 1px solid #fff;
        color: #fff;
        font-size: 0.8125rem;
        border-radius: 5px;
        background-color: rgba(0,0,0,.4);
        border-bottom-right-radius: 1.125rem;
    }
    /* 评论 */
    .comment{
        width: 100%;
        background-color: #fff;
        margin-top: 0.625rem;
        margin-bottom: 3.125rem;
    }
    .comment .comment-num{
        width: 100%;
        height: 3.25rem;
        line-height: 3.25rem;
        padding: 0px 0.75rem;
        box-sizing: border-box;
        border-bottom: 1px solid #f2f2f2;
    }
    .comment .comment-num span:nth-child(1){
        float: left;
        font-size: 0.9375rem;
        color: #282828;
    }
    .comment .comment-num span:nth-child(2){
        float: right;
        font-size: 0.9375rem;
        color: #282828;
    }
    .comment .comment-num span:nth-child(2) a{
        color: #5e94f5;
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
    .comment .items{
        width: 100%;
        padding: 0px 0.75rem;
        box-sizing: border-box;
    }
    .comment .items .item{
        border-bottom: 1px solid #f2f2f2;
        padding: 0.9375rem 0px;
    }
    .comment .items .item .top{
        padding-bottom: 0.9375rem;
    }
    .comment .items .item .top .topLeft{
        float: left;
        width: 88%;
    }
    .comment .items .item .top .topLeft img{
        float: left;
        width: 2.0625rem;
        height: 2.0625rem;
        border-radius: 50%;
        margin-right: 0.75rem;
    }
    .comment .items .item .top .topLeft p{
        font-size: 0.875rem;
        color: #5e94f5;
    }
    .comment .items .item .top .topLeft span{
        font-size: 0.9375rem;
        color: #282828;
    }
    .comment .items .item .top .topRight{
        float: right;
        font-size: 0.875rem;
        color: #989898;
    }
    .comment .items .item .top .topRight img{
        width: 0.9375rem;
        height: 0.9375rem;
    }
    .comment .items .item .bottom .bottomLeft{
        float: left;
        margin-left: 2.8125rem;
        font-size: 0.8125rem;
        color: #282828;
    }
    .comment .items .item .bottom .bottomLeft span{
        padding: 0.3125rem 0.5rem;
        background-color: #f2f2f2;
        border-radius: 15px;
    }
    .comment .items .item .bottom .bottomRight{
        float: right;
        font-size: 0.8125rem;
        color: #282828;
    }
    /* 前往鉴定 */
    .goBan{
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
    .goBan a{
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


