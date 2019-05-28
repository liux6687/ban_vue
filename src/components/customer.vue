<template>
  <div class="box">
      <!-- banner -->
      <div class="banner">
          <img :src="bg" class="bg">
          <span class="users"><span class="user"><img :src="header"></span><a>小笼包</a></span>
          <span class="guanzhu">+ 关注</span>
      </div>
      <!-- ta的圈子 -->
      <div class="circle">
          <div class="circleTop">
              <div class="circleTopLeft">
                  <img :src="circle">
                  <div class="circleTitle">
                      <p>TA创建的圈子</p>
                      <span>12个圈子</span>
                      <span>TA还没有创建圈子</span>
                  </div>
              </div>
              <div class="circleTopRight">
                  <img :src="right">
              </div>
          </div>
          <div class="circleBottom">
              <ul>
                  <li v-for="(item,index) in imgs" :key="index"><img :src="item.img"></li>
              </ul>
          </div>
      </div>
      <!-- 作品 -->
      <div class="works">
        <ul class="clearfix">
            <li class="li-style">热门作品</li>
            <li @click="goNew()">最新作品</li>
        </ul>
        <div class="worksPic">
            <div class="worksPicLeft clearfix">
                <vueWaterfallEasy :imgsArr="imgsArr">      
                </vueWaterfallEasy>
            </div>
        </div>
      </div>
      <!-- 参看更多 -->
      <div class="join">
          <a href="javascript:;" @click="judge()">参看更多</a>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  data() {
    return {
      bg: require("../assets/img/customer/bg.png"),
      header: require("../assets/img/article/head1.png"),
      circle: require("../assets/img/customer/circle.png"),
      right: require("../assets/img/customer/right.png"),
      imgs: [
        {
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg"
        },
        {
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg"
        },
        {
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg"
        },
        {
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg"
        },
        {
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg"
        },
        {
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg"
        },
        {
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg"
        }
      ],
      hotimgs: [],
      newimgs: [],
      imgsArr: [],
      fetchImgsArr: [],
      isTrue: true,
      imgNum: 0,
      user: []
    };
  },
  components: { vueWaterfallEasy },
  methods: {
    judge: function() {
      var newId = this.id;
      var name = this.Name;
      var ua = window.navigator.userAgent.toLowerCase();
      //微信
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        document.getElementsByClassName("weixin")[0].style.display = "block";
      } else {
        //非微信浏览器
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          window.location.href = "iOSBAN://?teamID=" + newId; //ios app协议
          window.setTimeout(function() {
            window.location.href =
              "https://www.tosneaker.com/app/download?ADTAG=396.389";
          }, 2000);
        } else if (navigator.userAgent.match(/android/i)) {
          window.location.href =
            "ban://tosneaker.android/circle?id=" + newId + "&name=" + name;
          setTimeout(function() {
            window.location.href =
              "https://www.tosneaker.com/app/download?ADTAG=370.338"; //android下载地址
          }, 2000);
        }
      }
    },
    getHot() {
      var url =
        "http://tosneaker.test/api/ext/custom/post?do=hot&page=1&limit=10";
      this.$http.get(url).then(res => {
        this.hotimgs = res.data.data;
        this.imgsArr = this.inithotImgsArr();
      });
    },
    goNew() {
      location.href = "http://localhost:8080/#/customerNew/1";
    },
    inithotImgsArr(n, m) {
      var arr = [];
      var imgArr = this.hotimgs;
      for (var i = 0; i < imgArr.length; i++) {
        arr.push({
          src: "https://static.tosneaker.com" + imgArr[i].custom_main_image
        });
      }
      return arr;
    }
  },
  mounted() {
    this.getHot();
    // this.fetchImgsArr = this.initImgsArr(5, 10); // 模拟每次请求的新的图片的数据
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
.banner {
  width: 100%;
  position: relative;
}
.banner .bg {
  width: 100%;
  display: block;
}
.banner .users {
  position: absolute;
  left: 0.75rem;
  bottom: 2.0625rem;
  width: 50%;
  height: 3.4375rem;
  font-size: 1.25rem;
  color: #fff;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
}
.banner .users .user {
  display: inline-block;
  width: 3.4375rem;
  height: 3.4375rem;
  border: 2px solid #fff;
  border-radius: 50%;
  padding: 0.0625rem;
  box-sizing: border-box;
  background-color: transparent;
  margin-right: 0.9375rem;
}
.banner .users .user img {
  width: 100%;
  border-radius: 50%;
}
.banner .guanzhu {
  position: absolute;
  right: 0.75rem;
  bottom: 2.5rem;
  display: inline-block;
  border: 1px solid #fff;
  font-size: 0.875rem;
  color: #fff;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  border-radius: 15px;
}
/* 圈子 */
.circle {
  width: 100%;
  padding: 0px 0.75rem;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 0.75rem;
}
.circle .circleTop {
  padding: 0.9375rem 0px;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
}
.circle .circleTop .circleTopLeft {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
}
.circle .circleTop .circleTopLeft img {
  width: 2.1875rem;
  height: 2.1875rem;
  margin-right: 0.5rem;
}
.circle .circleTop .circleTopLeft .circleTitle p {
  font-size: 0.875rem;
  color: #282828;
}
.circle .circleTop .circleTopLeft .circleTitle span {
  font-size: 0.75rem;
  color: #989898;
}
.circle .circleTop .circleTopRight img {
  width: 0.5rem;
  height: 0.9375rem;
}
/* circleBottom */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.circle .circleBottom {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  white-space: normal;
  padding-bottom: 0.9375rem;
  box-sizing: border-box;
}
.circle .circleBottom ul {
  width: 500%;
}
.circle .circleBottom ul li {
  float: left;
  width: 4.6875rem;
  height: 4.6875rem;
  border-radius: 4px;
  margin-right: 0.625rem;
}
.circle .circleBottom ul li img {
  width: 4.6875rem;
  height: 4.6875rem;
  border-radius: 4px;
}
/* 作品 */
.works {
  width: 100%;
  background-color: #fff;
  margin-top: 0.75rem;
}
.works ul {
  padding: 0px 0.75rem;
  box-sizing: border-box;
  background-color: #fff;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  border-bottom: 1px solid #f2f2f2;
}
.works ul li {
  padding: 1.125rem;
  box-sizing: border-box;
}
.li-style {
  color: #5e94f5;
  font-weight: 600;
  border-bottom: 3px solid #5e94f5;
}
.works .worksPic {
  margin-top: 0.9375rem;
  padding: 0px 0.75rem;
  box-sizing: border-box;
}
.works .worksPic .worksPicLeft {
  width: 100%;
}
.works .worksPic .worksPicLeft img {
  display: block;
  float: left;
  width: 45%;
}
/*查看更多*/
.join {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
}
.join a {
  display: inline-block;
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  font-size: 0.9375rem;
  color: #fff;
  background-color: #5e95f4;
}
</style>

