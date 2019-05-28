<template>
    <div class="problem">
        <!-- banner图 -->
        <div class="banner">
            <img :src="banner" alt="">
        </div>
        <!-- ban宗旨 -->
        <div class="purpose">
            BAN旨在为用户提供最优质的互联网 + 洗护修复服务体验
        </div>
        <!-- 描述 -->
        <div class="notice">
            <span>以下为总结出来的常见问题，如没有您想要询问的内容直接联系客服即可</span>
        </div>
        <!-- 正文 -->
        <div class="content">
            <!-- 如何快速联系客服？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>如何快速联系客服？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>点击洗护页面右上角（   <img :src="kefu" class="kefu">   ）联系在线客服，7*24小时为您服务。微信小程序等用户可通过拨打客服电话</span><br>
                    <span class="bold">+86-130 1138 4816 (接听时间10:00-20:00)</span>
                </div>
            </div>
            <!-- 为什么要做纯手工洗护？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>为什么要做纯手工洗护？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>每一双鞋子的材质不同，款式也多种多样，每一种材质根据污渍的严重程度又得通过不同的毛刷、不同的洗剂进行清洗；为了追求最完美的洗护效果，我们的每一名手工洗护匠人都是通过严格培训才能上岗工作的。</span>
                </div>
            </div>
            <!-- 什么是皮质材料、pk面料、特殊面料？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>什么是皮质材料、翻毛皮面料、其他面料？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span class="bold">皮质材料：</span><span>人造合成皮、皮革、网眼布Mesh等，属于最常见的材质。</span><br>
                    <span class="bold">翻毛皮面料：</span><span>一种表面带有绒毛的皮质，常见但极难清洗。</span><br>
                    <span class="bold">其他面料：</span><span>漆皮、pk面料、ow鞋类材质、yeezy鞋类材质、等其他较难清洗或清洗易破损的材质。</span><br>
                    <span class="tint">*如无法区分具体材质可询问客服后再进行下单。</span>
                </div>
            </div>
            <!-- 如何将物品送至洗护中心？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>如何将物品送至洗护中心？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>只要您附近有快递就能邮过来，哪怕国际件我们也能收！（Ps：国际件回寄邮费需用户本人承担。）</span><br>
                    <span class="tint">*建议邮寄时做好相应保护措施，邮寄途中造成的受损BAN不承担任何责任。</span>
                </div>
            </div>
            <!-- 处理周期是多久？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>处理周期是多久？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>一般情况下洗护周期3-5个工作日，修复周期7-15个工作日。特殊情况以工作人员最终与您确认的时间为准。</span><br>
                    <span class="tint">*不含快递往返时间，特殊节假日周期有可能会有延迟。</span>
                </div>
            </div>
            <!-- 什么时候付款？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>什么时候付款？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span class="bold">洗护订单：</span><span>为选中服务及清洗数量后进行付款，付款后进行邮寄。</span><br>
                    <span class="bold">修复订单：</span><span>可线上提供数张鞋子原图然后由专业人员提供修复方案后，根据修复方案内项目自由组合付款，付款后进行邮寄。</span><br>
                    <span class="bold">自助下单：</span><span>针对于平台老用户提供的一种服务方式，可自助下单后直接邮寄至洗护中心，工作人员通过实物提供最完善的修复方案，得到修复方案后根据修复方案内项目自由组合付款，付款后立即安排修复。</span>
                </div>
            </div>
            <!-- 标洗与精洗的有什么不同，能达到什么效果？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>标洗与精洗的有什么不同，能达到什么效果？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>均为纯手工清洗，标洗仅对鞋子外观进行清洗，不会清洗内部配件等细节；精洗会对鞋子进行360°全方位清洗。具体效果可参考对比图，您可放心下单，不满意全额退款！</span>
                </div>
            </div>
            <!-- 精洗是不是能解决所有问题？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>精洗是不是能解决所有问题？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>不是的，很多情况是需要结合一些修复手段来复原的。例如氧化开胶等现象通过清洗是不能解决问题的。</span>
                </div>
            </div>
            <!-- 清洗会不会对我的鞋造成损害或二次伤害？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>清洗会不会对我的鞋造成损害或二次伤害？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>相比于其他为了追求利润率及效率而使用机器进行清洗的，纯手工精洗造成的损害可忽略不计。如果您的鞋在送洗前已经有破损开胶等情况，我们会提前告知您可能产生的二次伤害，并且在最大限度的降低二次伤害的前提下进行处理。</span>
                </div>
            </div>
            <!-- 补色、补伤、补漆是按一只鞋、一双鞋还是面积大小收费？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>补色、补漆是按一只鞋、一双鞋还是面积大小收费？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>以上项目都只按照颜色种类收费，与面积大小无关。</span>
                </div>
            </div>
            <!-- 修复项目的收费中已经包含了清洗费用了吗？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>修复项目的收费中已经包含了清洗费用了吗？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>没有，所有收费项目都是单独组合叠加的，非全新商品进行修复为了达到预期效果需购买相应精洗服务。</span>
                </div>
            </div>
            <!-- 一双鞋上有多种材质材料，清洁价格该按什么算？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>一双鞋上有多种材质材料，清洁价格该按什么算？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>按照占比最大的面料计算价格。如果各面料占比相近，则按照以下优先级计算：特殊>pk面料>皮质材料</span>
                </div>
            </div>
            <!-- 修复项目中轻度、中度、重度是怎么区分的？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>修复项目中轻度、中度、重度是怎么区分的？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>拿粘胶举例，按照开胶的大小及数量区分。如鞋头与鞋身连接处常见的V折开口，一般属于标准粘胶；小于鞋身长度30%的开胶一般属于深度粘胶；更严重的就属于重度开胶啦。</span><br>
                    <span class="tint">*如无法判断破损程度可提交订单由专业人员进行判断并提供修复方案。（提供修复方案不收取任何费用，如需进行修复可根据修复方案内项目自由组合叠加）</span>
                </div>
            </div>
            <!-- 如果出现处理效果不满意的情况怎么办？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>如果出现处理效果不满意的情况怎么办？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>我们会在处理前充分告知您可能出现的风险以及可能出现的诸如轻微色差、轻微溢胶等瑕疵。如果导致您不满意的情况不在以上提前告知的范围内，我们可以提供15天之内免费返修一次的服务。</span><br>
                </div>
            </div>
            <!-- 如果出现损坏、丢失等严重问题怎么办？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>如果出现损坏、丢失等严重问题怎么办？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>请在保证没有进行使用、自行处理、交由第三方处理的前提下尽快联系我们的客服说明情况，我们会积极与您沟通补救方案。</span><br>
                </div>
            </div>
            <!-- 无法补救的话如何赔偿？ -->
            <div class="question">
                <img :src="Q" alt="">
                <span>无法补救的话如何赔偿？</span>
            </div>
            <div class="text">
                <div class="img">
                    <img :src="A" alt="">
                </div>
                <div class="text-C">
                    <span>我们会退还您的处理费用，并根据商品实际价值、行业最高标准进行赔偿，最高给予处理费用50倍的赔偿！</span><br>
                </div>
            </div>
        </div>
        <!-- 备注 -->
        <div class="remarks">
            -以上为常见问题，如果有其他特殊问题请联系客服即可-
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      banner: require("../assets/img/commonProblem/banner.png"),
      Q: require("../assets/img/commonProblem/Q.png"),
      A: require("../assets/img/commonProblem/A.png"),
      kefu: require("../assets/img/commonProblem/kefu.png")
    };
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
  .problem {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 2.1875rem 0.9375rem;
  box-sizing: border-box;
}
/*  banner图 */
.banner {
  width: 4.8125rem;
  height: 4.875rem;
  margin: 0 auto;
}
.banner img {
  width: 100%;
  height: 100%;
}
/* BAN宗旨 */
.purpose {
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 0.8125rem;
  color: #333;
  text-align: center;
  margin-top: 1.25rem;
}
/* 描述 */
.notice {
  font-size: 0.625rem;
  color: #888;
  text-align: center;
  margin-top: 0.8125rem;
}
.notice {
  font-size: 0.625rem;
}
/* 正文 */
.content {
  width: 100%;
}
.content .question {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1.8125rem;
}
.content .question img {
  width: 1.125rem;
  height: 1.125rem;
  margin-right: 0.625rem;
}
.content .question span {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #5e9ffc;
}
.content .text {
  width: 100%;
  display: flex;
  margin-top: 0.75rem;
}
.content .text .img {
  float: left;
  width: 1.125rem;
  height: 1.125rem;
  margin-right: 0.625rem;
}
.content .text .img img {
  width: 1.125rem;
  height: 1.125rem;
}
.content .text .text-C {
  font-size: 0.75rem;
  color: #666;
  line-height: 1.1875rem;
}
.content .text .text-C .kefu {
  width: 0.9375rem;
  height: 0.875rem;
  vertical-align: middle;
}
.content .text .text-C .bold {
  color: #333;
  font-weight: 600;
}
.content .text .text-C .tint {
  color: #999999;
}
/* 备注 */
.remarks{
    font-size: 0.75rem;
    line-height: 1.1875rem;
    text-align: center;
    color: #282828;
    margin-top: 1.875rem;
}
</style>


