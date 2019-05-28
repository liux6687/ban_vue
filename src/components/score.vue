<template>
    <!-- <div class="score" style="'height:'+(clientHeight)+'px'"> -->
    <div class="score" v-if="data!=''">
        <!-- 背景 -->
        <div class="banner" :style="banner">
            <span>{{data.message}}</span>
        </div>
        <!-- 成绩记录 -->
        <div class="record" :style="record">
            <div class="title">
                <img :src="title">
                <span>成绩记录</span>
            </div>
            <div class="category type">
                <img :src="category" alt="">
                <span class="level">鉴定类别</span>
                <span class="content" v-if="data.brand.type==0">鞋子</span>
                <span class="content" v-if="data.brand.type==1">衣服</span>
            </div>
            <div class="brand type">
                <img :src="brand" alt="">
                <span class="level">鉴定品牌</span>
                <span class="content">{{data.brand.name}}</span>
            </div>
            <div class="mark type">
                <img :src="mark" alt="">
                <span class="level">考核成绩</span>
                <span class="content">共{{data.count}}题，答对{{data.correct_count}}题，答错<span class="num">{{data.wrong_count}}</span>题</span>
            </div>
        </div>
        <!-- 以下为答错题目的正确答案 -->
        <div class="answer">
            <div class="left">
                <img :src="duihao" alt="">
            </div>
            <div class="right">
                <div class="title">以下为答错题目的正确答案</div>
                <div class="content">若您对答错题目答案有疑问，可通过鉴定群参与讨论，若答案确认出错，则可申请修改成绩。</div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list">
            <div class="item" v-for="(item,index) in data.wrong_list" :key="index" :data-id="item.id" @click="goDetails">
                <div class="left">
                    <img :src="imgUrl+item.cover_image+thumb" alt="">
                </div>
                <div class="right">
                    <div class="top">
                        <div class="topLeft">
                            {{item.brand_name}}
                        </div>
                        <div class="topRight">
                            <img :src="time" alt="">
                            <span>{{item.publish_at}}</span>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="bottomLeft" :style="idBg">
                            {{item.appr_sn}}
                        </div>
                        <div class="bottomRight">
                            <img :src="really" v-if="item.post_status==13 && item.final_result==1">
                            <img :src="falses" v-if="item.post_status==13 && item.final_result==0">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Loadmore } from "mint-ui";
export default {
  data() {
    return {
      imgUrl: "https://static.tosneaker.com",
      qiniuImgUrl: "http://p3eglbig1.bkt.clouddn.com",
      banner: {
        backgroundImage:
          "url(" + require("../assets/img/score/banner.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 153px"
      },
      record: {
        backgroundImage:
          "url(" + require("../assets/img/score/record_bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      idBg: {
        backgroundImage:
          "url(" + require("../assets/img/score/id_bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      title: require("../assets/img/score/title.png"),
      category: require("../assets/img/score/category.png"),
      brand: require("../assets/img/score/brand.png"),
      mark: require("../assets/img/score/mark.png"),
      duihao: require("../assets/img/score/duihao.png"),
      time: require("../assets/img/score/time.png"),
      really: require("../assets/img/score/true.png"),
      falses: require("../assets/img/score/false.png"),
      data: [],
      id: this.$route.params.id,
      thumb: "-crop100x100"
    };
  },
  components: {
    "v-loadmore": Loadmore // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
    // 推荐应用组件时用a-b形式起名
  },
  methods: {
    //   查看详情
    goDetails: function(event) {
      var target = event.currentTarget;
      var id = target.getAttribute("data-id");
      var u = navigator.userAgent, app = navigator.appVersion;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var newID = Number(id)
      if (isIOS) {
        self.$bridge.callhandler('toAppraiseInfo',(newID)=>{
        
        })
        // bridge.toAppraiseInfo(newID);
      } else if (navigator.userAgent.match(/android/i)) {
        // console.log(id)
        android.toAppraiseInfo(newID);
      }
    },
    // 请求数据
    getData: function() {
      var url = "/api/appraisal/examine/detail";
      var params = {
        id: this.id
      };
      this.$http.get(url, { params: params }).then(
        res => {
          this.data = res.data;
        },
        res => {
          console.log(res);
        }
      );
    }
  },
  mounted() {
    this.getData();
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
.score {
  padding-bottom: 1.25rem;
  box-sizing: border-box;
}
.banner {
  width: 100%;
  height: 9.5625rem;
  text-align: center;
}
.banner span {
  display: inline-block;
  font-size: 1rem;
  color: #fff;
  margin-top: 4.6875rem;
  text-shadow: 0.1875rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.35);
}
/* 成绩记录 */
.record {
  width: 22.1875rem;
  height: 11.125rem;
  margin: -2.0625rem auto 0;
  border-radius: 5px;
  padding: 0 0.9375rem;
  box-sizing: border-box;
}
.record .title {
  display: flex;
  align-items: center;
  padding: 1rem 0 0.6875rem;
  box-sizing: border-box;
}
.record .title img {
  width: 1.5625rem;
  height: 1.5625rem;
  margin-right: 0.625rem;
}
.record .title span {
  font-size: 0.875rem;
  font-weight: 600;
  color: #282828;
}
.record .type {
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
}
.record .type img {
  width: 1.0625rem;
  height: 1.125rem;
  margin-right: 1.25rem;
}
.record .type .level {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #282828;
  margin-right: 2.5rem;
}
.record .type .content {
  font-size: 0.8125rem;
  color: #9ba8bf;
}
.record .type .content .num {
  color: red;
}
/* 以下为答错题目的正确答案 */
.answer {
  width: 22.1875rem;
  margin: 0.6875rem auto 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1.0625rem 0.9375rem;
  box-sizing: border-box;
  border-radius: 5px;
}
.answer .left {
  margin-right: 0.6875rem;
}
.answer .left img {
  width: 1.5625rem;
  height: 1.5625rem;
}
.answer .right .title {
  font-size: 0.875rem;
  line-height: 1.5625rem;
  font-weight: 600;
  color: #282828;
}
.answer .right .content {
  font-size: 0.6875rem;
  color: #9ba8bf;
  margin-top: 0.3125rem;
}
/* 列表 */
.list {
  width: 100%;
  padding: 0 0.9375rem;
  box-sizing: border-box;
}
.list .item {
  width: 100%;
  background-color: #fff;
  padding: 0.75rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-top: 0.625rem;
  border-radius: 5px;
}
.list .item .left {
  width: 4.125rem;
  height: 4.125rem;
  border-radius: 4px;
  /* margin-right: 0.9375rem; */
}
.list .item .left img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
}
.list .item .right {
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.list .item .right .top {
  display: flex;
  justify-content: space-between;
}
.list .item .right .top .topLeft {
  font-size: 0.875rem;
  font-weight: 600;
  color: #282828;
}
.list .item .right .top .topRight {
  display: flex;
  align-items: center;
}
.list .item .right .top .topRight img {
  width: 0.6875rem;
  height: 0.6875rem;
}
.list .item .right .top .topRight span {
  font-size: 0.75rem;
  color: #858585;
}
.list .item .right .bottom {
  display: flex;
  justify-content: space-between;
}
.list .item .right .bottom .bottomLeft {
  width: 3.625rem;
  height: 1.25rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #282828;
}
.list .item .right .bottom .bottomRight img {
  width: 2.9375rem;
  height: 0.9375rem;
}
</style>


