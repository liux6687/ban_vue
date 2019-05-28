<template>
    <div>
        <!-- banner图 -->
        <div class="banner">
            <img :src="'https://static.tosneaker.com'+Data.image">
            <span>定制ID：{{Data.id}}</span>
        </div>
        <!-- user用户 -->
        <div class="user">
            <span><img :src="'https://static.tosneaker.com'+User.avatar"></span>
            <p>{{User.name}}</p>
        </div>
        <!-- content内容 -->
        <div class="content">
            <div class="sanjiaoBox">
                <span class="sanjiao"></span>
            </div>
            <div class="title">
                {{Data.custom_post_name}}
            </div>
            <div class="miaoshu">
                {{Data.description}}
            </div>
            <div class="pic">
                <img :src="sanjiaoBottom" class="top">
                <video controls="controls" :src="url" width="100%" muted="true" loop autoplay>
                  <source :src="url" type="video/mp4">
                </video>
                <img :src="'https://static.tosneaker.com'+Data.custom_main_image">
                <img :src="'https://static.tosneaker.com'+Data.custom_assist_image">
                <img :src="sanjiaoTop" class="bottom">
            </div>
            <div class="handle clearfix">
                <div class="handle-left">
                    昨天 13:30
                </div>
                <div class="handle-right">
                    <span>20次点赞</span>
                    <span>26次分享</span>
                </div>
            </div>
        </div>
        <!-- 评论 -->
        <div class="comment">
            <div class="none" v-if="comment == 0" v-show="isTrue">
                <img :src="noComment">
                <p>还没有人评论</p>
            </div>
            <div class="item" v-for="(item,index) in comment" :key="index">
                <div class="itemTop">
                    <div class="itemImg">
                        <img :src="'https://static.tosneaker.com'+item.user.avatar">
                    </div>
                    <div class="itemName">
                        <p>{{item.user.name}}</p>
                        <span>{{item.content}}</span>
                    </div>
                </div>
                <div class="itemBottom">
                    <span class="itemTime">{{item.created_at | moment}}</span>
                    <span class="itemLaud"><a>回复</a> · <img :src="zan"> {{item.like_cnt}}</span>
                </div>
                <div class="commentSay">
                    <p v-for="(items,index) in item.children" :key="index">
                        <span class="commentUser">{{items.user.name}}<a>定制师</a>：</span>
                        <span class="commentContent">{{items.content}}</span>
                    </p>
                    <div class="commentMore">
                        查看全部{{item.comment_cnt}}条评论 <span></span>
                    </div>
                </div>
            </div>
            <!-- <div class="item">
                <div class="itemTop">
                    <div class="itemImg">
                        <img :src="header">
                    </div>
                    <div class="itemName">
                        <p>小龙包</p>
                        <span>aj31测评，实战最佳之选~aj31测评，实战最佳之选~aj31测评，实战最佳之选~aj31测评，实战最佳之选~</span>
                    </div>
                </div>
                <div class="itemBottom">
                    <span class="itemTime">10分钟前</span>
                    <span class="itemLaud"><a>回复</a> · <img :src="zan"> 24</span>
                </div>
                <div class="commentSay">
                    <p>
                        <span class="commentUser">用户2<a>定制师</a>：</span>
                        <span class="commentContent">你的牌打得也忒好了</span>
                    </p>
                    <p>
                        <span class="commentUser">用户2<a>定制师</a>：</span>
                        <span class="commentContent">你的牌打得也忒好了</span>
                    </p>
                    <p>
                        <span class="commentUser">用户2<a>定制师</a>：</span>
                        <span class="commentContent">你的牌打得也忒好了,快点啊，我等到花都谢了~</span>
                    </p>
                    <div class="commentMore">
                        查看全部24条评论 <span></span>
                    </div>
                </div>
            </div> -->
        </div>
        <!-- 前往定制 -->
        <div class="goBan">
            <a href="javascript:;" @click="judge()">前往定制</a> 
        </div>
        <div class="weixin">
            请在浏览器中打开
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      banner: require("../assets/img/actDetails/bigImg.png"),
      header: require("../assets/img/article/head1.png"),
      sanjiaoTop: require("../assets/img/customized/sanjiaoTop.png"),
      sanjiaoBottom: require("../assets/img/customized/sanjiaoBottom.png"),
      zan: require("../assets/img/customized/zan.png"),
      noComment: require("../assets/img/trends/无评论.png"), //没有评论
      no: 1,
      isTrue: true,
      id: this.$route.params.id,
      Data:[],
      User:[],
      url:'',
      comment:[]
    };
  },
  methods: {
    // judge: function() {
    //   var newId = this.id;
    //   var ua = window.navigator.userAgent.toLowerCase();
    //   //微信
    //   if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //     document.getElementsByClassName("weixin")[0].style.display = "block";
    //   } else {
    //     //非微信浏览器
    //     if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    //       window.location.href = "iOSBAN://?determineDetailID=" + newId; //ios app协议
    //       window.setTimeout(function() {
    //         window.location.href = "https://www.tosneaker.com/app/download?ADTAG=396.487";
    //       }, 2000);
    //     } else if (navigator.userAgent.match(/android/i)) {
    //       window.location.href = "ban://tosneaker.android/appraise/info?id=" + newId;
    //       setTimeout(function() {
    //         window.location.href = "https://www.tosneaker.com/app/download?ADTAG=370.486"; //android下载地址
    //       }, 2000);
    //     }
    //   }
    // },
    getData(){
        var url = 'http://tosneaker.test/api/ext/custom/post/show/'+this.id
        this.$http.get(url).then(
            res=>{
                this.Data = res.data.custom_post_show;
                this.User = res.data.custom_post_show.user_profile;
            },
            res=>{

            }
        )
    },
    getComment(){
      var url = 'http://tosneaker.test/api/ext/custom/post/index?post_id='+this.id
      this.$http.get(url).then(
        res=>{
          this.comment = res.data.data;
        },
        res=>{

        }
      )
    },
    loadUrl: function(){
      var _this = this;
      setTimeout(function(){
          _this.url = 'http://img-cdn.wanyouxi.com/video/20170601_mdzz_recommend_video.mp4';
      },5000);
    }
  },
  mounted(){
      this.getData();
      this.getComment();
      this.loadUrl();
  }
};
</script>

<style scoped>
video::-internal-media-controls-download-button {
    display:none;
}
video::-webkit-media-controls-enclosure {
    overflow:hidden;
}
video::-webkit-media-controls-panel {
    width: calc(100% + 40px); 
}
/* banner图 */
.banner {
  width: 100%;
  position: relative;
}
.banner img {
  width: 100%;
  display: block;
}
.banner span {
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  right: 10px;
}
/* user */
.user {
  position: relative;
  width: 100%;
  text-align: center;
  background-color: #fff;
}
.user span {
  display: inline-block;
  width: 75px;
  height: 75px;
  padding: 3px;
  background-color: #f5f5f5;
  border-radius: 50%;
  margin-top: -50px;
}
.user span img {
  display: block;
  width: 100%;
  border-radius: 50%;
}
.user p {
  font-size: 14px;
  color: #282828;
}
/* content部分 */
.content {
  width: 100%;
  padding: 0px 12px;
  box-sizing: border-box;
  background-color: #fff;
  padding-top: 5px;
}
.content .sanjiaoBox {
  text-align: center;
  margin-bottom: -4px;
}
.content .sanjiao {
  display: inline-block;
  border-top: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid #797979;
  border-right: 10px solid transparent;
}
.content .title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: #797979;
  color: #fff;
  font-size: 20px;
}
.content .miaoshu {
  padding: 20px 0px 15px;
  line-height: 30px;
}
.content .pic {
  width: 100%;
  text-align: center;
}
.content .pic img {
  display: block;
  margin-bottom: 15px;
}
.content .pic .top {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-bottom: 10px;
}
.content .pic .bottom {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-bottom: 0px;
}
.content .handle {
  width: 100%;
  font-size: 13px;
  color: #989898;
  padding: 15px 0px 20px;
  box-sizing: border-box;
}
.content .handle .handle-left {
  float: left;
}
.content .handle .handle-right {
  float: right;
}
.content .handle .handle-right span {
  margin-left: 20px;
}
/* comment评论 */
.comment {
  width: 100%;
  background-color: #fff;
  margin-top: 12px;
  margin-bottom: 50px;
}
/* 没有评论 */
.none {
  width: 100%;
  height: 13rem;
  margin-top: 0.125rem;
  background-color: #fff;
  text-align: center;
}
.none img {
  width: 9.375rem;
  height: 4.875rem;
  margin-top: 2.875rem;
  margin-bottom: 1.6875rem;
}
.none p {
  color: #989898;
  font-size: 0.9375rem;
}
.comment .item {
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  padding: 20px 12px;
  box-sizing: border-box;
}
.comment .item .itemTop {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
}
.comment .item .itemTop img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 12px;
}
.comment .item .itemTop p {
  font-size: 14px;
  color: #5e94f5;
}
.comment .item .itemTop span {
  font-size: 16px;
  color: #282828;
}
.comment .item .itemBottom {
  margin-left: 50px;
  margin-top: 12px;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.comment .item .itemBottom .itemTime {
  font-size: 13px;
  color: #989898;
}
.comment .item .itemBottom .itemLaud {
  font-size: 13px;
  color: #5e94f5;
}
.comment .item .itemBottom .itemLaud a {
  font-size: 13px;
  color: #656565;
}
.comment .item .itemBottom .itemLaud img {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  margin-top: -5px;
}
.comment .item .commentSay {
  margin-left: 50px;
  margin-top: 12px;
  padding: 12px 9px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  border-radius: 4px;
}
.comment .item .commentSay p {
  margin-bottom: 10px;
}
.comment .item .commentSay p .commentUser {
  font-size: 14px;
  color: #5e94f5;
}
.comment .item .commentSay p .commentUser a {
  font-size: 11px;
  color: #5e94f5;
  border: 1px solid #5e94f5;
  border-radius: 5px;
  margin-left: 7px;
  padding: 1px;
  box-sizing: border-box;
}
.comment .item .commentSay p .commentContent {
  font-size: 14px;
  color: #282828;
}
.comment .item .commentSay .commentMore {
  font-size: 13px;
  color: #989898;
}
.comment .item .commentSay .commentMore span {
  display: inline-block;
  border-left: 5px solid #989898;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid transparent;
}
/* 前往鉴定 */
.goBan {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3.125rem;
  background-color: #5e95f4;
  text-align: center;
  line-height: 3.125rem;
  color: #fff;
}
.goBan a {
  display: inline-block;
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  font-size: 0.9375rem;
  color: #fff;
  background-color: #5e95f4;
}
.weixin {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  z-index: 99;
  color: #fff;
  font-size: 2rem;
  text-align: center;
  padding-top: 20%;
  display: none;
}
</style>


