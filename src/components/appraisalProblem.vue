<template>
  <div>
    <div class="top">
      <div class="problem">常见问题</div>
      <div class="comm">COMMON PROBLEM</div>
    </div>
    <div class="IdentiBody">
      <div class="ract">1.面对假货横行的市场BAN装备鉴定在做什么？</div>
      <div class="IdentiText">答：BAN装备鉴定旨在为用户提供最准确的鉴定结论，具有严格的鉴定与审核程序，秉承“真实、客观、公正、严谨、严格”的原则为用户提供鉴定结论。</div>
      <div class="ract">2.BAN装备鉴定主要包括哪些内容？</div>
      <div class="IdentiText">答：BAN装备鉴定包括鞋子鉴定、服装鉴定等多品牌限量商品的鉴定，涉及到鉴定方式、鉴定流程、鉴定协议、收费标准、证书样本、鉴定答疑、实物鉴定、科技检测等多个内容的结合。</div>
      <div class="ract">3.BAN鉴定师整体水平如何？</div>
      <div class="IdentiText">答：BAN对于各品牌鉴定师有非常严格的审核机制，每一位能够进行专业鉴定的鉴定师都是经过层层审核筛选出来的，为了保证鉴定师水平实时跟进，我们每隔一段时间都会让鉴定师重新考核(考核标准，成为一名某品牌单品类鉴定顾问需要经过四次考核，BAN会随机抽取该品牌总共500题做成考卷，鉴定顾问并且必须保证规定时间内全部答对。如果同时担任俩品牌就是1000题，以此类推）</div>
      <div class="ract">4.BAN为什么不公开鉴定师名称及数量？</div>
      <div class="IdentiText">
        <div>答：BAN为保护鉴定师隐私不受侵害，同时为保证鉴定师可以安 静的去做鉴定不被他人打扰，故隐藏信息。同时BAN也会严格保 护用户隐私，所有鉴定贴非本人查询不会透露任何与个人信息相 关的内容。
        </div>
        <div>BAN拥有各品牌各品类数十名鉴定师、高级鉴定师、鉴定顾问， 同时也拥有各个品牌大量鉴定数据供鉴定师学习参考，我们保证 未来将整个鉴定过程控制在10分钟以内。
          <span>鉴定师入驻</span>
          <span>快速通道</span>
        </div>
      </div>
      <div class="ract">5.BAN对于装备鉴定做了哪些前所未有的改变？</div>
      <div class="IdentiText">通过BAN进行专业鉴定，鉴定贴发布成功后系统会自动随机分配 给三位拥有该品牌该类目鉴定能力水平的鉴定师，鉴定师通过用 户提供的信息进行判断给出结论（鉴定过程中系统会利用鉴定大 数据辅助鉴定师完成判断），系统会自动比对鉴定结论，如结论 一致，则将结论发送至用户如结论不一致，将组织数位鉴定顾问 召开专题鉴定会为您鉴定商品，经过合议，最终给出一个准确严 谨的鉴定结论。
        <br/><br/>业内第一个鉴定结论错误保赔的平台<br/><br/>BAN装备鉴定作为第一个鉴定保赔的机构，BAN对专业鉴定结论 负责，专业鉴定结论假如失误，我们愿意赔付鉴定费用最高30倍 的赔偿金额，对于保价商品，我们将按照商品价值全额赔付！同 时我们也严厉打击骗保行为，详情可见
        <span @click="goZuanye">《专业鉴定契约条款》</span>
      </div>
      <div class="ract">6.关于免费鉴定和专业鉴定的区别？</div>
      <div class="IdentiText">答：免费鉴定是为了服务用户提供的一项免费服务，BAN保持中 立的态度不参与任何斗争，所有免费鉴定产生的鉴定结果仅提供 参考，BAN对其不承担任何责任，但是BAN也会秉承对用户负责 的角度保证鉴定结果的准确性达到97%以上。详情可见
        <span @click="goMianfei">《免费鉴定契约条款》</span><br/><br/>专业鉴定是BAN独家推出的一项针对于限量商品及高危款项目前 来说最严格最严谨一套鉴定方案，尽最大能力保证鉴定结论的准 确性。专业鉴定是针对于鉴定产生的服务升级项目，将收取一定 的费用，但与此同时BAN将对鉴定结果负责，鉴定结果出现错误， BAN将按照商品价值等额赔偿。详情可见
        <span @click="goZuanye">《专业鉴定契约条款》</span>
      </div>
      <div class="ract">7.对于鉴定结论有疑问如何处理？</div>
      <div class="IdentiText">答：对于鉴定结论有疑问可通过鉴定结论页下方提交工单处理， BAN将派专员1对1跟踪服务。
      </div>
      <div class="ract">8.实物鉴定（公测）</div>
      <div class="IdentiText">答：照片不能很好的反应限量商品本身的重量、手感、材质、光 泽、内部结构等物理信息对于价值极高、超限量、高危款等类商 品，BAN提供实物鉴定的服务项目，并提供相应的实物鉴定证书 (证书运用区块链技术保证其不会被仿造)。可通过邮寄或本人送 至BAN各城市鉴定工作室，详情可点击
        <span>实物鉴定（公测）</span>
      </div>
      <div class="footer">-以上为常见问题，如果有其他特殊问题请联系客服即可-</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import wx from "weixin-js-sdk";
export default {
  data() {
    return {};
  },
  methods: {
    goZuanye: function() {
      wx.miniProgram.getEnv(function(res) {
        // console.log(res); // true
        if (res.miniprogram == true) {
          wx.miniProgram.navigateTo({ url: "/pages/major/major" });
        }
      });
    },
    goMianfei: function() {
      wx.miniProgram.getEnv(function(res) {
        // console.log(res.miniprogram); // true
        if (res.miniprogram == true) {
          wx.miniProgram.navigateTo({ url: "/pages/free/free" });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media only screen and (max-width: 1080px),
  only screen and (max-device-width: 1080px) {
  html,
  body {
    font-size: 23.04px;
  }
}
@media only screen and (max-width: 960px),
  only screen and (max-device-width: 960px) {
  html,
  body {
    font-size: 20.48px;
  }
}
@media only screen and (max-width: 800px),
  only screen and (max-device-width: 800px) {
  html,
  body {
    font-size: 17.066666666666666px;
  }
}
@media only screen and (max-width: 720px),
  only screen and (max-device-width: 720px) {
  html,
  body {
    font-size: 15.36px;
  }
}
@media only screen and (max-width: 640px),
  only screen and (max-device-width: 640px) {
  html,
  body {
    font-size: 13.653333333333334px;
  }
}
@media only screen and (max-width: 600px),
  only screen and (max-device-width: 600px) {
  html,
  body {
    font-size: 12.8px;
  }
}
@media only screen and (max-width: 540px),
  only screen and (max-device-width: 540px) {
  html,
  body {
    font-size: 11.52px;
  }
}
@media only screen and (max-width: 480px),
  only screen and (max-device-width: 480px) {
  html,
  body {
    font-size: 10.24px;
  }
}
@media only screen and (max-width: 414px),
  only screen and (max-device-width: 414px) {
  html,
  body {
    font-size: 8.832px;
  }
}
@media only screen and (max-width: 400px),
  only screen and (max-device-width: 400px) {
  html,
  body {
    font-size: 8.533333333333333px;
  }
}
@media only screen and (max-width: 375px),
  only screen and (max-device-width: 375px) {
  html,
  body {
    font-size: 8px;
  }
}
@media only screen and (max-width: 360px),
  only screen and (max-device-width: 360px) {
  html,
  body {
    font-size: 7.68px;
  }
}
@media only screen and (max-width: 320px),
  only screen and (max-device-width: 320px) {
  html,
  body {
    font-size: 6.826666666666667px;
  }
}
@media only screen and (max-width: 240px),
  only screen and (max-device-width: 240px) {
  html,
  body {
    font-size: 5.12px;
  }
}
.IdentiBody {
  color: rgb(133, 133, 133);
}
.ract {
  display: inline-block;
  color: rgb(255, 255, 255);
  margin-top: 1.1875rem;
  margin-left: 0.75rem;
  margin-bottom: 0.6875rem;
  padding: 0.3125rem 0.5rem 0.3125rem 0.625rem;
  box-sizing: border-box;
  background-color: #666666;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  position: relative;
}
.ract::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-top: 8px solid #666;
  border-right: 8px solid transparent;
  border-bottom: 8px solid transparent;
  position: absolute;
  left: 0.25rem;
  bottom: -0.25rem;
  transform: rotate(135deg);
}
.IdentiText {
  padding-right: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.1875rem;
  margin-left: 0.75rem;
  text-align: left;
}

a:link {
  color: rgb(94, 148, 243);
}

.top {
  text-align: center;
  padding-top: 1.1875rem;
  padding-bottom: 1.6875rem;
  background-color: white;
}
.problem {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.875rem;
  font-weight: bold;
}
.comm {
  font-family: PingFang-SC-Regular;
  font-size: 0.375rem;
  letter-spacing: 0.0625rem;
}
.footer {
  margin-top: 1.5625rem;
  margin-bottom: 2.9375rem;
  text-align: center;
  font-size: 0.6875rem;
  color: rgb(40, 40, 40);
}
span {
  color: #5e94f5;
}
</style>
