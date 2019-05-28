<template>
    <div class="trial">
      <!-- 关于鉴定级别 -->
        <div class="level">
            <div class="title">关于鉴定级别</div>
            <div class="text">
                按品牌划分，每一个品牌拥有四个鉴定级别，即实习鉴定师、鉴定师、高级鉴定师、鉴定顾问。
            </div>
        </div>
        <!-- 关于鉴定权限 -->
        <div class="power">
            <div class="title">
                <img :src="quanxian" alt="">
                <span>关于鉴定权限</span>
            </div>
            <div class="header clearfix">
                <p class="first">
                    <b>级别</b>
                    <b>鉴定内容</b>
                </p>
                <p>实习鉴定师</p>
                <p>鉴定师</p>
                <p>高级鉴定师</p>
                <p>鉴定顾问</p>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>免费鉴定</td>
                        <td><img :src="duihao" alt=""></td>
                        <td><img :src="duihao" alt=""></td>
                        <td><img :src="duihao" alt=""></td>
                        <td><img :src="duihao" alt=""></td>
                    </tr>
                    <tr>
                        <td>专业鉴定</td>
                        <td></td>
                        <td><img :src="duihao" alt=""></td>
                        <td><img :src="duihao" alt=""></td>
                        <td><img :src="duihao" alt=""></td>
                    </tr>
                    <tr>
                        <td>专业鉴定-问题商品</td>
                        <td></td>
                        <td></td>
                        <td><img :src="duihao" alt=""></td>
                        <td><img :src="duihao" alt=""></td>
                    </tr>
                    <tr>
                        <td>专业鉴定（保价0-2000）</td>
                        <td></td>
                        <td></td>
                        <td><img :src="duihao" alt=""></td>
                        <td><img :src="duihao" alt=""></td>
                    </tr>
                    <tr>
                        <td>专业鉴定（保价0-2000）-问题商品</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><img :src="duihao" alt=""></td>
                    </tr>
                    <tr>
                        <td>专业鉴定（保价>2000）</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><img :src="duihao" alt=""></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 关于鉴定费用 -->
        <div class="feiyong">
            <div class="title">
                <img :src="feiyong" alt="">
                <span>关于鉴定费用（能者多劳）</span>
            </div>
            <div class="text">
                <p>1. 每次同级别有效鉴定获得鉴定费用的20%作为酬劳。例如专业鉴定10元，保价费用100元，则本次你将获得22元鉴定酬劳用。</p>
                <p>2. 每次跨级别有效鉴定获得鉴定费用的20%~60%作为酬劳。例如你是鉴定顾问，鉴定高级鉴定师及以下权限的内容，例如鉴定费用100元，若此时有一位当前本级别鉴定师正在鉴定，进行有效鉴定则获得40元（即40%）酬劳，若此时无人鉴定，进行有效鉴定则获得60元（即60%）酬劳，以此类推。</p>
            </div>
        </div>
        <!-- 关于鉴定失误处理方法 -->
        <div class="feiyong">
            <div class="title">
                <img :src="chuli" alt="">
                <span>关于鉴定失误处理方法</span>
            </div>
            <div class="text">
                <p>平台采取保赔机制，所以劳请各位鉴定师保持十足的精神去对待每一次鉴定，拿不准的商品可以大家讨论共同商定结果。</p>
                <p>鉴定错误产生的赔偿金将从鉴定佣金中扣除例如赔偿100元，则从鉴定佣金中扣除40元（即40%）。高等级鉴定低等级若鉴定失误，则扣除鉴定佣金100元（即100%），额外扣除20元（即20%）用于鉴定失误后赔偿沟通、用户安抚、公关费用等。鉴定错误次数大于3次将自动降级，需要进行重新考核。</p>
                <p>级别不同惩罚措施不同(降级)</p>
                <p>鉴定师<img :src="jiangji" alt="">实习鉴定师<span>（7天后可重新升级考试）</span></p>
                <p>高级鉴定师<img :src="jiangji" alt="">鉴定师<span>（15天后可重新升级考试）</span></p>
                <p>鉴定顾问<img :src="jiangji" alt="">高级鉴定师<span>（30天后可重新升级考试）</span></p>
            </div>
        </div>
        <!-- 关于模拟考试及升级考试 -->
        <div class="feiyong">
            <div class="title">
                <img :src="kaoshi" alt="">
                <span>关于模拟考试及升级考试</span>
            </div>
            <div class="text">
                <p>模拟考试每天不限制次数，升级考试每天仅限一次。</p>
            </div>
        </div>
        <!-- 关于审核标准 -->
        <div class="feiyong">
            <div class="title">
                <img :src="shenhe" alt="">
                <span>关于审核标准</span>
            </div>
            <div class="text">
                <p>从学习资料库中随机抽取相应品牌已知并确认结果的鉴定贴。</p>
                <p>实习鉴定师考试，每一品牌50题，需答对48题及以上；鉴定师考试，每一品牌100题，需答对99题及以上；高级鉴定师考试，每一品牌150题，需答对150题；鉴定顾问考试，每一品牌200题，需答对200题；同时需要有鉴别该品牌高危款项能力。</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      quanxian: require("../assets/img/trialProved/quanxian.png"),
      duihao: require("../assets/img/trialProved/duihao.png"),
      feiyong: require("../assets/img/trialProved/feiyong.png"),
      chuli: require("../assets/img/trialProved/chuli.png"),
      kaoshi: require("../assets/img/trialProved/kaoshi.png"),
      shenhe: require("../assets/img/trialProved/shenhe.png")
    };
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
.trial {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 1.5625rem;
  padding-bottom: 1.25rem;
  box-sizing: border-box;
}
/* 关于鉴定级别 */
.level {
  width: 94%;
  margin: 0px auto 0px;
  background-color: #f6f6f6;
  padding: 1rem 1.5625rem;
  box-sizing: border-box;
  border-radius: 4px;
  /* border-bottom-right-radius: 1.25rem; */
}
.level .title {
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #000;
}
.level .text {
  font-size: 0.8125rem;
  color: #000;
  line-height: 1.3125rem;
  margin-top: 0.625rem;
}
/* 关于鉴定权限 */
.power {
  width: 94%;
  margin: 1.5625rem auto 0px;
}
/* .power .title {
  display: flex;
  align-items: center;
} */
.power .title img {
  width: 0.75rem;
  height: 0.875rem;
  margin-right: 0.625rem;
}
.power .title span {
  font-size: 0.875rem;
  font-weight: 600;
  color: #282828;
}
.power .header {
  margin-top: 0.625rem;
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: #e6e6e6;
  font-size: 0.6875rem;
}
.power .header .first {
  width: 20%;
  height: 2.5rem;
  /* text-align: center; */
  position: relative;
  box-sizing: border-box;
  font-size: 0.625rem;
}
.power .header .first::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1.25rem;
  width: 100%;
  height: 2.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
  transform-origin: bottom center;
  transform: rotateZ(28deg) scale(1.01);
}
.power .first b {
  font-weight: 400;
}
.power .first b:nth-child(1) {
  position: absolute;
  top: -0.5625rem;
  right: 0.5rem;
}
.power .first b:nth-child(2) {
  position: absolute;
  top: 0.5625rem;
  left: 0.375rem;
}
.power .header p {
  width: 20%;
  text-align: center;
  float: left;
}
.power table {
  width: 100%;
  border: 1px solid #e0e0e0;
}
.power table tbody tr {
  width: 100%;
  text-align: center;
  font-size: 0.6875rem;
  color: #282828;
}
.power table tbody tr td {
  width: 20%;
  height: 2.5rem;
  /* line-height: 2.5rem; */
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.power table tbody tr td img {
  width: 0.9375rem;
  height: 0.75rem;
}
/* 关于鉴定费用 */
.feiyong {
  margin-top: 1.5625rem;
  padding: 0 0.9375rem;
  box-sizing: border-box;
}
/* .feiyong .title {
  display: flex;
  align-items: center;
} */
.feiyong .title img {
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.625rem;
}
.feiyong .title span {
  font-size: 0.875rem;
  font-weight: 600;
  color: #282828;
}
.feiyong .text {
  padding: 0 1.25rem;
  box-sizing: border-box;
}
.feiyong .text p {
  font-size: 0.8125rem;
  color: #858585;
  margin-top: 0.625rem;
  line-height: 1.25rem;
}
.feiyong .text p img {
  width: 0.75rem;
  height: 0.625rem;
  margin: 0 0.1875rem;
}
.feiyong .text p span {
  font-size: 0.6875rem;
}
</style>


