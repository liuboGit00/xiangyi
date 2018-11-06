<template>
  <div class="page" v-cloak>
    <div class="reportcentertop">
      <div class="reportcenter">
        <span class="line"></span>
        <div class="title">接收报告</div>
        <ul>
          <li v-for="(item,index) in itemreceive" :key="index">
            <span class="iconfont icon-jinggao iconJing"></span>
            <span :title='item.receiveReportTitle'>{{item.receiveReportTitle}}</span>
            <span :title='item.publishUserName'>{{item.publishUserName}}</span>
            <span  :title='item.publishTime'>{{item.publishTime | formatData}}</span>
          </li>
        </ul>
      </div>
      <div class="reportcenter">
        <span class="line"></span>
        <div class="title">已发回复</div>
        <ul>
          <li v-for="(item,index) in itempublic" :key="index">
            <span class="iconfont icon-jinggao iconJing"></span>
            <span :title='item.reportTitle'>{{item.reportTitle}}</span>
            <span :title='item.receiveUserName'>{{item.receiveUserName}}</span>
            <span :title='item.publishTime'>{{item.publishTime | formatData}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="reportcenterbottom">
      <div class="re-bot-model">
        <div class="top"><span>报告发布</span></div>
        <div class="bot">
          <div class="box"></div>
          <div class="bot-first">
            <span>已发送</span>
            <span>已读</span>
            <span>已回复</span>
          </div>
          <div class="bot-second">
            <span :title='staticpublic.allCount'>{{staticpublic.allCount}}</span>
            <span :title='staticpublic.readCount'>{{staticpublic.readCount}}</span>
            <span :title='staticpublic.replyCount'>{{staticpublic.replyCount}}</span>
          </div>
        </div>
      </div>
      <div class="re-bot-model">
        <div class="top"><span>报告接收</span></div>
        <div class="bot">
          <div class="box"></div>
          <div class="bot-first">
            <span>已发送</span>
            <span>已读</span>
            <span>已回复</span>
          </div>
          <div class="bot-second">
            <span :title='staticreceive.allCount'>{{staticreceive.allCount}}</span>
            <span :title='staticreceive.readCount'>{{staticreceive.readCount}}</span>
            <span :title='staticreceive.replyCount'>{{staticreceive.replyCount}}</span>
          </div>
        </div>
      </div>
      <div class="re-bot-model">
        <div class="top"><span>报告查看</span></div>
        <div class="bot">
          <div class="box"></div>
          <div class="bot-content">
            <span>大屏</span>
            <span>报告</span>
            <span>H5</span>
          </div>
        </div>
      </div>
      <div class="re-bot-model">
        <div class="top"><span>报告编辑</span></div>
        <div class="bot">
          <div class="box"></div>
          <div class="bot-content">
            <span>大屏</span>
            <span>报告</span>
            <span>H5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
import { formatDate } from "@/assets/js/data.js"; //格式化日期
export default {
  data() {
    return {
      serverobject: server, //ajax服务
      itemreceive: [], //接收报告
      itempublic: [], //已发回复
      staticpublic: {},
      staticreceive: {}
    };
  },
  components: {
    Dialog
  },
  mounted() {
    this.ajaxshow();

    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
  },
  methods: {
    ajaxshow: function(message) {
      //ajax请求数据

      let self = this;
      server.reportreceive(message, function success(res) {
        //接口请求
        let data = res.data.data;
        self.itemreceive = data.list;
      });
      server.reportpublic(message, function success(res) {
        //接口请求
        let data = res.data.data;
        self.itempublic = data.list;
      });
      server.staticpublic("", function success(res) {
        //接口请求
        self.staticpublic = res.data.data;
      });
      server.staticreceive("", function success(res) {
        //接口请求
        self.staticreceive = res.data.data;
      });
    }
    // submitshow: function(message) {   //列表查询条件提交
    //   this.pagepation = {   //翻页重置
    //     pageNum: 1,
    //     pageSize: 15
    //   },
    //   this.ajaxshow(message)
    // },
    // selectDialog: function(message, type) {
    //   //弹窗打开/关闭（message为悬浮组件里的type字段）
    //   if (type) {
    //     //关闭弹窗
    //     this.dialogOpt.dialogflag = false;
    //   } else {
    //     //打开弹窗
    //     this.dialogOpt = {
    //       dialogflag: true,
    //       title: message
    //     };
    //   }
    // },
    // share: function() {
    //   this.dialogVisible = true;
    // },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // }
  },
  filters: {
    formatData(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
.reportcentertop {
  display: flex;
  justify-content: space-between;
  .reportcenter:first-child {
    margin-right: 15px;
  }
  .reportcenter:last-child {
    margin-left: 15px;
  }
  .reportcenter {
    background-color: #fff;
    border-radius: 10px;
    min-width: 504px;
    height: 237px;
    width: 50%;
    padding: 10px 15px;
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
    position: relative;
    .line {
      width: 30px;
      height: 2px;
      background-color: #278df6;
      position: absolute;
      top: 0;
      left: 18px;
    }
    .title {
      font-size: 24px;
      line-height: 48px;
      letter-spacing: 0px;
      color: #1f1f1f;
      font-weight: bold;
    }
    ul {
      width: 100%;
      max-height: 70%;
      display: inline-block;
      padding: 0;
      overflow-y: auto;
      overflow-x: hidden;
      color: #4a5ea3;
      li:hover {
        height: 51px;
        line-height: 51px;
        background-color: #4c65a4;
        box-shadow: 0px 2px 5px 1px rgba(12, 28, 69, 0.29);
        border: solid 1px #3d5caa;
        color: #fff;
      }
      li {
        height: 51px;
        line-height: 51px;
        border-bottom: solid 1px #cccccc;

        span:nth-child(1) {
          vertical-align: text-bottom;
          padding-right: 10px;
          font-size: 22px;
          color: #af4141;
        }
        span:nth-child(2) {
          display: inline-block;
          width: 40%;
        }
        span:nth-child(3) {
          display: inline-block;
          width: 25%;
        }
        span:nth-child(4) {
          display: inline-block;
          width: 28%;
        }
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 18px;
        }
      }
      li:last-child {
        border: 0;
      }
    }
  }
}

.reportcenterbottom {
  display: flex;
  justify-content: space-between;
  align-items: left;
  margin-top: 30px;
  .re-bot-model:nth-child(1) > .top {
    background-color: #4960a2;
  }
  .re-bot-model:nth-child(2) > .top {
    background-color: #f76785;
  }
  .re-bot-model:nth-child(3) > .top {
    background-color: #1e8afa;
  }
  .re-bot-model:nth-child(4) > .top {
    background-color: #56aea1;
  }
  .re-bot-model:nth-child(1) > .bot {
    background-color: #445a96;
  }
  .re-bot-model:nth-child(2) > .bot {
    background-color: #e55f7c;
  }
  .re-bot-model:nth-child(3) > .bot {
    background-color: #247fdb;
  }
  .re-bot-model:nth-child(4) > .bot {
    background-color: #50a194;
  }

  .re-bot-model {
    min-width: 230px;
    width: 2.13rem;
    min-height: 229px;
    height: 2rem;
    background-color: #f56986;
    border-radius: 10px; //系统所有圆角都为10px
    margin-top: 51px;
    display: flex;
    flex-direction: column;
    .top {
      height: 50%;
      display: flex;
      justify-content: center;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      align-items: center;
      font-size: 2em;
      color: #fff;
      span {
        width: 100%;
        font-size: 26px;
        text-align: center;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .bot {
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      align-items: center;
      color: #fff;
      position: relative;
      .box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 2px;
        box-shadow: 0px 1px 4px 0px rgba(40, 43, 56, 0.02);
        opacity: 0.15;
      }
      .box:nth-child(1) {
        background-color: #364b7e;
      }
      .box:nth-child(2) {
        background-color: #c6526a;
      }
      .box:nth-child(3) {
        background-color: #2771bd;
      }
      .box:nth-child(4) {
        background-color: #468a80;
      }
      .bot-first,
      .bot-content {
        display: flex;
        width: 100%;
        span {
          flex-grow: 1;
          text-align: center;
          width: 21%;
          height: 52px;
          line-height: 52px;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      .bot-second {
        display: flex;
        width: 100%;
        span {
          flex-grow: 1;
          text-align: center;
          font-size: 24px;
          font-weight: normal;
          letter-spacing: 0px;
          width: 21%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:nth-child(1) {
          color: #00a2ff;
        }
        span:nth-child(2) {
          color: #ffc600;
        }
        span:nth-child(3) {
          color: #5cbc07;
        }
      }
    }
  }
}
</style>
