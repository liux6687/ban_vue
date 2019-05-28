<template>
  <div class="pay">
    <div class="panel balance">
      <div class="panel-header text-right text-12" @click="detailed">明细 ＞</div>
      <div class="panel-body text-center">
        <p class="text-14">可提现余额(元)</p>
        <p class="text-30 blue">{{ available_balance }}</p>
      </div>
      <div class="panel-footer">
          <div class="pull-left text-center angle-right">
            {{ blocked_balance }}<br>冻结余额(元)
          </div>
          <div class="pull-right gray">
            鉴定贴完结后自动解冻
          </div>
      </div>
    </div>

    <div class="panel draw-cash">
      <div class="panel-header text-14">提现到我的钱包</div>
      <div class="panel-body text-30">￥<input type="number" v-model="withdraw_amount" v-on:keypress="validate" v-on:input="calculate" placeholder="0"></div>
      <div class="panel-footer">
        <div class="clearfix">
          <div class="pull-left gray">剩余金额￥{{ balance }}</div>
          <div class="pull-right blue" v-on:click="draw_all">全部提现</div>
        </div>
      </div>
    </div>

    <mt-button type="primary" size="large" class="confirm text-14" v-on:click="draw_cash_confirm">确认提现</mt-button>
  </div>
</template>

<script>
import * as numeral from "numeral";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";

export default {
  name: "HelloWorld",
  data() {
    return {
      available_balance: "0.00",
      blocked_balance: "0.00",
      withdraw_amount: "",
      balance: "0.00",
			token:"",
    };
  },
  created: function() {
    var url = "/api/appraisal/drawCash/detail";
    let token = this.$route.params.token;
    this.$data.token = token;
    var data = {
			token:this.token
    };

    var self = this;
    this.$http.get(url, { params: data }).then(
      res => {
        if (res.body.status != 200) {
          Toast(res.body.message);
          return false;
        }
        self.available_balance = res.body.data.appr_money;
        self.blocked_balance = res.body.data.appr_blocked_money;
        self.balance = numeral(self.available_balance)
          .add(self.blocked_balance)
          .format("0.00");
      },
      res => {
        console.log(res);
        if (res.status == 401) {
          Toast("认证失败，请重新登陆！");
        } else {
          Toast("服务器错误！");
        }
      }
    );
  },
  methods: {
    detailed:function(){
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        bridge.toExpressive();



      } else if (navigator.userAgent.match(/android/i)) {
        android.toExpressive();
      }
    },
    validate: function(event) {
      document.execCommand("SelectAll");
      var oldValue = document.getSelection().toString();
      document.execCommand("InsertText", false, oldValue);

      var newValue = oldValue + String.fromCharCode(event.keyCode);

      var reg = /^(0|[1-9]\d*)(\.\d{0,2})?$/;

      if (!reg.test(newValue)) {
        event.preventDefault();
      }

      if (numeral(newValue).value() > numeral(this.available_balance).value()) {
        MessageBox(
          "提现金额",
          "不能超过可提现余额 ￥" + this.available_balance
        );
        event.preventDefault();
      }
    },
    calculate: function() {
      var amount = numeral(this.available_balance)
        .add(this.blocked_balance)
        .value();
      var balance = numeral(amount)
        .subtract(this.withdraw_amount)
        .format("0.00");

      this.balance = balance > 0 ? balance : numeral(0).format("0.00");
    },
    draw_all: function() {
      this.withdraw_amount = this.available_balance;
      this.calculate();
    },
    draw_cash_confirm: function() {
      var url = "/api/appraisal/wallet/withdraw";
      var data = {
        // token: this.$route.params.token,
				token:this.token,
        money: this.withdraw_amount
      };

      var self = this;
      this.$http.post(url, data).then(
        res => {
          if (res.body.status != 201) {
            Toast(res.body.message);
            return false;
          }

          self.available_balance = numeral(self.available_balance)
            .subtract(self.withdraw_amount)
            .format("0.00");
          self.withdraw_amount = "";

          MessageBox("提现成功", "钱已提到大钱包");
        },
        res => {
          console.log(res);
          if (res.status == 401) {
            Toast("认证失败，请重新登陆！");
          } else {
            Toast("服务器错误！");
          }
        }
      );
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
.pay {
  padding: 0.75rem 0.9375rem;
  color: #282828;
  font-size: 0.8125rem;
}
.panel {
  background: #fff;
  padding: 0 0.625rem;
  border-radius: 0.1875rem;
  margin-bottom: 0.75rem;
}
.panel > div {
  padding: 0.625rem 0;
}
.panel-header {
  border-bottom: 0.0625rem solid #eef1f4;
}
.panel-footer {
  border-top: 0.0625rem solid #eef1f4;
}

.balance .panel-header {
  border: none;
  padding-top: 0.9375rem;
  padding-right: 0.3125rem;
}
.balance .panel-body {
  padding: 0;
}
.balance .blue {
  font-weight: bold;
  line-height: 1.875rem;
  margin: 0.9375rem 0 2.25rem;
}
.balance .panel-footer {
  margin: 0 -0.625rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.balance .panel-footer > div:first-child {
  width: 40%;
  padding: 0.625rem 0;
  border-right: 0.0625rem solid #eef1f4;
  position: relative;
}
.balance .panel-footer > div:last-child {
  width: 60%;
  padding-left: 10%;
}
.balance .angle-right:after {
  content: " ";
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  right: -0.3125rem;
  top: 50%;
  margin-top: -0.25rem;
  transform: rotate(45deg);
  background: #fff;
  border-top: 0.0625rem solid #eef1f4;
  border-right: 0.0625rem solid #eef1f4;
}

.draw-cash .panel-body {
  padding: 1.875rem 0.625rem;
}
.draw-cash input {
  font-size: 1.875rem;
  width: 12.5rem;
}

.confirm {
  margin-top: 6.25rem;
  background: linear-gradient(-90deg, #5e95f4 0%, #3ba9f7 50%, #11c1fa 100%);
}

.blue {
  color: #5e95f4;
}
.gray {
  color: #858585;
}

.text-12 {
  font-size: 0.75rem;
}
.text-14 {
  font-size: 0.875rem;
}
.text-30 {
  font-size: 1.875rem;
}

.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}

.clearfix:before {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
</style>
