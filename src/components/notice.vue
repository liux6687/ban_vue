<template>
    <div class="notice">
        <div class="title">
            <div class="title-main" :style ="title_bg">
                #定制球鞋销售模式#
            </div>
            <div class="title-body">
                <p>定制球鞋原鞋必须为正品，若收到假鞋立即退回，</p>
                <p>同时我们也保证提供销售的定制球鞋均为正品，</p>
                <p>假一赔三！</p>
            </div>
        </div>
        <div class="no">
            <div class="noOne">
                <p class="pOne"><img :src="no1"><span>私人个性定制</span></p>
                <p class="pTwo">这种模式下BAN定制团队仅提供订制服务，不提供原鞋！仅提供订制服务，不提供原鞋！仅提供订制服务，不提供原鞋！（重要的事情说三遍）</p>
            </div>
            <div class="noTwo">
                <p class="pOne"><img :src="no2"><span>定制成品预售</span></p>
                <p class="pTwo">由BAN订制团队提供订制服务及原鞋，直接销售订制后的成品。看清楚是预售，预售，预售！就是需要等待团队进行订制，具体订制周期根据每双鞋子难易程度进行判断。</p>
            </div>
            <div class="noThree">
                <p class="pOne"><img :src="no3"><span>定制现货销售</span></p>
                <p class="pTwo">由BAN订制团队提供订制服务及原鞋，并且是已经做好的成品，无需等待，即拍即发。</p>
            </div>
        </div>
        <!-- 常见问题 -->
        <div class="problem">
            <div class="problem-title"><img :src="problem" alt=""></div>
            <div class="problem-content" :style="pro_bg">
                <!-- <img :src="pro" alt=""> -->
                <div class="proItem">
                    <p class="style1">1.关于私人订制的和订制已有作品的流程？<span></span></p>
                    <p class="style2">答：私人订制步骤：1.提交需求单 -> 2.定制师提供方案 -> 3.挑选定制方案 -> 4.沟通确认方案 -> 5.付款 -> 6.邮寄开始定制</p>
                    <p class="style2">定制已有作品：1.选择喜欢作品 -> 2.提交服务单 -> 3.邮寄开始定制</p>
                </div>
                <div class="proItem">
                    <p class="style1">2.私人定制需求单如何填写？<span></span></p>
                    <p class="style2">答：首先需要填写定制主题，如果有明确的细节要求可以再【定制信息采集】处展开按照具体位置进行填写，同时还可以添加多种素材。尽量抒写规范这样可以使定制师更快速的为您提供优质方案。</p>
                </div>
                <div class="proItem">
                    <p class="style1">3.关于定制的手工费用收费标准和定制周期<span></span></p>
                    <p class="style2">答：收费大概是200-800不等，看定制的难易程度，特殊的另算。定制周期我们会在提供方案的时候一并提供，周期的计算方式为定制师收到鞋子后开始计算，我们保证在规定周期内定制完毕，特殊情况将延长定制周期，我们会另行通知。</p>
                </div>
                <div class="proItem">
                    <p class="style1">4.定制球鞋能否进行实战？<span></span></p>
                    <p class="style2">答：由于实战的强度过大，我们不能保证鞋子可以实战。</p>
                </div>
                <div class="proItem">
                    <p class="style1">5.关于定制鞋子的保养问题<span></span></p>
                    <p class="style2">答：鞋子脏了用湿毛巾沾水擦拭即可，下雨天尽量不要穿着，雨水具有一定腐蚀性。</p>
                </div>
                <div class="proItem">
                    <p class="style1">6.关于定制鞋子受损后的修复问题<span></span></p>
                    <p class="style2">答：我们会免费提供1次修复服务（自订单完成日三个月内），如果您的鞋子非人为造成的破损情况，在订单详情页即可申请售后。</p>
                </div>
                <div class="proItem">
                    <p class="style1">7.关于回寄运费问题<span></span></p>
                    <p class="style2">答：定制球鞋属于相对贵重物品，我们统一使用顺丰到付，到付是为了保证快递员将物品送至您的手上而不会到处乱扔，如需保价或使用其他快递，请在下单时进行备注，如无法接收到付件，请通过顺丰APP进行线上付款。</p>
                </div>
                <div class="remarks">
                    -以上为常见问题，如果有其他特殊问题请联系客服即可-
                </div>
            </div>
        </div>
        <!-- 基础知识 -->
        <div class="lore">
            <div class="lore-title"><img :src="lore" alt=""></div>
            <div class="lore-box">
                <div class="lore-content" :style="lore_bg">
                    <div class="loreItem">
                        <p class="imgBox"><img :src="num1" alt=""></p>
                        <p class="text">皮革材质鞋类：<span>表面光滑的皮革是做出来效果最好并且附着力最好的材料，出厂是有一层保护膜，定制时只需把这一层膜去掉即可定制，可以保证球鞋遇到水等都不会掉色，耐一定程度的剐蹭。</span></p>
                    </div>
                    <div class="loreItem">
                        <p class="imgBox"><img :src="num2" alt=""></p>
                        <p class="text">塑料鞋面的鞋类：<span>这种鞋子因为材料的问题颜料的附着力有限，实战是肯定不行的，压马路可以应付。但是时间长肯定会有裂纹等。</span></p>
                    </div>
                    <div class="loreItem">
                        <p class="imgBox"><img :src="num3" alt=""></p>
                        <p class="text">发泡类鞋面：<span>在做喷泡定制时定制师会事先对鞋面进行特殊处理，一般程度的剐蹭还是可以耐住的，压马路是没什么问题的，但蹭到硬物的剐蹭是无法避免的。</span></p>
                    </div>
                    <div class="loreItem">
                        <p class="imgBox"><img :src="num4" alt=""></p>
                        <p class="text">中底：<span>很多鞋子定制过程中需要对中底进行改色，在这种材质上改色，附着力也是不错的，但还是有这类鞋子的通病，容易爆漆。</span></p>
                    </div>
                    <div class="loreItem">
                        <p class="imgBox"><img :src="num5" alt=""></p>
                        <p class="text">布面，网面：<span>布面的鞋子定制一般定制之后耐久度是很高的，能达到普通印花标准，但一些特殊的定制在追求完美效果的同时会损失部分耐久。</span></p>
                    </div>
                    <div class="loreItem">
                        <p class="imgBox"><img :src="num6" alt=""></p>
                        <p class="text"><span>鞋子穿着的时间长之后会有褶皱裂纹等等都是正常现象，毕竟是后期的颜料做上去的不可能像原厂那样。还有就是很多人因为走路习惯不好，鞋子内侧会互相摩擦到，这点就算是没有定制过的鞋子也会导致皮质破损，这和鞋子有没有定制过没有关系，是正常磨损。</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      title_bg: {
        backgroundImage:
          "url(" + require("../assets/img/notice/title_bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "80%"
      },
      pro_bg: {
        backgroundImage: "url(" + require("../assets/img/notice/pro.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
        backgroundSize: "177px 16px"
      },
      lore_bg: {
        backgroundImage:
          "url(" + require("../assets/img/notice/knowedge.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
        backgroundSize: "177px 16px"
      },
      no1: require("../assets/img/notice/no1.png"),
      no2: require("../assets/img/notice/no2.png"),
      no3: require("../assets/img/notice/no3.png"),
      problem: require("../assets/img/notice/problem.png"),
      pro: require("../assets/img/notice/pro.png"),
      lore: require("../assets/img/notice/lore.png"),
      num1: require("../assets/img/notice/num1.png"),
      num2: require("../assets/img/notice/num2.png"),
      num3: require("../assets/img/notice/num3.png"),
      num4: require("../assets/img/notice/num4.png"),
      num5: require("../assets/img/notice/num5.png"),
      num6: require("../assets/img/notice/num6.png")
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
.notice {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.title .title-main {
  width: 100%;
  height: 1.5625rem;
  text-align: center;
  color: #282828;
  font-size: 1.0625rem;
  font-weight: 600;
  padding-top: 0.9375rem;
}
.title .title-body {
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  color: #9e9e9e;
  margin-top: 1.125rem;
  padding-bottom: 1.125rem;
}
.title .title-body p {
  line-height: 1.25rem;
}

.no {
  padding: 0 0.9375rem;
  box-sizing: border-box;
}
.no .noOne,
.noTwo,
.noThree p {
  color: #282828;
  font-size: 0.8125rem;
}
.no .noOne p img {
  display: inline-block;
  width: 3.4375rem;
  height: 1.4375rem;
  vertical-align: middle;
  margin-top: -0.25rem;
}
.no .noOne p span {
  padding: 0.1875rem 0.625rem;
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-size: 0.8125rem;
}
.no .noTwo p img {
  display: inline-block;
  width: 3.4375rem;
  height: 1.4375rem;
  vertical-align: middle;
  margin-top: -0.25rem;
}
.no .noTwo p span {
  padding: 0.1875rem 0.625rem;
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-size: 0.8125rem;
}
.no .noThree p img {
  display: inline-block;
  width: 3.4375rem;
  height: 1.4375rem;
  vertical-align: middle;
  margin-top: -0.25rem;
}
.no .noThree p span {
  padding: 0.1875rem 0.625rem;
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-size: 0.8125rem;
}
.no .pOne {
  margin-bottom: 0.9375rem;
}
.no .pTwo {
  margin-bottom: 1.75rem;
  line-height: 1.25rem;
}
/* 常见问题 */
.problem {
  width: 100%;
}
.problem .problem-title {
  width: 100%;
  text-align: center;
}
.problem .problem-title img {
  width: 5rem;
  height: 1.4375rem;
}
.problem .problem-content {
  width: 100%;
  background-color: #eef1f4;
  margin-top: 1.125rem;
}
.problem .problem-content .proItem {
  padding: 0 0.75rem;
  box-sizing: border-box;
}
.problem .problem-content .style1 {
  display: inline-block;
  color: #ffffff;
  padding: 0.3125rem 0.625rem;
  box-sizing: border-box;
  margin-top: 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: #666666;
  border-radius: 15px;
  position: relative;
}
.problem .problem-content .style1 span {
  position: absolute;
  left: 0.3125rem;
  bottom: -0.25rem;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid #666666;
  transform: rotate(46deg);
  -ms-transform: rotate(46deg); /* IE 9 */
  -moz-transform: rotate(46deg); /* Firefox */
  -webkit-transform: rotate(46deg); /* Safari 和 Chrome */
  -o-transform: rotate(46deg);
}
.problem .problem-content .style2 {
  margin-top: 0.6875rem;
  font-size: 0.875rem;
  color: #858585;
  line-height: 1.25rem;
}
.problem .problem-content .remarks {
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  color: #282828;
  padding: 1.5625rem 0 1.125rem;
}
/* 基础知识 */
.lore {
  width: 100%;
}
.lore .lore-title {
  width: 100%;
  text-align: center;
  margin-top: 1.4375rem;
}
.lore .lore-title img {
  width: 5rem;
  height: 1.4375rem;
}
.lore .lore-box {
  margin-top: 1.125rem;
  box-sizing: border-box;
  background: repeating-linear-gradient(45deg, #ffffff, #d7d7d7 10%, #fff 15%);
  padding: 0.25rem;
}
.lore .lore-box .lore-content {
  width: 100%;
  background-color: #fff;
  padding: 0 0.375rem;
  box-sizing: border-box;
}
.lore .lore-box .lore-content .loreItem {
  padding-top: 1.0625rem;
  display: flex;
}
.lore .lore-box .lore-content .loreItem .text {
  color: #282828;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.25rem;
}
.lore .lore-box .lore-content .loreItem .text span {
  font-weight: 400;
}
.lore .lore-box .lore-content .loreItem img {
  height: 0.8125rem;
  width: 0.8125rem;
  margin-top: -0.125rem;
  margin-right: 0.3125rem;
}
/* .notice {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.title .title-main {
  width: 100%;
  height: 25px;
  text-align: center;
  color: #282828;
  font-size: 17px;
  font-weight: 600;
  padding-top: 15px;
}
.title .title-body {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #9e9e9e;
  margin-top: 18px;
  padding-bottom: 18px;
}
.title .title-body p {
  line-height: 20px;
}

.no {
  padding: 0 15px;
  box-sizing: border-box;
}
.no .noOne,
.noTwo,
.noThree p {
  color: #282828;
  font-size: 13px;
}
.no .noOne p img {
  display: inline-block;
  width: 55px;
  height: 23px;
  vertical-align: middle;
  margin-top: -4px;
}
.no .noOne p span {
  padding: 3px 10px;
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-size: 13px;
}
.no .noTwo p img {
  display: inline-block;
  width: 55px;
  height: 23px;
  vertical-align: middle;
  margin-top: -4px;
}
.no .noTwo p span {
  padding: 3px 10px;
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-size: 13px;
}
.no .noThree p img {
  display: inline-block;
  width: 55px;
  height: 23px;
  vertical-align: middle;
  margin-top: -4px;
}
.no .noThree p span {
  padding: 3px 10px;
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-size: 13px;
}
.no .pOne {
  margin-bottom: 15px;
}
.no .pTwo {
  margin-bottom: 28px;
  line-height: 20px;
}
.problem {
  width: 100%;
}
.problem .problem-title {
  width: 100%;
  text-align: center;
}
.problem .problem-title img {
  width: 80px;
  height: 23px;
}
.problem .problem-content {
  width: 100%;
  background-color: #eef1f4;
  margin-top: 18px;
}
.problem .problem-content .proItem {
  padding: 0 12px;
  box-sizing: border-box;
}
.problem .problem-content .style1 {
  display: inline-block;
  color: #ffffff;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-top: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: #666666;
  border-radius: 15px;
  position: relative;
}
.problem .problem-content .style1 span {
  position: absolute;
  left: 5px;
  bottom: -4px;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid #666666;
  transform: rotate(46deg);
  -ms-transform: rotate(46deg);
  -moz-transform: rotate(46deg); 
  -webkit-transform: rotate(46deg); 
  -o-transform: rotate(46deg);
}
.problem .problem-content .style2 {
  margin-top: 11px;
  font-size: 14px;
  color: #858585;
  line-height: 20px;
}
.problem .problem-content .remarks {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #282828;
  padding: 25px 0 18px;
}
.lore {
  width: 100%;
}
.lore .lore-title {
  width: 100%;
  text-align: center;
  margin-top: 23px;
}
.lore .lore-title img {
  width: 80px;
  height: 23px;
}
.lore .lore-box {
  margin-top: 18px;
  box-sizing: border-box;
  background: repeating-linear-gradient(45deg, #ffffff, #d7d7d7 10%, #fff 15%);
  padding: 4px;
}
.lore .lore-box .lore-content {
  width: 100%;
  background-color: #fff;
  padding: 0 6px;
  box-sizing: border-box;
}
.lore .lore-box .lore-content .loreItem {
  padding-top: 17px;
  display: flex;
}
.lore .lore-box .lore-content .loreItem .text {
  color: #282828;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
}
.lore .lore-box .lore-content .loreItem .text span {
  font-weight: 400;
}
.lore .lore-box .lore-content .loreItem img {
  height: 13px;
  width: 13px;
  margin-top: -2px;
  margin-right: 5px;
} */
</style>

