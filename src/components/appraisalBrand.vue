<template>
  <div class="appraisalBrand">
    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="(item,index) in data.data" :key="index" :id="item.brand_id">
        <div class="left">
          <div class="leftTop">
            <img :src="imgUrl+item.cover_image">
          </div>
          <div class="leftBottom" v-if="item.type==1">
            服装
          </div>
          <div class="shoesBg" v-if="item.type==0">
            鞋子
          </div>
        </div>
        <div class="right">
          <div class="rightTop">
            <span class="topLeft">{{item.level_name}}</span>
            <!-- <span class="topRight">高级鉴定师</span> -->
          </div>
          <div class="rightMiddle">
            <!-- <div class="size"></div> -->
            <img :src="yifu" class="size" :style="'width:'+(item.level/data.count*100)+'%;'" v-if="item.type==1">
            <img :src="shoes" class="size" :style="'width:'+(item.level/data.count*100)+'%;'" v-if="item.type==0">
          </div>
          <div class="rightBottom" v-if="item.is_appraiser_show==1">
            <div class="one style" :data-id="item.brand_id" @click="analog">
              <img :src="exam">
              <span>模拟考试</span>
            </div>
            <div class="two style" :data-id="item.brand_id" @click="upGrade">
              <img :src="upgrade">
              <span>升级考试</span>
            </div>
          </div>
          <div class="rightBottom" v-if="item.is_appraiser_show==0" style="height:16px">

          </div>
        </div>
      </div>
    </div>
    <!-- 添加品牌 -->
    <div class="brand" @click="addBrand">
      <img :src="add">
      <span>添加品牌</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

    data() {
      return {
        imgUrl: "https://static.tosneaker.com",
        qiniuImgUrl: "http://p3eglbig1.bkt.clouddn.com",
        exam: require("../assets/img/appraisalBrand/exam.png"),
        upgrade: require("../assets/img/appraisalBrand/upgrade.png"),
        shoes: require("../assets/img/appraisalBrand/shoes.png"),
        yifu: require("../assets/img/appraisalBrand/yifu.png"),
        add: require("../assets/img/appraisalBrand/add.png"),
        // token: this.$route.params.token,
        token: '',
        data: [], //存放数据
        appToken: ""
      };
    },
    methods: {

      //   模拟考试
      analog: function (event, index) {
        var target = event.currentTarget;
        var id = target.getAttribute("data-id");
        var token = this.token;
        window.location.href =
          "https://stg.tosneaker.com/m/#/examine/" + id + "/" + token;
      },
      //   升级考试
      upGrade: function (event) {
        var target = event.currentTarget;
        var id = target.getAttribute("data-id");
        var token = this.token;
        window.location.href =
          "https://stg.tosneaker.com/m/#/examine/" + id + "/" + token;
        // this.$router.push({
        //   name: "examine",
        //   params: {
        //     id: id,
        //     token: token
        //   }
        // });
      },
      // 添加品牌
      addBrand: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
          self.$bridge.callhandler('toBrand', () => {

          })//调用iOS方法
          // bridge.toBrand();


        } else if (navigator.userAgent.match(/android/i)) {
          android.toBrand();
        }
      },
      getData: function () {
        var self = this;
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          console.log(self.$bridge);
          self.$bridge.callhandler('takeToken',()=>{
            // console.log("JS 调用了 OC 注册的 takeToken 方法");
          })//调用iOS方法
         } else if (navigator.userAgent.match(/android/i)) {
           android.takeToken();
         }
        self.$bridge.registerhandler('takeTokenResult', (data, responseCallback) => {
          let token = data;
          self.token = token;
          self.appToken = token;
          var url = "/api/appraisal/appraiser/brand";
          var param = {
            token: self.token
          };
          self.$http.get(url, {params: param}).then(
            res => {
              self.data = res.data;
            },
            res => {
              console.log(res);
            }
          );
        });
        window["takeTokenResult"] = function (token) {
          self.token = token;
          self.appToken = token;
          var url = "/api/appraisal/appraiser/brand";
          var param = {
            token: self.token
          };
          self.$http.get(url, {params: param}).then(
            res => {
              self.data = res.data;
            },
            res => {
              console.log(res);
            }
          );
        };
      }
    },
    mounted() {
      this.getData();
    }
  };
</script>

<style scoped>
  @media only screen and (max-width: 1080px), only screen and (max-device-width: 1080px) {
    html,
    body {
      font-size: 46.08px;
    }
  }

  @media only screen and (max-width: 960px), only screen and (max-device-width: 960px) {
    html,
    body {
      font-size: 40.96px;
    }
  }

  @media only screen and (max-width: 800px), only screen and (max-device-width: 800px) {
    html,
    body {
      font-size: 34.13333333333333px;
    }
  }

  @media only screen and (max-width: 720px), only screen and (max-device-width: 720px) {
    html,
    body {
      font-size: 30.72px;
    }
  }

  @media only screen and (max-width: 640px), only screen and (max-device-width: 640px) {
    html,
    body {
      font-size: 27.30666666666667px;
    }
  }

  @media only screen and (max-width: 600px), only screen and (max-device-width: 600px) {
    html,
    body {
      font-size: 25.6px;
    }
  }

  @media only screen and (max-width: 540px), only screen and (max-device-width: 540px) {
    html,
    body {
      font-size: 23.04px;
    }
  }

  @media only screen and (max-width: 480px), only screen and (max-device-width: 480px) {
    html,
    body {
      font-size: 20.48px;
    }
  }

  @media only screen and (max-width: 414px), only screen and (max-device-width: 414px) {
    html,
    body {
      font-size: 17.664px;
    }
  }

  @media only screen and (max-width: 400px), only screen and (max-device-width: 400px) {
    html,
    body {
      font-size: 17.066666666666666px;
    }
  }

  @media only screen and (max-width: 375px), only screen and (max-device-width: 375px) {
    html,
    body {
      font-size: 16px;
    }
  }

  @media only screen and (max-width: 360px), only screen and (max-device-width: 360px) {
    html,
    body {
      font-size: 15.36px;
    }
  }

  @media only screen and (max-width: 320px), only screen and (max-device-width: 320px) {
    html,
    body {
      font-size: 13.653333333333334px;
    }
  }

  @media only screen and (max-width: 240px), only screen and (max-device-width: 240px) {
    html,
    body {
      font-size: 10.24px;
    }
  }

  .list {
    padding: 0 0.9375rem;
    box-sizing: border-box;
  }

  .list .item {
    width: 100%;
    background-color: #fff;
    margin-top: 0.625rem;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    box-sizing: border-box;
  }

  .list .item .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0.9375rem;
  }

  .list .item .left .leftTop {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 20px;
    box-shadow: 0px 0.25rem 0.25rem #ccc;
  }

  .list .item .left .leftTop img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
  }

  .list .item .left .shoesBg {
    margin-top: 0.5rem;
    padding: 0.125rem 0.3125rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 0.9375rem;
    color: #fff;
    font-size: 0.625rem;
    background-color: #3ab5f2;
    border-radius: 7px;
  }

  .list .item .left .leftBottom {
    margin-top: 0.5rem;
    padding: 0.125rem 0.3125rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 0.9375rem;
    color: #fff;
    font-size: 0.625rem;
    background-color: #e36cd9;
    border-radius: 7px;
  }

  .list .item .right {
    width: 32.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .list .item .right .rightTop {
    display: flex;
    justify-content: space-between;
  }

  .list .item .right .rightTop .topLeft {
    font-size: 0.8125rem;
    color: #282828;
    font-weight: 600;
  }

  .list .item .right .rightTop .topRight {
    font-size: 0.8125rem;
    color: #e9e9ee;
    font-weight: 600;
  }

  .list .item .right .rightMiddle {
    width: 100%;
    height: 0.5rem;
    border-radius: 4px;
    background-color: #eeeef3;
    position: relative;
  }

  .list .item .right .rightMiddle .size {
    /* width: 2.25rem; */
    height: 0.5rem;
    border-radius: 4px;
    background-color: red;
    position: absolute;
    left: 0;
    top: 0;
  }

  .list .item .right .rightBottom {
    display: flex;
    justify-content: flex-end;
  }

  .list .item .right .rightBottom .one {
    margin-right: 1.5625rem;
  }

  .list .item .right .rightBottom .style {
    display: flex;
    align-items: center;
  }

  .list .item .right .rightBottom .style img {
    width: 0.8125rem;
    height: 0.8125rem;
    margin-right: 0.3125rem;
  }

  .list .item .right .rightBottom .style span {
    font-size: 0.6875rem;
    color: #4d4d4d;
  }

  /* 添加品牌 */
  .brand {
    width: 7.8125rem;
    height: 2.5rem;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 1.875rem;
    left: 50%;
    margin-left: -4rem;
  }

  .brand img {
    width: 0.8125rem;
    height: 0.8125rem;
    margin-right: 0.5625rem;
  }

  .brand span {
    font-size: 0.875rem;
    color: #282828;
  }
</style>

