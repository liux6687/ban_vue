<template>
    <div class="expressive">
        <div class="list">
          <div class="aa">
          </div>
            <div class="item" v-for="(item,index) in data" :key="index">
                <div class="left">
                    <div class="top">
                        <span class="bold" v-if="item.type==1">收入</span>
                        <span class="bold" v-if="item.type==3">提现</span>
                        <span class="bold" v-if="item.type==2">赔付扣款</span>
                        <span class="text" v-if="item.type==1 && item.post!=null">（鉴定ID：{{item.post.appr_sn}}）</span>
                        <span class="text" v-if="item.type==3">（转到现金余额）</span>
                        <span class="text" v-if="item.type==2 && item.post!=null">（鉴定ID：{{item.post.appr_sn}}）</span>
                    </div>
                    <div class="bottom">
                        {{item.created_at}}
                    </div>
                </div>
                <div class="right">
                    <span class="jia" v-if="item.type==1">{{item.money}}</span>
                    <span class="jian" v-if="item.type==2 || item.type==3">{{item.money}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      token: this.$route.params.token,
      data: []
    };
  },
  methods: {
    //   获取提现数据
    getData: function() {
      var url = "/api/appraisal/wallet/detail";
      var params = {
        token: this.token
      };
      this.$http.get(url, { params: params }).then(
        res => {
          this.data = res.data.data;
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
  .list {
  width: 100%;
}
.list .item {
  width: 100%;
  height: 3.75rem;
  padding: 0 1.25rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.list .item .left {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.list .item .left .top .bold {
  font-size: 0.75rem;
  font-weight: 600;
  color: #282828;
}
.list .item .left .top .text {
  font-size: 0.75rem;
  color: #282828;
}
.list .item .left .bottom {
  font-size: 0.625rem;
  color: #888;
}
.list .item .right {
  display: flex;
  align-items: center;
}
.list .item .right .jia {
  font-size: 1.125rem;
  font-weight: 600;
  color: #5e9af4;
}
.list .item .right .jian {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
}
</style>

