<template>
    <div @click="all()">
        <!--轮播图-->
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="(item,index) in Data.goods_images" :key="index">
                <img :src="'https://static.tosneaker.com'+item">
            </mt-swipe-item>
        </mt-swipe>
        <!--namePrice区域-->
        <div class="namePrice">
            <div class="name public">
                {{Data.name}}
            </div>
            <div class="price public">
                ¥ {{Extra.price_range}}
            </div>
            <div class="standard public">
                <span v-for="(item,index) in Data.service_info" :key="index"><img :src="right"> {{item.name}}</span>
            </div>
        </div>
        <!--选择区域-->
        <div class="choose">
            <div class="choose-size public" @click="show()">
                请选择 尺码 颜色
            </div>
            <div class="choose-parameter public">
                购买须知/售后说明/尺码参数
            </div>
        </div>
        <!--table部分-->
        <div class="table">
            <mt-navbar class="page-part" v-model="selected">
                <mt-tab-item id="1">商品描述</mt-tab-item>
                <mt-tab-item id="2">配置信息</mt-tab-item>
                <mt-tab-item id="3">评价</mt-tab-item>
            </mt-navbar>
            <mt-tab-container class="page-content public" v-model="selected">
                <mt-tab-container-item id="1" class="three">
                    <span class="new-content" v-html="Data.detail"></span>
                </mt-tab-container-item>
                <mt-tab-container-item id="2" class="one">
                    前往APP查看
                </mt-tab-container-item>
                <mt-tab-container-item id="3" class="two">
                    前往APP查看
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <!--前往商城-->
        <div class="shop">
            <a href="javascript:;">
                下载APP
            </a>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      out: require("../assets/img/out.jpg"),
      right: require("../assets/img/对号(2).png"),
      notice: require("../assets/img/购买须知.png"),
      selected: "1",
      num: 1,
      isTrue: false,
      items: [
        { mes: "白色" },
        { mes: "黑色" },
        { mes: "紫色" },
        { mes: "白色" }
      ],
      sizes: [
        { size: "34" },
        { size: "34" },
        { size: "34" },
        { size: "34" },
        { size: "34" },
        { size: "34" },
        { size: "34" }
      ],
      active: false,
      //                获取url参数
      id: this.$route.params.id,
      //                获取到的数据
      Data: [],
      Extra: [],
      Spec: [],
      Stock: [],
      useColorId: [],
      useSizeId: [],
      newId: [],
      colorindex: 0, //初始化第一个高亮
      sizeindex: 0,
      Content: [],
      img: []
    };
  },
  components: {},
  methods: {
    all: function() {
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
          return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Windows()
          );
        }
      };
      if (isMobile.iOS()) {
        location.href = "https://www.tosneaker.com/app/download?ADTAG=396.386";
      } else if (isMobile.Android()) {
        location.href = "https://www.tosneaker.com/app/download?ADTAG=370.343";
      }
    },
    //            数据交互
    getData() {
      var url = "/api/mall/goods/" + this.id;
      this.$http.get(url).then(
        res => {
          this.Data = res.data.data;
          for (var img in this.Data.goods_images) {
            if (img == 0) {
              this.img = this.Data.goods_images[img];
            }
          }
          this.Extra = res.data.extra;
          this.Spec = res.data.extra.spec;
          this.Stock = res.data.extra.stock;
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
      var title = this.Data.name;
      var link = location.href.split("#")[0];
      var links = link + "#/ext/activity/draw/" + this.id;
      var urlImg = "https://static.tosneaker.com" + this.img;
      var desc = "";
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
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    $route: "getData"
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
/*轮播区域*/
.mint-swipe {
  width: 100%;
  height: 15rem;
}
.mint-swipe .mint-swipe-items-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #fff;
}
.mint-swipe-indicator {
  width: 0.6875rem;
  height: 0.125rem;
  background: url("../assets/img/圆角矩形2.png") no-repeat;
  display: inline-block;
  border-radius: 100%;
  margin: 0 0.1875rem;
  opacity: 1;
}
.mint-swipe-indicator.is-active {
  width: 0.6875rem;
  height: 0.125rem;
  background: url("../assets/img/圆角矩形2拷贝.png") no-repeat;
  display: inline-block;
  border-radius: 100%;
  margin: 0 0.1875rem;
}
/*公共样式*/
.public {
  margin-left: 0.6875rem;
  margin-right: 0.6875rem;
}
/*namePrice*/
.namePrice {
  width: 100%;
  background-color: #fff;
}
.namePrice .name {
  /*font-family: "PingFangSC-Medium";*/
  font-size: 0.9375rem;
  line-height: 1.3125rem;
  color: #282828;
  padding-top: 0.625rem;
  box-sizing: border-box;
}
.namePrice .price {
  font-size: 1.375rem;
  color: #e75058;
  padding-top: 0.375rem;
  font-weight: 600;
}
.namePrice .standard {
  font-size: 0.75rem;
  color: #656565;
  padding-top: 0.375rem;
  padding-bottom: 0.625rem;
}
.namePrice .standard span {
  margin-right: 0.9375rem;
  vertical-align: middle;
}
.namePrice .standard span img {
  width: 0.75rem;
  height: 0.75rem;
  vertical-align: middle;
}
/*选择区域*/
.choose {
  width: 100%;
  font-size: 0.8125rem;
  color: #656565;
  margin-top: 0.75rem;
  box-sizing: border-box;
  background-color: #fff;
}
.choose .choose-size {
  height: 2.5rem;
  line-height: 2.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
}
.choose .choose-parameter {
  height: 2.5rem;
  line-height: 2.5rem;
}
/*table部分*/
.table {
  width: 100%;
  background-color: #fff;
  margin-top: 0.75rem;
}
.table .page-part {
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  color: #989898;
}
.mint-tab-item-label {
  font-size: 1rem;
}
.mint-navbar .mint-tab-item.is-selected {
  color: #5e94f5;
  border-bottom: 3px solid #5e94f5;
}
.table .page-content {
  margin-top: 0.75rem;
  padding-bottom: 0.75rem;
  box-sizing: border-box;
}

.table .page-content .one table {
  width: 100%;
  border: 1px solid #ececec;
  font-size: 0.875rem;
}
.table .page-content .one table tr {
  width: 100%;
}
.table .page-content .one .table-left {
  width: 30%;
  background-color: #898895;
  color: #fff;
  text-align: center;
  padding: 0.5rem 0;
}
.table .page-content .one .table-right {
  width: 70%;
  padding-left: 0.9375rem;
  border-bottom: 1px solid #ececec;
}
/*购买须知*/
.table .page-content .one .buy {
  width: 100%;
}
.table .page-content .one .buy .buy-notice {
  margin: 0.4375rem 0;
}
.table .page-content .one .buy .buy-notice img {
  width: 0.875rem;
  height: 0.875rem;
  color: #282828;
}
.table .page-content .one .buy .buy-notice span {
  display: inline-block;
  font-size: 0.875rem;
  vertical-align: text-top;
  color: #282828;
}
.table .page-content .one .buy .title {
  font-size: 0.875rem;
  color: #282828;
  margin-bottom: 6.375rem;
}
.table .page-content .new-content {
  padding-left: 0.9333333333333333rem;
  padding-right: 0.9333333333333333rem;
}
.table .page-content .new-content p {
  font-size: 1rem;
  line-height: 1.6666666666666667rem;
  letter-spacing: 0.06666666666666667rem;
  margin-bottom: 0.7333333333333333rem;
  box-sizing: border-box;
  color: #000000;
}
.table .page-content .new-content p img {
  width: 100%;
}
/*弹出框*/
.pop {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 3rem;
}
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
.pop .white {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 21.875rem;
  background-color: #fff;
}
/*库存区域*/
.pop .white .stock {
  height: 6rem;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.pop .white .stock img {
  float: left;
  width: 9.125rem;
  height: 6.125rem;
  margin-left: 0.6875rem;
  margin-top: -0.75rem;
  border-radius: 5px;
}
.pop .white .stock .right {
  float: left;
  margin-left: 0.625rem;
}
.pop .white .stock .right .money {
  font-size: 0.8125rem;
  color: #000000;
  margin-top: 0.5rem;
}
.pop .white .stock .right .num {
  font-size: 0.6875rem;
  color: #656565;
  margin-top: 0.25rem;
}
.pop .white .stock .right .finish {
  margin-top: 0.5rem;
  font-size: 0.6875rem;
  color: #656565;
}
.pop .white .color-size .count {
  height: 1.75rem;
  margin-bottom: 0.625rem;
}
.pop .white .color-size .count .buy-count {
  font-size: 0.8125rem;
  color: #989898;
}
.pop .white .color-size .count .add {
  float: right;
}
.pop .white .color-size .count .add span {
  border: 1px solid #ccc;
  display: inline-block;
  font-size: 0.625rem;
  width: 2.0625rem;
  height: 1.75rem;
  color: #989898;
  text-align: center;
  line-height: 1.75rem;
  background-color: #f2f2f2;
}
.pop .white .color-size .count .add span:nth-child(2) {
  color: #656565;
  border-right: none;
  border-left: none;
  background-color: #fff;
}
.pop .white .stock .close {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 1.25rem;
  border-radius: 50%;
  color: #656565;
  position: absolute;
  top: 0.3125rem;
  right: 0.3125rem;
}
/*color-size区域*/
.pop .white .color-size {
  height: 15.875rem;
  overflow-y: scroll;
}
/*color区域*/
.pop .white .color-size .color {
  border-bottom: 1px solid #f2f2f2;
}
.pop .white .color-size .color p {
  font-size: 0.75rem;
  color: #989898;
  margin-top: 0.875rem;
  margin-bottom: 0.875rem;
}
.pop .white .color-size .color li {
  float: left;
  font-size: 0.8125rem;
  border: 1px solid #dadada;
  border-radius: 6px;
  padding: 0.5rem 0.875rem;
  margin-right: 0.6875rem;
  margin-bottom: 0.6875rem;
}
/*size区域*/
.pop .white .color-size .size {
  margin-bottom: 0.625rem;
  border-bottom: 1px solid #f2f2f2;
}
.pop .white .color-size .size p {
  font-size: 0.75rem;
  color: #989898;
  margin-top: 0.875rem;
  margin-bottom: 0.875rem;
}
.pop .white .color-size .size li {
  float: left;
  font-size: 0.8125rem;
  border: 1px solid #dadada;
  border-radius: 6px;
  padding: 0.5rem 0.875rem;
  margin-right: 0.6875rem;
  margin-bottom: 0.6875rem;
}
.active {
  background-color: #5e95f4;
}
/*前往商城*/
.shop {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background-color: #5e95f4;
  text-align: center;
  line-height: 3rem;
}
.shop a {
  color: #fff;
}
</style>