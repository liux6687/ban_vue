import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//动画css
import 'animate.css'
// vue-touch
// var VueTouch = require('vue-touch')
// Vue.use(VueTouch, {
//   name: 'v-touch'
// })
//引入Mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引用mint-ui框架
Vue.use(MintUI)
//导入vueResource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 导入默认css
import '../root.css'
//导入moment
import moment from 'moment'
//创建全局的过滤器
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY/MM/DD HH:mm';
  return moment(value).format(formatString); // value可以是普通日期 20170723
  // return moment.unix(value).format(formatString); // 这是时间戳转时间
});

// import HelloWorld from '@/components/HelloWorld'
import Test from '../components/test.vue'
import Share from '../components/share.vue'
import Allocation from '../components/allocation.vue'
import Trends from '../components/trends.vue'
import Article from '../components/article.vue'
import Invite from '../components/invite.vue'
import Get from '../components/get.vue'
import Details from '../components/details.vue'
import CircleDetails from '../components/circleDetails.vue'
import ActDetails from '../components/actDetails.vue'
import ExtActivityShow from '../components/Ext.Activity.show.vue'
import ExtActivityVote from '../components/Ext.Activity.vote.vue'
import EquipmentDetails from '../components/equipment.details.vue'
import Ranking from '../components/ranking.vue'
import Appraisal from '../components/appraisal.vue'
import Customized from '../components/customized.vue'
import CustomShose from '../components/customShose.vue'
import Customer from '../components/customer.vue'
import CustomerNew from '../components/customerNew.vue'
import Protocol from '../components/protocol.vue'
import Notice from '../components/notice.vue'
import Rules from '../components/rules.vue'
import RankRule from '../components/rankRule.vue'
import PriceList from '../components/priceList.vue'
import CommonProblem from '../components/commonProblem.vue'
import AppraisalProblem from '../components/appraisalProblem.vue'
import Examine from '../components/examine.vue'
import Score from '../components/score.vue'
import Free from '../components/free.vue'
import Profession from '../components/profession.vue'
import AppraisalBrand from '../components/appraisalBrand.vue'
import DrawCash from '../components/DrawCash.vue'
import TrialProved from '../components/trialProved.vue'
import ApprExpressive from '../components/apprExpressive.vue'

export default new Router({
  routes: [{
      name: 'test',
      path: '/test/:id',
      component: Test
    }, //测试
    {
      path: '/product/item/:id',
      name: 'share',
      component: Share
    }, //装备详情@配置 product/item
    {
      path: '/mall/goods/:id',
      name: 'allocation',
      component: Allocation
    }, //商品详情@配置  goods
    {
      name: 'trends',
      path: '/circle/moment/:id',
      component: Trends
    }, //圈子@动态详情 circle/moment
    {
      name: 'article',
      path: '/cms/article/:id',
      component: Article
    }, //长文章@详情  cms/article
    {
      name: 'invite',
      path: '/invite/:id',
      component: Invite
    }, //邀请好友
    {
      name: 'get',
      path: '/success',
      component: Get
    }, //获得
    {
      name: 'details',
      path: '/ext/activity/draw/:id',
      component: Details
    }, //抽奖活动详情
    {
      name: 'circleDetails',
      path: '/circleDetails/:id',
      component: CircleDetails
    }, //群详情鞋圈
    {
      name: 'actDetails',
      path: '/actDetails/:id',
      component: ActDetails
    }, //群活动详情
    {
      name: 'ExtActivityShow',
      path: '/ext/activity/show/:id',
      component: ExtActivityShow
    }, //选秀活动详情
    {
      name: 'ExtActivityVote',
      path: '/ext/activity/vote/:id',
      component: ExtActivityVote
    }, //选秀个人拉票
    {
      name: 'EquipmentDetails',
      path: '/equipment/details/:id',
      component: EquipmentDetails
    }, //装备详情
    {
      name: 'ranking',
      path: '/ext/activity/rank/:id',
      component: Ranking
    }, //选秀活动获奖排名
    {
      name: 'Appraisal',
      path: '/appraisal/:id',
      component: Appraisal
    }, //鉴定分享
    {
      name: 'customized',
      path: '/customized/:id',
      component: Customized
    }, //定制详情
    {
      name: 'customShose',
      path: '/custom/shoes/:id',
      component: CustomShose
    }, //定制作品封面
    {
      name: 'customer',
      path: '/customer/:id',
      component: Customer
    }, //定制师主页最热(待定)
    {
      name: 'customerNew',
      path: '/customerNew/:id',
      component: CustomerNew
    }, //定制师主页最新(待定)
    {
      name: 'protocol',
      path: '/protocol',
      component: Protocol
    }, //定制协议
    {
      name: 'notice',
      path: '/notice',
      component: Notice
    }, //定制协议
    {
      name: 'rules',
      path: '/rules',
      component: Rules,
    }, //洗护章程
    {
      name: 'rankRule',
      path: '/rankRule',
      component: RankRule,
    }, //等级规则
    {
      name: 'priceList',
      path: '/priceList',
      component: PriceList,
    }, //费用标准
    {
      name: 'commonProblem',
      path: '/commonProblem',
      component: CommonProblem,
    }, //常见问题
    {
      name: 'appraisalProblem',
      path: '/appraisalProblem',
      component: AppraisalProblem,
    }, //鉴定流程及常见问题
    {
      name: 'examine',
      path: '/examine/:id/:token',//品牌id
      component: Examine,
    }, //模拟考试/升级考试
    {
      name: 'score',
      path: '/score/:id',
      component: Score,
    }, //升级考试结果
    {
      name: 'free',
      path: '/free',
      component: Free,
    }, //免费鉴定
    {
      name: 'profession',
      path: '/profession',
      component: Profession,
    }, //专业鉴定
    {
      name: 'appraisalBrand',
      path: '/appraisalBrand/:token',
      component: AppraisalBrand,
    }, //鉴定师列表（内嵌页）
    {
      name: 'DrawCash',
      path: '/appraisal/wallet/withdraw/:token',
      component: DrawCash,
    }, //杨哥提现
    {
      name: 'trialProved',
      path: '/trialProved',
      component: TrialProved,
    }, //鉴定师考核声明
    {
      name: 'apprExpressive',
      path: '/apprExpressive/:token',
      component: ApprExpressive,
    }, //鉴定师提现明细
  ]
})
