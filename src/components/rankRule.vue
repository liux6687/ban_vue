<template>
    <div class="rank">
        <div class="box">
            <div class="title">
                <img :src="huiyuan">
                <span>会员等级介绍</span>
            </div>
            <div class="text">
                <span>会员等级是基于用户一定时期内使用BAN洗护服务累计获取的积分所决定，用户达到相应的等级门槛即可升级。用户可通过洗护服务消费及洗护卡充值来获取积分，从而提升等级。(比例：1元=1积分）</span>
            </div>
        </div>
        <div class="box">
            <div class="title">
                <img :src="time">
                <span>等级有效期</span>
            </div>
            <div class="text">
                <span>会员等级有效期为1年，若用户升级,新等级有效期从升级当天开始重新计算.若您没在有效期内升级,等级有效期当天会计算新的等级，变更时间在0点-24点之间，由系统逐步批量处理。当等级变更日期与充值奖励积分日期为同一天时，系统会自动延迟发放充值奖励积分。同时您在等级有效期日当天等级变更前获取的积分是计算在上一个等级有效期的等级积分内，等级变更后获取的积分是计算在新的等级有效期的等级积分内。所以在临界升级的用户请提前完成升级。</span>
            </div>
        </div>
        <div class="box">
            <div class="title">
                <img :src="up">
                <span>升等级规则</span>
            </div>
            <div class="text">
                <span>用户在等级有效期内等级积分达到升级门槛值，新等级立即生效。等级到期后，用户等级将根据上个有效期内等级积分重新计算。</span>
            </div>
        </div>
        <div class="box">
            <div class="title">
                <img :src="jifen">
                <span>积分说明</span>
            </div>
            <div class="text">
                <span>等级积分：用户在等级有效期内获取的积分总计。用户升级或到达有效期，等级积分自动清零，用户正常获取积分和退款回扣积分会影响等级积分，使用积分兑换权益，权益兑换失败后的积分退回和积分过期清理都不影响等级积分。</span>
            </div>
        </div>
        <div class="box">
            <div class="title">
                <img :src="table">
                <span>会员等级对照表</span>
            </div>
            <div class="text">
                <span>用户等级积分达到对应升级门槛，则立即升级。有效期结束后，用户的等级将根据上个有效期内已累计积分重新计算等级。</span>
                <table>
                    <thead>
                        <th>等级</th>
                        <th>对应升级积分</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>普通会员</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>星会员</td>
                            <td>300</td>
                        </tr>
                        <tr>
                            <td>黄金会员</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>铂金会员</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>钻石会员</td>
                            <td>2000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
export default {
  data() {
    return {
      huiyuan: require("../assets/img/rankRule/huiyuan.png"),
      time: require("../assets/img/rankRule/time.png"),
      up: require("../assets/img/rankRule/up.png"),
      jifen: require("../assets/img/rankRule/jifen.png"),
      table: require("../assets/img/rankRule/table.png")
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
.rank {
  width: 100%;
  background-color: #fff;
  padding-bottom: 1.25rem;
  box-sizing: border-box;
}
.box {
  padding-top: 0.9375rem;
}
.title {
  width: 100%;
  padding-left: 0.9375rem;
  box-sizing: border-box;
}
.title img {
  width: 0.9375rem;
  height: 0.9375rem;
  vertical-align: middle;
  margin-top: -0.125rem;
  margin-right: 0.3125rem;
}
.title span {
  font-size: 0.875rem;
  color: #282828;
  font-weight: 600;
}
.text {
  width: 100%;
  padding: 0 2.3125rem;
  box-sizing: border-box;
  margin-top: 0.625rem;
}
.text span {
  font-size: 0.8125rem;
  color: #858585;
  line-height: 1.25rem;
}
table {
  width: 100%;
  border: 1px solid #e0e0e0;
  margin-top: 0.9375rem;
}
table thead {
  background-color: #e0e0e0;
}
table thead th {
  height: 2.5rem;
  font-size: 0.8125rem;
  color: #282828;
}
table tbody tr {
  width: 100%;
  height: 2.5rem;
  font-size: 0.8125rem;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}
table tbody tr:last-child {
  border-bottom: none;
}
</style>


