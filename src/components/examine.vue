<template>
  <div class="examine">
    <div  v-for="(item,index) in list" :key="index" :id="item.id" >
      <div class="out" v-if="index==(showIndex-1)">
      <div class="name">
        {{item.brand.name}}
      </div>
      <div class="remarks">
        {{item.description}}
      </div>
      <div class="imgs">
        <ul>
          <li v-for="(itm,inx) in item.images" :key="inx">
            <img :src="imgUrl+itm.path+thumb" :data-indexF="index" :data-name="itm.name" :data-index="inx" @click="bigImg">
            <div class="text" :style="textBg">{{itm.name}}</div>
          </li>
        </ul>
      </div>
      <div class="judge">
        <img :src="truePic" v-if="trueChoose==1">
        <img :src="truePicGray" @click="clickTrue" :id="item.id" v-if="trueChoose==0">
        <img :src="falsePic" v-if="falseChoose==1">
        <img :src="falsePicGray" @click="clickFlse" :id="item.id" v-if="falseChoose==0">
      </div>
      </div>
    </div>
    <div class="rate" @click="rate">
      进度（{{nowStrip}}/{{count}}）→
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      imgUrl: "https://static.tosneaker.com",
      // qiniuImgUrl: "http://p3eglbig1.bkt.clouddn.com",
       qiniuImgUrl: "https://static.tosneaker.com",
      textBg: {
        backgroundImage:
          "url(" + require("../assets/img/examine/text_bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      truePic: require("../assets/img/examine/true.png"),
      truePicGray: require("../assets/img/examine/true_gray.png"),
      falsePic: require("../assets/img/examine/false.png"),
      falsePicGray: require("../assets/img/examine/false_gray.png"),
      trueChoose: 0,
      falseChoose: 0,
      token: this.$route.params.token,
      id: this.$route.params.id,
      ids: "",
      idss: [120, 87, 86],
      nowStrip: 1,// 进度，默认1
      list: [], // 考试题
      result: [],// 考试结果数组
      page: 1,
      thumb: "-crop100x100",
      exam_id: "", //考核记录id
      ten: 0,//？
      appToken: "",
      count: 0,
      showIndex: 1,
      url:'https://stg.tosneaker.com'
    };
  },
  methods: {
    //   点击看大图
    bigImg: function(event, index) {
      var self = this;
      var list = this.list;
      var target = event.target;
      var index = target.getAttribute("data-index");
      var name = target.getAttribute("data-name");
      var indexF = target.getAttribute("data-indexF");
      var imgStr = [];
      for (var i in list) {
        if (i == indexF) {
          for (var j in list[i].images) {
            var url = this.imgUrl + list[i].images[j].path;
            imgStr.push(url);
          }
        }
      }
      var num = Number(index);
      var postdata = {
        position: num,
        pics: imgStr,
        name: name
      }
			var u = navigator.userAgent, app = navigator.appVersion;
      // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
      if (isIOS) {
        self.$bridge.callhandler('showPics',(postdata)=>{
        
        })
				
      } else if (navigator.userAgent.match(/android/i)) {
        android.showPics(num, imgStr, name);
      }
    },
    //   真
    clickTrue: function(e) {
      var id = e.target.id;
      var result = this.result;
      for (var i in result) {
        if (id == result[i].id) {
          result.splice(i, 1);
        }
      }
      result.push({ id: id, result: 1 });
      this.trueChoose = 1;
      this.falseChoose = 0;
    },
    // 假
    clickFlse: function(e) {
      var id = e.target.id;
      var result = this.result;
      for (var i in result) {
        if (id == result[i].id) {
          result.splice(i, 1);
        }
      }
      result.push({ id: id, result: 0 });
      this.falseChoose = 1;
      this.trueChoose = 0;
    },
    // 获取题目
    getsubject: function() {
      var self = this;
      var u = navigator.userAgent, app = navigator.appVersion;
      // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      if (isIOS) {
        self.$bridge.callhandler('takeToken',()=>{
          // console.log("JS 调用了 OC 注册的 takeToken 方法");
        })//调用iOS方法
        self.$bridge.registerhandler('takeTokenResult', (data, responseCallback) => {
       // 定义的takeTokenResult方法
        var token = data;
        self.appToken = token;
        var url = self.url+ "/api/appraisal/examine/history";//查询历史考试记录
        var params = {
          brand_id: self.id,
          token: self.appToken
        };
        self.$http.get(url, { params: params }).then(
          res => {
            if (res.data.has_exam == false) {
              let instance = Toast({
                message: "加载中...",
                position: "middle",
                duration: 1000000
              });
              var url = self.url+"/api/appraisal/examine/ids";//随机获得 考试题目id 列表
              var params = {
                token: self.appToken,
                brand_id: self.id
              };
              self.$http.get(url, { params: params }).then(
                res => {
                  if (res.data.status == 200) {
                    self.exam_id = res.data.id;
                    // self.ids = res.data.data;
                    var params = {
                      token: self.appToken,
                      exam_id: res.data.id
                    };
                    var url =
                     self.url+ "/api/appraisal/examine/achieve";//获得10条考试题目
                     
                    self.$http.get(url, { params: params }).then(
                      res => {
                        self.nowStrip = res.data.current;
                        self.count = res.data.count;
                        self.ids = res.data.data;
                        var url =
                        self.url+  "/api/appraisal/examine";//考核列表，展示看到的图片及文字
                        var param = {
                          ids: self.ids,
                          page: self.page,
                          limit: self.ids.length
                          // limit: 1
                        };
                        self.$http.get(url, { params: param }).then(
                          res => {
                            instance.close();
                            self.list = res.data.data;
                          },
                          res => {
                            console.log(res);
                          }
                        );
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  } else if (res.data.status == 403) {
                    Toast({
                      message: res.data.message,
                      position: "middle",
                      duration: 1500
                    });
                  }
                },
                res => {
                  console.log(res);
                }
              );
            } else {
              self.exam_id = res.data.data.id;
              MessageBox.confirm("", {
                message: "是否继续上次考试？",
                title: "友情提示",
                confirmButtonText: "是",
                cancelButtonText: "否，重新开始"
              })
                .then(action => {
                  if (action == "confirm") {
                    let instance = Toast({
                      message: "加载中...",
                      position: "middle",
                      duration: 1000000
                    });
                    //确认的回调
                    var params = {
                      token: self.appToken,
                      exam_id: res.data.data.id
                    };
                    var url =
                    self.url+  "/api/appraisal/examine/achieve";//获得10条考试题目
                    self.$http.get(url, { params: params }).then(
                      res => {
                        self.nowStrip = res.data.current;
                        self.count = res.data.count;
                        self.ids = res.data.data;
                        var url =
                        self.url+  "/api/appraisal/examine";//考核列表，看到的图片及文字
                        var param = {
                          ids: self.ids,
                          page: self.page,
                          limit: self.ids.length
                          // limit: 1
                        };
                        self.$http.get(url, { params: param }).then(
                          res => {
                            instance.close();
                            self.list = res.data.data;
                          },
                          res => {
                            console.log(res);
                          }
                        );
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  }
                })
                .catch(err => {
                  if (err == "cancel") {
                    let instance = Toast({
                      message: "加载中...",
                      position: "middle",
                      duration: 1000000
                    });
                    // 取消的回调
                    var url =
                    self.url+  "/api/appraisal/examine/giveup";//放弃考试
                    var params = {
                      token: self.appToken,
                      exam_id: self.exam_id
                    };
                    self.$http.put(url, params).then(
                      res => {
                        if (res.data.status == 201) {
                          var url =
                          self.url+  "/api/appraisal/examine/ids";//随机获得考试题目id列表
                          var params = {
                            token: self.appToken,
                            brand_id: self.id
                          };
                          self.$http.get(url, { params: params }).then(
                            res => {
                              if (res.data.status == 200) {
                                self.exam_id = res.data.id;
                                var params = {
                                  token: self.appToken,
                                  exam_id: res.data.id
                                };
                                var url =
                                self.url+  "/api/appraisal/examine/achieve";//获得10条考试题目
                                self.$http.get(url, { params: params }).then(
                                  res => {
                                    self.nowStrip = res.data.current;
                                    self.count = res.data.count;
                                    self.ids = res.data.data;
                                    var url =
                                     self.url+ "/api/appraisal/examine";//考核列表，看到的图片及文字
                                    var param = {
                                      ids: self.ids,
                                      page: self.page,
                                      limit: self.ids.length
                                      // limit: 1
                                    };
                                    self.$http.get(url, { params: param }).then(
                                      res => {
                                        instance.close();
                                        self.list = res.data.data;
                                      },
                                      res => {
                                        console.log(res);
                                      }
                                    );
                                  },
                                  res => {
                                    console.log(res);
                                  }
                                );
                              } else if (res.data.status == 403) {
                                Toast({
                                  message: res.data.message,
                                  position: "middle",
                                  duration: 1500
                                });
                              }
                            },
                            res => {
                              console.log(res);
                            }
                          );
                        }
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  }
                });
            }
          },
          res => {
            console.log(res);
          }
        );
       
        responseCallback({})
      })
      
      } else if (navigator.userAgent.match(/android/i)) {
        android.takeToken();
      }
     
      window["takeTokenResult"] = function(token) {
        var token = token;
        self.appToken = token;
        var url = self.url+ "/api/appraisal/examine/history";//查询历史考试记录
        var params = {
          brand_id: self.id,
          token: self.appToken
        };
        self.$http.get(url, { params: params }).then(
          res => {
            if (res.data.has_exam == false) {
              let instance = Toast({
                message: "加载中...",
                position: "middle",
                duration: 1000000
              });
              var url = self.url+"/api/appraisal/examine/ids";//随机获得考试题目id列表
              var params = {
                token: self.appToken,
                brand_id: self.id
              };
              self.$http.get(url, { params: params }).then(
                res => {
                  if (res.data.status == 200) {
                    self.exam_id = res.data.id;
                    // self.ids = res.data.data;
                    var params = {
                      token: self.appToken,
                      exam_id: res.data.id
                    };
                    var url =
                     self.url+ "/api/appraisal/examine/achieve";//获得10条考试题目
                     
                    self.$http.get(url, { params: params }).then(
                      res => {
                        self.nowStrip = res.data.current;
                        self.count = res.data.count;
                        self.ids = res.data.data;
                        var url =
                        self.url+  "/api/appraisal/examine";//考核列表，看到的图片及文字
                        var param = {
                          ids: self.ids,
                          page: self.page,
                          limit: self.ids.length
                          // limit: 1
                        };
                        self.$http.get(url, { params: param }).then(
                          res => {
                            instance.close();
                            self.list = res.data.data;
                          },
                          res => {
                            console.log(res);
                          }
                        );
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  } else if (res.data.status == 403) {
                    Toast({
                      message: res.data.message,
                      position: "middle",
                      duration: 1500
                    });
                  }
                },
                res => {
                  console.log(res);
                }
              );
            } else {
              self.exam_id = res.data.data.id;
              MessageBox.confirm("", {
                message: "是否继续上次考试？",
                title: "友情提示",
                confirmButtonText: "是",
                cancelButtonText: "否，重新开始"
              })
                .then(action => {
                  if (action == "confirm") {
                    let instance = Toast({
                      message: "加载中...",
                      position: "middle",
                      duration: 1000000
                    });
                    //确认的回调
                    var params = {
                      token: self.appToken,
                      exam_id: res.data.data.id
                    };
                    var url =
                    self.url+  "/api/appraisal/examine/achieve";//获得10条考试题目
                    self.$http.get(url, { params: params }).then(
                      res => {
                        self.nowStrip = res.data.current;
                        self.count = res.data.count;
                        self.ids = res.data.data;
                        var url =
                        self.url+  "/api/appraisal/examine";//考核列表，看到的图片及文字
                        var param = {
                          ids: self.ids,
                          page: self.page,
                          limit: self.ids.length
                          // limit: 1
                        };
                        self.$http.get(url, { params: param }).then(
                          res => {
                            instance.close();
                            self.list = res.data.data;
                          },
                          res => {
                            console.log(res);
                          }
                        );
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  }
                })
                .catch(err => {
                  if (err == "cancel") {
                    let instance = Toast({
                      message: "加载中...",
                      position: "middle",
                      duration: 1000000
                    });
                    // 取消的回调
                    var url =
                    self.url+  "/api/appraisal/examine/giveup";//放弃考试
                    var params = {
                      token: self.appToken,
                      exam_id: self.exam_id
                    };
                    self.$http.put(url, params).then(
                      res => {
                        if (res.data.status == 201) {
                          var url =
                          self.url+  "/api/appraisal/examine/ids";//随机获得考试题目id列表
                          var params = {
                            token: self.appToken,
                            brand_id: self.id
                          };
                          self.$http.get(url, { params: params }).then(
                            res => {
                              if (res.data.status == 200) {
                                self.exam_id = res.data.id;
                                var params = {
                                  token: self.appToken,
                                  exam_id: res.data.id
                                };
                                var url =
                                self.url+  "/api/appraisal/examine/achieve";//获得10条考试题目
                                self.$http.get(url, { params: params }).then(
                                  res => {
                                    self.nowStrip = res.data.current;
                                    self.count = res.data.count;
                                    self.ids = res.data.data;
                                    var url =
                                     self.url+ "/api/appraisal/examine";//考核列表，看到的图片及文字
                                    var param = {
                                      ids: self.ids,
                                      page: self.page,
                                      limit: self.ids.length
                                      // limit: 1
                                    };
                                    self.$http.get(url, { params: param }).then(
                                      res => {
                                        instance.close();
                                        self.list = res.data.data;
                                      },
                                      res => {
                                        console.log(res);
                                      }
                                    );
                                  },
                                  res => {
                                    console.log(res);
                                  }
                                );
                              } else if (res.data.status == 403) {
                                Toast({
                                  message: res.data.message,
                                  position: "middle",
                                  duration: 1500
                                });
                              }
                            },
                            res => {
                              console.log(res);
                            }
                          );
                        }
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  }
                });
            }
          },
          res => {
            console.log(res);
          }
        );
      };
    },
    // 下一题
    rate: function() {
      if (this.trueChoose == 1 || this.falseChoose == 1) {
        // if (this.nowStrip <= this.ids.length) {
        var self = this;
        this.ten++;
        if (this.ten < 10) {
          self.nowStrip++;
          self.showIndex++;
          self.trueChoose = 0;
          self.falseChoose = 0;
        } else if (this.ten >= 10) {
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            // bridge.takeToken();
            self.$bridge.callhandler('takeToken',()=>{
            })
            self.$bridge.registerhandler('takeTokenResult', (data, responseCallback)=>{
            var token = data;
            self.appToken = token;
            var url =
            self.url+ "/api/appraisal/examine/edit";//编辑考试,10道题保存一下。
            var params = {
              token: self.appToken,
              exam_id: self.exam_id,
              result: self.result
            };
            self.$http.put(url, params).then(
              res => {
                if (res.data.status == 200) {
                  if (self.nowStrip >= self.count) {
                    var url =
                     self.url+ "/api/appraisal/examine/Auditing?token=" + //考核结果
                      self.appToken;
                    var params = {
                      brand_id: self.id,
                      token: self.appToken,
                      exam_id: self.exam_id
                    };
                    self.$http.put(url, params).then(
                      res => {
                        if (res.data.status == 201) {
                          // this.$router.push({
                          //   name: "score",
                          //   params: {
                          //     id: res.data.id
                          //   }
                          // });
                          window.location.href =
                            "https://mini.tosneaker.com/m/#/score/" +
                            res.data.id;
                        }
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  } else if (self.nowStrip < self.count) {
                    let instance = Toast({
                      message: "加载中...",
                      position: "middle",
                      duration: 1000000
                    });
                    // self.result = [];
                    // self.showIndex = 1;
                    // self.list = [];
                    // self.ten = 0;
                    // ++self.nowStrip;
                    // self.trueChoose = 0;
                    // self.falseChoose = 0;
                    var params = {
                      token: self.appToken,
                      exam_id: self.exam_id
                    };
                    var url =
                    self.url+  "/api/appraisal/examine/achieve";//获得10条考试题目
                    self.$http.get(url, { params: params }).then(
                      res => {
                        // self.nowStrip = self.nowStrip + res.data.current;
                        self.nowStrip = res.data.current;
                        self.count = res.data.count;
                        self.ids = res.data.data;
                        var url =
                        self.url+  "/api/appraisal/examine";//考核列表，看到的图片及文字
                        var param = {
                          ids: self.ids,
                          page: self.page,
                          limit: self.ids.length
                          // limit: 1
                        };
                        self.$http.get(url, { params: param }).then(
                          res => {
                            self.result = [];
                            self.showIndex = 1;
                            self.list = [];
                            self.ten = 0;
                            // ++self.nowStrip;
                            self.trueChoose = 0;
                            self.falseChoose = 0;
                            instance.close();
                            self.list = res.data.data;
                          },
                          res => {
                            console.log(res);
                          }
                        );
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  }
                } else if (res.data.status == 403) {
                  Toast({
                    message: res.data.message,
                    position: "middle",
                    duration: 1500
                  });
                  var params = {
                    token: self.appToken,
                    exam_id: self.exam_id
                  };
                  var url =
                  self.url+  "/api/appraisal/examine/achieve";//获得10条考试题目
                  self.$http.get(url, { params: params }).then(
                    res => {
                      // self.nowStrip = self.nowStrip + res.data.current;
                      self.nowStrip = res.data.current;
                      self.count = res.data.count;
                      self.ids = res.data.data;
                      var url =
                      self.url+  "/api/appraisal/examine";//考核列表，看到的图片及文字
                      var param = {
                        ids: self.ids,
                        page: self.page,
                        limit: self.ids.length
                        // limit: 1
                      };
                      self.$http.get(url, { params: param }).then(
                        res => {
                          self.showIndex = 1;
                          self.ten = 0;
                          self.trueChoose = 0;
                          self.falseChoose = 0;
                          self.list = res.data.data;
                        },
                        res => {
                          console.log(res);
                        }
                      );
                    },
                    res => {
                      console.log(res);
                    }
                  );
                }
              },
              res => {
                console.log(res);
              }
            ); 
               
               
            responseCallback({})
            })

          } else if (navigator.userAgent.match(/android/i)) {
            android.takeToken();
          }
          
          window["takeTokenResult"] = function(token) {
            var token = token;
            self.appToken = token;
            var url =
            self.url+ "/api/appraisal/examine/edit";//编辑考试
            var params = {
              token: self.appToken,
              exam_id: self.exam_id,
              result: self.result
            };
            self.$http.put(url, params).then(
              res => {
                if (res.data.status == 200) {
                  if (self.nowStrip >= self.count) {
                    var url =
                     self.url+ "/api/appraisal/examine/Auditing?token=" + //考核结果
                      self.appToken;
                    var params = {
                      brand_id: self.id,
                      token: self.appToken,
                      exam_id: self.exam_id
                    };
                    self.$http.put(url, params).then(
                      res => {
                        if (res.data.status == 201) {
                          // this.$router.push({
                          //   name: "score",
                          //   params: {
                          //     id: res.data.id
                          //   }
                          // });
                          window.location.href =
                            "https://mini.tosneaker.com/m/#/score/" +
                            res.data.id;
                        }
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  } else if (self.nowStrip < self.count) {
                    let instance = Toast({
                      message: "加载中...",
                      position: "middle",
                      duration: 1000000
                    });
                    // self.result = [];
                    // self.showIndex = 1;
                    // self.list = [];
                    // self.ten = 0;
                    // ++self.nowStrip;
                    // self.trueChoose = 0;
                    // self.falseChoose = 0;
                    var params = {
                      token: self.appToken,
                      exam_id: self.exam_id
                    };
                    var url =
                    self.url+  "/api/appraisal/examine/achieve";//获得10条考试题目
                    self.$http.get(url, { params: params }).then(
                      res => {
                        // self.nowStrip = self.nowStrip + res.data.current;
                        self.nowStrip = res.data.current;
                        self.count = res.data.count;
                        self.ids = res.data.data;
                        var url =
                        self.url+  "/api/appraisal/examine";//考核列表，看到的图片及文字
                        var param = {
                          ids: self.ids,
                          page: self.page,
                          limit: self.ids.length
                          // limit: 1
                        };
                        self.$http.get(url, { params: param }).then(
                          res => {
                            self.result = [];
                            self.showIndex = 1;
                            self.list = [];
                            self.ten = 0;
                            // ++self.nowStrip;
                            self.trueChoose = 0;
                            self.falseChoose = 0;
                            instance.close();
                            self.list = res.data.data;
                          },
                          res => {
                            console.log(res);
                          }
                        );
                      },
                      res => {
                        console.log(res);
                      }
                    );
                  }
                } else if (res.data.status == 403) {
                  Toast({
                    message: res.data.message,
                    position: "middle",
                    duration: 1500
                  });
                  var params = {
                    token: self.appToken,
                    exam_id: self.exam_id
                  };
                  var url =
                  self.url+  "/api/appraisal/examine/achieve";//获得10条考试题目
                  self.$http.get(url, { params: params }).then(
                    res => {
                      // self.nowStrip = self.nowStrip + res.data.current;
                      self.nowStrip = res.data.current;
                      self.count = res.data.count;
                      self.ids = res.data.data;
                      var url =
                      self.url+  "/api/appraisal/examine";//考核列表，看到的图片及文字
                      var param = {
                        ids: self.ids,
                        page: self.page,
                        limit: self.ids.length
                        // limit: 1
                      };
                      self.$http.get(url, { params: param }).then(
                        res => {
                          self.showIndex = 1;
                          self.ten = 0;
                          self.trueChoose = 0;
                          self.falseChoose = 0;
                          self.list = res.data.data;
                        },
                        res => {
                          console.log(res);
                        }
                      );
                    },
                    res => {
                      console.log(res);
                    }
                  );
                }
              },
              res => {
                console.log(res);
              }
            ); 
          };
        }
        // }
      } else {
        Toast({
          message: "请给出本题答案",
          position: "middle",
          duration: 1500
        });
      }
    }
  },

  mounted() {
    
    this.getsubject();
  }
};
</script>

<style scoped>
.examine {
  position: fixed;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.name {
  font-size: 40px;
  line-height: 40px;
  color: #282828;
  font-weight: 600;
  padding: 40px 40px 22px;
  box-sizing: border-box;
}
.remarks {
  height: 66px;
  font-size: 26px;
  line-height: 32px;
  color: #282828;
  padding: 0 40px 12px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.imgs {
  width: 100%;
  height: 800px;
  padding: 0 30px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
}
.imgs ul {
  display: flex;
  flex-wrap: wrap;
}
.imgs ul li {
  width: 150px;
  height: 150px;
  margin-right: 30px;
  margin-top: 30px;
  border-radius: 8px;
  position: relative;
}
.imgs ul li:nth-child(4n) {
  margin-right: 0;
}
.imgs ul li img {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
}
.imgs ul li .text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 22px;
  color: #fff;
}
.judge {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  padding-bottom: 160px;
  box-sizing: border-box;
}
.judge img {
  width: 140px;
  height: 110px;
  margin-right: 100px;
}
.judge img:nth-child(2) {
  margin-right: 0;
}
.rate {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 96px;
  text-align: center;
  line-height: 96px;
  background-color: #5e95f4;
  font-size: 30px;
  color: #fff;
}
/* @media only screen and (max-width: 1080px),
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
.examine {
  position: fixed;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.name {
  font-size: 20px;
  line-height: 20px;
  color: #282828;
  font-weight: 600;
  padding: 20px 20px 11px;
  box-sizing: border-box;
}
.remarks {
  height: 33px;
  font-size: 13px;
  line-height: 16px;
  color: #282828;
  padding: 0 20px 6px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.imgs {
  width: 100%;
  height: 400px;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
}
.imgs ul {
  display: flex;
  flex-wrap: wrap;
}
.imgs ul li {
  width: 75px;
  height: 75px;
  margin-right: 15px;
  margin-top: 15px;
  border-radius: 4px;
  position: relative;
}
.imgs ul li:nth-child(4n) {
  margin-right: 0;
}
.imgs ul li img {
  width: 75px;
  height: 75px;
  border-radius: 4px;
  object-fit: cover;
}
.imgs ul li .text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-size: 11px;
  color: #fff;
}
.judge {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 80px;
  box-sizing: border-box;
}
.judge img {
  width: 70px;
  height: 55px;
  margin-right: 50px;
}
.judge img:nth-child(2) {
  margin-right: 0;
}
.rate {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  text-align: center;
  line-height: 48px;
  background-color: #5e95f4;
  font-size: 15px;
  color: #fff;
} */
</style>

