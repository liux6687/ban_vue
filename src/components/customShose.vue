<template>
  <div class="box">
    <div class="default-content">
      <div class="bigBox">
        <div class="bannerBox">
            <img :src="imgUrl+Data.custom_main_image">
            <span class="bannerBox"><img :src="imgUrl+User.avatar"></span>
        </div>
        <div class="main">
          <p class="mainTitle">{{Data.custom_post_name}}</p>
          <div class="original style1">
            <img :src="yuanxie">
            <span class="originals style2">
              <a v-for="(item,index) in Data.post_sku" :key="index">{{item.name}}</a>
            </span>
          </div>
          <div class="dingzhiID style1">
            <img :src="dingzhiID">
            <span class="dingzhiIDs style2">
              {{Data.custom_sn}}
            </span>
          </div>
          <div class="feiyong style1">
            <img :src="feiyong">
            <span class="feiyongs style2">
              ¥ {{Data.custom_price}}（仅手工费）
            </span>
          </div>
          <div class="zhouqi style1">
            <img :src="zhouqi">
            <span class="zhouqis style2">
              {{Data.custom_time}}天
            </span>
          </div>
          <div class="limited" v-if="Data.custom_number!=0">
            <img :src="limited" class="limiteds">{{Data.custom_number}}<img :src="shuang" class="shuang">
          </div>
        </div>
      </div>
      <div class="mode">
        <img :src="modeTitle" class="modeTitle">
        <div class="modeBox clearfix">
          <div class="leftMode">
            <img :src="mode1" v-if="sync.sync_diy" class="mode1">
            <img :src="mode1_d" v-else class="mode1">
            <img :src="mode2" v-if="sync.sync_stocks" class="mode2">
            <img :src="mode2_d" v-else class="mode2">
            <img :src="mode3" v-if="sync.sync_futures" class="mode3">
            <img :src="mode3_d" v-else class="mode3">
          </div>
          <div class="picture">
            <img :src="imgUrl+Data.custom_assist_image">
          </div>
        </div>  
        <v-touch v-on:swipeup="up" class="zouni">
          <img :src="goTop">
        </v-touch>
      </div>
    </div>  
    <mt-loadmore :top-method="loadTop" class="more-content" style="display:none">
        <!-- banner图 -->
        <div class="banner">
            <img :src="imgUrl+Data.custom_main_image">
            <span>定制ID：{{Data.id}}</span>
        </div>
        <!-- user用户 -->
        <div class="user">
            <span><img :src="imgUrl+User.avatar"></span>
            <p>{{User.name}}</p>
        </div>
        <!-- content内容 -->
        <div class="content">
            <div class="sanjiaoBox">
                <span class="sanjiao"></span>
            </div>
            <div class="title">
                {{Data.custom_post_name}}
            </div>
            <div class="miaoshu">
                {{Data.description}}
            </div>
            <div class="pic">
                <img :src="sanjiaoBottom" class="top">
                <!-- <video class="video" controls="controls" :src="url" width="100%" muted="true" loop autoplay>
                  <source :src="url" type="video/mp4">
                </video> -->
                <img :src="imgUrl+item" v-for="(item,index) in Data.custom_image_all" :key="index">
                <img :src="sanjiaoTop" class="bottom">
            </div>
            <div class="handle clearfix">
                <div class="handle-left">
                    {{Data.created_at | moment}}
                </div>
                <div class="handle-right">
                    <span>{{Data.like}}次点赞</span>
                    <span>{{Data.share}}次分享</span>
                </div>
            </div>
        </div>
        <!-- 评论 -->
        <div class="comment">
            <div class="comment-title">
              <span>全部评论</span>
              <span><a>{{Data.comment_cnt}}</a> 评论</span>
            </div>
            <div class="none" v-if="comment == 0" v-show="isTrue">
                <img :src="noComment">
                <p>还没有人评论</p>
            </div>
            <div class="item" v-for="(item,index) in comment" :key="index">
                <div class="itemTop">
                    <div class="itemImg">
                        <img :src="imgUrl+item.user.avatar">
                    </div>
                    <div class="itemName">
                        <p>{{item.user.name}}</p>
                        <span>{{item.content}}</span>
                    </div>
                </div>
                <div class="itemBottom">
                    <span class="itemTime">{{item.created_at | moment}}</span>
                    <span class="itemLaud"><a>回复</a> · <img :src="zan"> {{item.like_cnt}}</span>
                </div>
                <div class="commentSay">
                    <!-- <p v-for="(items,index) in item.children" :key="index" v-if="index<3">
                        <span class="commentUser">{{items.user.name}}<a>定制师</a>：</span>
                        <span class="commentContent">{{items.content}}</span>
                    </p> -->
                    <div class="commentMore" v-if="item.comment_cnt != 0" v-show="isTrue">
                        查看全部{{item.comment_cnt}}条评论 <span></span>
                    </div>
                </div>
            </div>
        </div>
    </mt-loadmore>
    <!-- 前往定制 -->
    <div class="goBan" style="display:none;">
        <a href="javascript:;" @click="judge()">前往定制</a> 
    </div>
    <div class="weixin">
        请在浏览器中打开
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      banner: require("../assets/img/actDetails/bigImg.png"),
      header: require("../assets/img/article/head1.png"),
      yuanxie: require("../assets/img/customShose/01.png"),
      dingzhiID: require("../assets/img/customShose/02.png"),
      feiyong: require("../assets/img/customShose/03.png"),
      zhouqi: require("../assets/img/customShose/04.png"),
      limited: require("../assets/img/customShose/limited.png"),
      shuang: require("../assets/img/customShose/shuang.png"),
      mode1: require("../assets/img/customShose/mode1.png"),
      mode1_d: require("../assets/img/customShose/mode1-d.png"),
      mode2: require("../assets/img/customShose/mode2.png"),
      mode2_d: require("../assets/img/customShose/mode2-d.png"),
      mode3: require("../assets/img/customShose/mode3.png"),
      mode3_d: require("../assets/img/customShose/mode3-d.png"),
      modeTitle: require("../assets/img/customShose/modeTitle.png"),
      goTop: require("../assets/img/customShose/more.png"),
      sanjiaoTop: require("../assets/img/customized/sanjiaoTop.png"),
      sanjiaoBottom: require("../assets/img/customized/sanjiaoBottom.png"),
      zan: require("../assets/img/customized/zan.png"),
      noComment: require("../assets/img/trends/无评论.png"), //没有评论
      isTrue: true,
      id: this.$route.params.id,
      Data: [],
      User: [],
      url: "",
      comment: [],
      sync: [],
      uuId: "",
      imgUrl: "https://static.tosneaker.com",
    };
  },
  components: {},
  methods: {
    judge: function() {
      $(".video").css("display", "none");
      var newId = this.id;
      var ua = window.navigator.userAgent.toLowerCase();
      //微信
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        document.getElementsByClassName("weixin")[0].style.display = "block";
      } else {
        //非微信浏览器
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          window.location.href = "iOSBAN://?customMadeDetailID=" + newId; //ios app协议
          window.setTimeout(function() {
            window.location.href =
              "https://www.tosneaker.com/app/download?ADTAG=396.487";
          }, 2000);
        } else if (navigator.userAgent.match(/android/i)) {
          window.location.href =
            "ban://tosneaker.android/custom/info?id=" + newId;
          setTimeout(function() {
            window.location.href =
              "https://www.tosneaker.com/app/download?ADTAG=370.486"; //android下载地址
          }, 2000);
        }
      }
    },
    up: function() {
      // if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
      $(".more-content").removeClass("animated bounceOutDown");
      $(".zouni").addClass("animated bounceOutUp");
      setTimeout(function() {
        $(".default-content").css("display", "none");
        $(".goBan").css("display", "block");
        $(document).scrollTop("0");
        $(".mint-loadmore-top").css("display", "none");
        $(".more-content").addClass("animated bounceInUp");
        $(".more-content").css("display", "block");
        $(".mint-loadmore-content").css(
          "transform",
          "translate3d(0px, 0px, 0px)"
        );
      }, 500);
      // }
    },
    loadTop: function() {
      $(".more-content").addClass("animated bounceOutDown");
      $(".zouni").removeClass("animated bounceOutUp");
      setTimeout(function() {
        $(".goBan").css("display", "none");
        $(".more-content").css("display", "none");
        $(".default-content").addClass("animated bounceInDown");
        $(".default-content").css("display", "block");
        $(".mint-loadmore-top").css("display", "none");
      }, 500);
    },
    uuid: function() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      this.uuId =
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4();
    },
    getData() {
      this.uuid();
      // var url = "https://www.tosneaker.test/api/ext/custom/post/show/" + this.id;
      var url = "http://tosneaker.test/api/ext/custom/post/" + this.id;
      this.$http.get(url, { params: { uniqid: this.uuId } }).then(
        res => {
          this.Data = res.data.data;
          this.User = res.data.data.user_profile;
          this.sync = res.data.data.sync;
          this.getConfig();
        },
        res => {}
      );
    },
    getConfig() {
      var url = location.href.split("#")[0];
      var dataUrl =
        "https://www.tosneaker.com/api/wechat/official-account/jssdk-config?jsApiList[]=onMenuShareQQ&jsApiList[]=onMenuShareWeibo";
      this.$http.get(dataUrl, { params: { url: url } }).then(res => {
        var res = res.data.data;
        this.wxInit(res);
      });
    },
    // 微信分享
    wxInit(res) {
      var title = "BAN第一家线上订制平台，数十位订制师打造最强阵容！";
      var link = location.href.split("#")[0];
      var links = link + "#/ext/activity/draw/" + this.id;
      var urlImg = "https://static.tosneaker.com" + this.Data.custom_main_image;
      var desc =
        "BAN订制专区内输入【" +
        this.Data.id +
        "】即可进行订制，还有机会免单哦~";
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: [
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone"
        ]
      });
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: "", // 分享链接
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
          }
        });
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: "", // 分享链接
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
          }
        });
        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: "", // 分享链接
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
          }
        });
        wx.onMenuShareQZone({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: "", // 分享链接
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
          }
        });
      });

      wx.error(function(err) {
        alert("出错了！");
        // $toast({
        //     message: JSON.stringify(err),
        //     position: 'middle',
        //     duration: 2000
        // })
        // alert(JSON.stringify(err));
      });
    },
    getComment() {
      var url = "/api/ext/custom/post/" + this.id + "/comments";
      this.$http.get(url).then(
        res => {
          this.comment = res.data.data;
        },
        res => {}
      );
    },
    loadUrl: function() {
      var _this = this;
      setTimeout(function() {
        _this.url =
          "http://img-cdn.wanyouxi.com/video/20170601_mdzz_recommend_video.mp4";
      }, 5000);
    }
  },
  mounted() {
    // $('.mint-loadmore-bottom').css('display','none');
    this.getData();
    this.getComment();
    // this.loadUrl();
  }
};
</script>

<style scoped>
@media only screen and (max-width: 1080px),
  only screen and (max-device-width: 1080px) {
  html,
  body {
    font-size: 46.08px;
  }
}
@media only screen and (max-width: 960px),
  only screen and (max-device-width: 960px) {
  html,
  body {
    font-size: 40.96px;
  }
}
@media only screen and (max-width: 800px),
  only screen and (max-device-width: 800px) {
  html,
  body {
    font-size: 34.13333333333333px;
  }
}
@media only screen and (max-width: 720px),
  only screen and (max-device-width: 720px) {
  html,
  body {
    font-size: 30.72px;
  }
}
@media only screen and (max-width: 640px),
  only screen and (max-device-width: 640px) {
  html,
  body {
    font-size: 27.30666666666667px;
  }
}
@media only screen and (max-width: 600px),
  only screen and (max-device-width: 600px) {
  html,
  body {
    font-size: 25.6px;
  }
}
@media only screen and (max-width: 540px),
  only screen and (max-device-width: 540px) {
  html,
  body {
    font-size: 23.04px;
  }
}
@media only screen and (max-width: 480px),
  only screen and (max-device-width: 480px) {
  html,
  body {
    font-size: 20.48px;
  }
}
@media only screen and (max-width: 414px),
  only screen and (max-device-width: 414px) {
  html,
  body {
    font-size: 17.664px;
  }
}
@media only screen and (max-width: 400px),
  only screen and (max-device-width: 400px) {
  html,
  body {
    font-size: 17.066666666666666px;
  }
}
@media only screen and (max-width: 375px),
  only screen and (max-device-width: 375px) {
  html,
  body {
    font-size: 16px;
  }
}
@media only screen and (max-width: 360px),
  only screen and (max-device-width: 360px) {
  html,
  body {
    font-size: 15.36px;
  }
}
@media only screen and (max-width: 320px),
  only screen and (max-device-width: 320px) {
  html,
  body {
    font-size: 13.653333333333334px;
  }
}
@media only screen and (max-width: 240px),
  only screen and (max-device-width: 240px) {
  html,
  body {
    font-size: 10.24px;
  }
}
.default-content {
  padding: 0px 0.75rem;
}
.bigBox {
  margin-top: 1.5rem;
}
/* banner图 */
.bannerBox {
  width: 100%;
  position: relative;
  padding: 0.75rem;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #fff;
}
.bannerBox img {
  width: 100%;
  height: 100%;
  display: block;
}
.bannerBox .bannerBox {
  width: 3.125rem;
  height: 3.125rem;
  padding: 0.125rem;
  background-color: #fff;
  position: absolute;
  top: -0.75rem;
  left: 0.75rem;
  border-radius: 50%;
}
.bannerBox .bannerBox img {
  display: inline-block;
  width: 100%;
  border-radius: 50%;
}
/* main部分 */
.main {
  width: 100%;
  padding: 0px 0.75rem 1.25rem;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
}
.main .mainTitle {
  font-size: 1.0625rem;
  color: #282828;
  font-weight: 600;
  margin-bottom: 0.625rem;
}
.main .style1 {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  padding-top: 0.625rem;
}
.main .style1 img {
  width: 3.75rem;
  height: 0.9375rem;
  margin-right: 0.9375rem;
  margin-top: 0.125rem;
}
.main .style1 .style2 {
  font-size: 0.9375rem;
  color: #282828;
}
.main .limited {
  width: 6.125rem;
  height: 3.75rem;
  background: url("../assets/img/customShose/limitedBG.png") no-repeat;
  background-size: 100%;
  position: absolute;
  right: 0;
  bottom: 0.75rem;
  text-align: center;
  line-height: 3.75rem;
  font-size: 1.125rem;
  color: #ffc700;
}
.main .limited .limiteds {
  width: 1.9375rem;
  height: 0.9375rem;
}
.main .limited .shuang {
  width: 0.9375rem;
  height: 0.9375rem;
}
.mode {
  margin-top: 0.75rem;
  background-color: #fff;
  padding: 0.75rem 0.75rem;
  box-sizing: border-box;
  position: relative;
}
.mode .modeTitle {
  position: absolute;
  left: 0;
  top: 0;
  width: 3.8125rem;
  height: 3.8125rem;
}
.mode .modeBox {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}
.mode .modeBox .leftMode {
  text-align: right;
}
/* .mode .leftMode img:nth-child(1) {
  width: 9.625rem;
  height: 2.75rem;
}
.mode .leftMode img:nth-child(2) {
  width: 5.875rem;
  height: 2.75rem;
}
.mode .leftMode img:nth-child(3) {
  width: 5.875rem;
  height: 2.75rem;
} */
.mode .leftMode .mode1 {
  width: 9.625rem;
  height: 2.75rem;
}
.mode .leftMode .mode2 {
  width: 5.875rem;
  height: 2.75rem;
}
.mode .leftMode .mode3 {
  width: 5.875rem;
  height: 2.75rem;
}
.mode .modeBox .picture {
  margin-left: 0.625rem;
}
.mode .modeBox .picture img {
  width: 7.5rem;
  height: 5rem;
}
.zouni {
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  color: #000;
  margin-top: 1.25rem;
}
.zouni img {
  display: block;
  width: 6.375rem;
  height: 3.0625rem;
  margin: 0 auto;
  animation: zoom 2s ease-in-out infinite;
  -webkit-animation: zoom 2s ease-in-out infinite;
}
@keyframes zoom {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
@-webkit-keyframes zoom {
  0% {
    -webkit-transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-20px);
  }
  100% {
    -webkit-transform: translateY(0);
  }
}

video::-internal-media-controls-download-button {
  display: none;
}
video::-webkit-media-controls-enclosure {
  overflow: hidden;
}
video::-webkit-media-controls-panel {
  width: calc(100% + 2.5rem);
}
/* banner图 */
.banner {
  width: 100%;
  position: relative;
}
.banner img {
  width: 100%;
  display: block;
}
.banner span {
  padding: 0.3125rem 0.625rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 0.875rem;
  position: absolute;
  bottom: 0.3125rem;
  right: 0.625rem;
}
/* user */
.user {
  position: relative;
  width: 100%;
  text-align: center;
  background-color: #fff;
}
.user span {
  display: inline-block;
  width: 4.6875rem;
  height: 4.6875rem;
  padding: 0.1875rem;
  background-color: #f5f5f5;
  border-radius: 50%;
  margin-top: -3.125rem;
}
.user span img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.user p {
  font-size: 0.875rem;
  color: #282828;
}
/* content部分 */
.content {
  width: 100%;
  padding: 0px 0.75rem;
  box-sizing: border-box;
  background-color: #fff;
  padding-top: 0.3125rem;
}
.content .sanjiaoBox {
  text-align: center;
  margin-bottom: -0.25rem;
}
.content .sanjiao {
  display: inline-block;
  border-top: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid #797979;
  border-right: 10px solid transparent;
}
.content .title {
  width: 100%;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  background-color: #797979;
  color: #fff;
  font-size: 1.25rem;
}
.content .miaoshu {
  padding: 1.25rem 0px 0.9375rem;
  line-height: 1.875rem;
}
.content .pic {
  width: 100%;
  text-align: center;
}
.content .pic img {
  display: block;
  margin-bottom: 0.9375rem;
}
.content .pic .top {
  display: inline-block;
  width: 0.8125rem;
  height: 0.8125rem;
  margin-bottom: 0.625rem;
}
.content .pic .bottom {
  display: inline-block;
  width: 0.8125rem;
  height: 0.8125rem;
  margin-bottom: 0px;
}
.content .handle {
  width: 100%;
  font-size: 0.8125rem;
  color: #989898;
  padding: 0.9375rem 0px 1.25rem;
  box-sizing: border-box;
}
.content .handle .handle-left {
  float: left;
}
.content .handle .handle-right {
  float: right;
}
.content .handle .handle-right span {
  margin-left: 1.25rem;
}
/* comment评论 */
.comment {
  width: 100%;
  background-color: #fff;
  margin-top: 0.75rem;
  margin-bottom: 3.125rem;
}
/* 没有评论 */
.none {
  width: 100%;
  height: 13rem;
  margin-top: 0.125rem;
  background-color: #fff;
  text-align: center;
}
.none img {
  width: 9.375rem;
  height: 4.875rem;
  margin-top: 2.875rem;
  margin-bottom: 1.6875rem;
}
.none p {
  color: #989898;
  font-size: 0.9375rem;
}
.comment .comment-title {
  padding: 1rem 0.75rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.comment .comment-title span a {
  color: #5e94f5;
}
.comment .item {
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  padding: 1.25rem 0.75rem;
  box-sizing: border-box;
}
.comment .item .itemTop {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
}
.comment .item .itemTop img {
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 50%;
  margin-right: 0.75rem;
}
.comment .item .itemTop p {
  font-size: 0.875rem;
  color: #5e94f5;
}
.comment .item .itemTop span {
  font-size: 1rem;
  color: #282828;
}
.comment .item .itemBottom {
  margin-left: 3.125rem;
  margin-top: 0.75rem;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.comment .item .itemBottom .itemTime {
  font-size: 0.8125rem;
  color: #989898;
}
.comment .item .itemBottom .itemLaud {
  font-size: 0.8125rem;
  color: #5e94f5;
}
.comment .item .itemBottom .itemLaud a {
  font-size: 0.8125rem;
  color: #656565;
}
.comment .item .itemBottom .itemLaud img {
  width: 0.9375rem;
  height: 0.9375rem;
  vertical-align: middle;
  margin-top: -0.3125rem;
}
.comment .item .commentSay {
  margin-left: 3.125rem;
  margin-top: 0.75rem;
  /* padding: 0.75rem 0.5625rem; */
  box-sizing: border-box;
  background-color: #f2f2f2;
  border-radius: 4px;
}
.comment .item .commentSay p:nth-child(1) {
  padding-top: 0.75rem;
}
.comment .item .commentSay p {
  /* margin-bottom: 0.625rem; */
  padding: 0.625rem 0.5625rem 0rem;
}
.comment .item .commentSay p .commentUser {
  font-size: 0.875rem;
  color: #5e94f5;
}
.comment .item .commentSay p .commentUser a {
  font-size: 0.6875rem;
  color: #5e94f5;
  border: 1px solid #5e94f5;
  border-radius: 5px;
  margin-left: 0.4375rem;
  padding: 0.0625rem;
  box-sizing: border-box;
}
.comment .item .commentSay p .commentContent {
  font-size: 0.875rem;
  color: #282828;
}
.comment .item .commentSay .commentMore {
  font-size: 0.8125rem;
  color: #989898;
  padding: 0.625rem 0.5625rem 0.75rem;
}
.comment .item .commentSay .commentMore span {
  display: inline-block;
  border-left: 5px solid #989898;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid transparent;
}
/* 前往鉴定 */
.goBan {
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
.goBan a {
  display: inline-block;
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  font-size: 0.9375rem;
  color: #fff;
  background-color: #5e95f4;
}
.weixin {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  z-index: 99;
  color: #fff;
  font-size: 2rem;
  text-align: center;
  padding-top: 20%;
  display: none;
}
</style>


