<template>
    <div class="list">
        <div class="header" :style="bg">
            <p class="first">
                <b>项目</b>
                <b>材质</b>
            </p>
            <!-- <p>材质</p> -->
            <p>皮质面料</p>
            <p>翻毛皮</p>
            <p>其他面料</p>
        </div>
        <table>
            <!-- <thead :style="bg">
                <tr>
                    <th>
                        项目
                    </th>
                    <th>材质</th>
                    <th>皮质</th>
                    <th>PK面料</th>
                    <th>特殊面料</th>
                </tr>
            </thead> -->
            <tbody>
                <!-- 清洗 -->
                <tr>
                    <td rowspan="2">
                        <img :src="clear" alt="">
                        <span>清洗</span>
                    </td>
                    <td>标洗</td>
                    <td>39</td>
                    <td colspan="2">暂不提供</td>
                </tr>
                <tr>
                    <td>精洗</td>
                    <td>69</td>
                    <td>69</td>
                    <td>79</td>
                </tr>
                <!-- 粘胶 -->
                <tr>
                    <td rowspan="4">
                        <img :src="zanjiao" alt="">
                        <span>粘胶</span>
                    </td>
                    <td>轻度</td>
                    <td colspan="3">49</td>
                </tr>
                <tr>
                    <td>中度</td>
                    <td colspan="3">69</td>
                </tr>
                <tr>
                    <td>重度</td>
                    <td colspan="3">189</td>
                </tr>
                <tr>
                    <td>全掌</td>
                    <td colspan="3">349</td>
                </tr>
                <!-- 鞋面修复 -->
                <tr>
                    <td rowspan="3">
                        <img :src="xiufu" alt="">
                        <span>鞋面修复</span>
                    </td>
                    <td>轻度</td>
                    <td>49</td>
                    <td rowspan="3" colspan="2">暂不提供</td>
                </tr>
                <tr>
                    <td>中度</td>
                    <td>69</td>
                </tr>
                <tr>
                    <td>重度</td>
                    <td>89</td>
                </tr>
                <!-- 漆皮修复 -->
                <tr>
                    <td rowspan="2">
                        <img :src="xiufu" alt="">
                        <span>漆皮修复</span>
                    </td>
                    <td>
                        局部
                    </td>
                    <td colspan="2">暂不提供</td>
                    <td>259</td>
                </tr>
                <tr>
                    <td>整体</td>
                    <td colspan="2">暂不提供</td>
                    <td>519</td>
                </tr>
                <!-- 鞋面补色 -->
                <tr>
                    <td rowspan="3">
                        <img :src="buse" alt="">
                        <span>鞋面补色</span>
                    </td>
                    <td>普通色</td>
                    <td colspan="2">119</td>
                    <td>159</td>
                </tr>
                <tr>
                    <td>
                        <p>特殊色</p>
                        <p>(如珠光色,金属色)</p>
                    </td>
                    <td colspan="3">189</td>
                </tr>
                <tr>
                    <td>多种颜色</td>
                    <td colspan="3">每增加一种颜色收费+69</td>
                </tr>
                <!--中底修复  -->
                <tr>
                    <td rowspan="4">
                        <img :src="xiufu" alt="">
                        <span>中底修复</span>
                    </td>
                    <td>去漆</td>
                    <td colspan="3">89</td>
                </tr>
                <tr>
                    <td>普通色</td>
                    <td colspan="119">119</td>
                </tr>
                <tr>
                    <td>
                        <p>特殊色</p>
                        <p>(如珠光色,金属色)</p>
                    </td>
                    <td colspan="3">189</td>
                </tr>
                <tr>
                    <td>多种颜色</td>
                    <td colspan="3">每增加一种颜色收费+69</td>
                </tr>
                <!-- 基础护理 -->
                <tr>
                    <td rowspan="2">
                        <img :src="huli" alt="">
                        <span>护理</span>
                    </td>
                    <td>基础</td>
                    <td colspan="3">29(翻毛皮建议勾选)</td>
                </tr>
                <tr>
                    <td>高级</td>
                    <td colspan="3">49(皮质建议勾选)</td>
                </tr>
                <!-- 防水 -->
                <tr>
                    <td>
                        <img :src="fangshui" alt="">
                        <span>防水</span>
                    </td>
                    <td>标准</td>
                    <td colspan="3">49</td>
                </tr>
                <!-- 上油 -->
                <!-- <tr>
                    <td>
                        <img :src="shangyou" alt="">
                        <span>上油</span>
                    </td>
                    <td>标准</td>
                    <td colspan="3">69</td>
                </tr> -->
                <!-- 去油 -->
                <tr>
                    <td rowspan="3">
                        <img :src="quyou" alt="">
                        <span>去油</span>
                    </td>
                    <td>轻度</td>
                    <td colspan="3">49</td>
                </tr>
                <tr>
                    <td>中度</td>
                    <td colspan="3">89</td>
                </tr>
                <tr>
                    <td>重度</td>
                    <td colspan="3">179</td>
                </tr>
                <!-- 发黄去氧化 -->
                <tr>
                    <td rowspan="2">
                        <img :src="quyanghua" alt="">
                        <span>发黄去氧化</span>
                    </td>
                    <td>橡胶底</td>
                    <td colspan="3">139</td>
                </tr>
                <tr>
                    <td>水晶底</td>
                    <td colspan="3">289</td>
                </tr>
                <!-- 大底改色 -->
                <tr>
                    <td rowspan="3">
                        <img :src="dadigaise" alt="">
                        大底改色
                    </td>
                    <td>boost底</td>
                    <td colspan="3">159</td>
                </tr>
                <tr>
                    <td>水晶底</td>
                    <td colspan="3">189</td>
                </tr>
                <tr>
                    <td>橡胶底</td>
                    <td colspan="3">119</td>
                </tr>
                <!-- 破洞织补 -->
                <tr>
                    <td rowspan="3">
                        <img :src="buding" alt="">
                        <span>破洞织补</span>
                    </td>
                    <td>小于2cm</td>
                    <td rowspan="3">暂不提供</td>
                    <td colspan="2">89</td>
                </tr>
                <tr>
                    <td>2~5cm</td>
                    <td colspan="2">129</td>
                </tr>
                <tr>
                    <td>大于5cm</td>
                    <td colspan="2">189</td>
                </tr>
                <!-- 内衬更换 -->
                <tr>
                    <td rowspan="3">
                        <img :src="genghuan" alt="">
                        <span>内衬更换</span>
                    </td>
                    <td>低帮</td>
                    <td colspan="3">219</td>
                </tr>
                <tr>
                    <td>中帮</td>
                    <td colspan="3">239</td>
                </tr>
                <tr>
                    <td>高帮</td>
                    <td colspan="3">259</td>
                </tr>
                <!--专业贴底  -->
                <tr>
                    <td rowspan="3">
                        <img :src="xiedi" alt="" class="xiedi">
                        <span>专业贴底</span>
                    </td>
                    <td>前掌</td>
                    <td colspan="3">189</td>
                </tr>
                <tr>
                    <td>后掌</td>
                    <td colspan="3">149</td>
                </tr>
                <tr>
                    <td>全掌</td>
                    <td colspan="3">299</td>
                </tr>
                <!-- 串色处理 -->
                <tr>
                    <td rowspan="3">
                        <img :src="chuanse" alt="">
                        <span>串色处理</span>
                    </td>
                    <td>轻度</td>
                    <td colspan="3">49</td>
                </tr>
                <tr>
                    <td>中度</td>
                    <td colspan="3">89</td>
                </tr>
                <tr>
                    <td>重度</td>
                    <td colspan="3">179</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script  type="text/ecmascript-6">
export default {
  data() {
    return {
      bg: {
        backgroundImage:
          "url(" + require("../assets/img/priceList/bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      clear: require("../assets/img/priceList/clear.png"),
      zanjiao: require("../assets/img/priceList/zanjiao.png"),
      xiufu: require("../assets/img/priceList/xiufu.png"),
      buse: require("../assets/img/priceList/buse.png"),
      huli: require("../assets/img/priceList/jichu.png"),
      fangshui: require("../assets/img/priceList/fangshui.png"),
      shangyou: require("../assets/img/priceList/shangyou.png"),
      quyou: require("../assets/img/priceList/quyou.png"),
      quyanghua: require("../assets/img/priceList/quyanghua.png"),
      dadigaise: require("../assets/img/priceList/dadigaise.png"),
      buding: require("../assets/img/priceList/buding.png"),
      genghuan: require("../assets/img/priceList/genghuan.png"),
      xiedi: require("../assets/img/priceList/xiedi.png"),
      chuanse: require("../assets/img/priceList/chuanse.png")
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
.list {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 2.1875rem 0 0.75rem;
  box-sizing: border-box;
}

.header {
  width: 94%;
  height: 2.1875rem;
  background-color: red;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.header .first {
  width: 40%;
  position: relative;
  box-sizing: border-box;
  text-align: right;
  padding-right: 0.9375rem;
}
.header .first::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1.0625rem;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  transform-origin: bottom center;
  transform: rotateZ(13deg) scale(1.01);
}
.header .first b:nth-child(1) {
  position: absolute;
  top: 0.3125rem;
  left: 0.9375rem;
}
.header .first::after {
  content: "";
  position: absolute;
  right: -0.0625rem;
  top: 0;
  width: 100%;
  height: 2.1875rem;
  box-sizing: border-box;
  border-right: 1px solid #fff;
  transform-origin: bottom center;
}
.header p {
  width: 20%;
  text-align: center;
  line-height: 2.1875rem;
  color: #fff;
  float: left;
  font-size: 0.75rem;
}

table {
  width: 94%;
  border: 1px solid #9eb1f4;
  margin: 0 auto;
}
table thead th {
  height: 2.1875rem;
  font-size: 0.75rem;
  color: #fff;
}
table thead th:nth-child(1) {
  width: 20%;
}
table thead th:nth-child(2) {
  width: 20%;
  border-right: 1px solid #fff;
}
table thead th:nth-child(3) {
  width: 20%;
}
table thead th:nth-child(4) {
  width: 20%;
}
table tbody tr {
  text-align: center;
  font-size: 0.75rem;
  color: #5e95f4;
}
table tbody tr td {
  height: 1.5625rem;
  border-bottom: 1px solid #9eb1f4;
  border-right: 1px solid #9eb1f4;
}
table tbody tr td:nth-child(1) img {
  width: 1.0625rem;
  height: 1.0625rem;
  vertical-align: middle;
}
table tbody tr td:nth-child(1) {
  width: 20%;
}
table tbody tr td:nth-child(2) {
  width: 20%;
}
table tbody tr td:nth-child(3) {
  width: 20%;
}
table tbody tr td:nth-child(4) {
  width: 20%;
}
table tbody tr td:nth-child(5) {
  width: 20%;
}
.xiedi {
  width: 0.6875rem;
  height: 1.5625rem;
}
</style>



