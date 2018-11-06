<template>
  <div class="page">
    <!-- <div class="formGroup-search"></div> -->
    <div class="container">
      <div class="page" v-cloak>
        <div class="reportcentertop">
          <div class="reportcenter">
            <span class="line"></span>
            <div class="title">未读报告</div>
            <ul>
              <li v-for="(item , index) in unReadList" :key="index">
                <span class="iconfont icon-jinggao iconJing busy" 
                :class="{busy:item.urgentType == 1,midbusy:item.urgentType == 2,lowbusy:item.urgentType == 3}"></span>
                <span style="text-align: left;padding-left:10px;">{{item.reportTitle}}</span>
                <span >{{item.publishUserName}}</span>
                <span >{{item.publishTime | dataformat}}</span>
              </li>
            </ul>
          </div>
          <div class="reportcenter">
            <span class="line"></span>
            <div class="title">收到回复</div>
            <ul>
              <li v-for="(item ,index) in sendReplied" :key="index">
                <span class="title" style="padding-left:5px;">{{item.reportTitle}}</span>
                <span class="time" style="text-align:left;">{{item.replyContent}}</span>
                <span class="name">{{item.receiveUserName}}</span>
                <span class="time">{{item.replyTime | dataformat}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="reportcenterbottom">
          <div class="re-bot-model">
            <div class="top"><span>报告统计</span></div>
            <div class="bot">
              <div class="box"></div>
              <div class="bot-first">
                <span>报告总数</span>
                <span>PC报告</span>
                <span>移动报告</span>
              </div>
              <div class="bot-second">
                <span @click="$router.push({path: '/Report-watch'})">{{reportCount.allCount}}</span>
                <span @click="$router.push({path: '/Report-watch', query:{pc:1}})">{{reportCount.pcCount}}</span>
                <span @click="$router.push({path: '/Report-watch', query:{modile:1}})">{{reportCount.mobileCount}}</span>
              </div>
            </div>
          </div>
          <div class="re-bot-model">
            <div class="top" ><span>发布统计</span></div>
            <div class="bot">
              <div class="box"></div>
              <div class="bot-first">
                <span>已发布</span>
                <span>未发布</span>
                <span>已回复</span>
              </div>
              <div class="bot-second">
                <span @click="$router.push({path:'/Report-public', query: {publish:1}})">{{publishCount.publishCount}}</span>
                <span @click="$router.push({path:'/Report-public'})">{{publishCount.unpublishCount}}</span>
                <span @click="$router.push({path:'/Report-public', query: {publish:2,replay:1}})">{{publishCount.replyCount}}</span>
              </div>
            </div>
          </div>
          <div class="re-bot-model">
            <div class="top"><span>接收统计</span></div>
            <div class="bot">
              <div class="box"></div>
              <div class="bot-content">
                <span>已接收</span>
                <span>已回复</span>
                <span>未回复</span>
              </div>
              <div class="bot-second">
                <span @click="$router.push({path:'/Report-receive'})">{{receiveCount.allCount}}</span>
                <span @click="$router.push({path:'/Report-receive', query: {replay:1}})">{{receiveCount.replyCount}}</span>
                <span @click="$router.push({path:'/Report-receive', query: {replay:0}})">{{receiveCount.unreplyCount}}</span>
              </div>
            </div>
          </div>
          <div class="re-bot-model">
            <div class="top"><span>模板统计</span></div>
            <div class="bot">
              <div class="box"></div>
              <div class="bot-content">
                <span>模板总数</span>
                <span>PC模板</span>
                <span>移动模板</span>
              </div>
              <div class="bot-second">
                <span @click="$router.push({path:'/Report-template'})">{{templateCount.allCount}}</span>
                <span @click="$router.push({path:'/Report-template', query: {clientType:1}})">{{templateCount.pcCount}}</span>
                <span @click="$router.push({path:'/Report-template', query: {clientType:2}})">{{templateCount.mobileCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  GetMethod,
  DeleteMethod,
  PutMethod,
  PostMethod
} from "@/assets/js/Httpservice.js";
export default {
  mounted(){
    this.initUnReadList()
    this.initsendRepliedList()
    this.initCount()
  },
  data() {
    return {
      unReadList:[],
      sendReplied: [],
      reportCount:{},
      publishCount:{},
      receiveCount:{},
      templateCount:{}
    };
  },
  methods:{
    initUnReadList(){
      let _this = this
      let param = {
        isRead: 0,
        pageNum: 1,
        pageSize: 10
      };
      GetMethod("report-publishing/receiving", param, function(res) {
        _this.unReadList = res.data.data.list
      });  
    },
    initsendRepliedList(){
      let _this = this
      let param = {
        isReply: 1,
        pageNum: 1,
        pageSize: 10
      };
      GetMethod("report-publishing/publishing", param, function(res) {
        _this.sendReplied = res.data.data.list
      }); 
    },
    initCount(){
      this.countReport()
      this.countPublish()
      this.countReceive()
      this.countTemplate()
    },
    countReport(){
      let _this = this
      GetMethod("reports/statistics-template", function(res) {
        _this.reportCount = res.data.data
      });  
    },
    countPublish(){
      let _this = this
      GetMethod("reports/statistics-publishing", function(res) {
        _this.publishCount = res.data.data
      });
    },
    countReceive(){
      let _this = this
      GetMethod("report-publishing/receiving/statistics", function(res) {
        _this.receiveCount = res.data.data
      });
    },
    countTemplate(){
      let _this = this
      GetMethod("report-templates/statistics", function(res) {
        _this.templateCount = res.data.data
      });
    }
  },
  components: {},
  filters: {
    dataformat: function(value) {
      if (!value) return "";
      value = value.toString();
      return new Date(value).Format("yyyy-MM-dd");
    }
  }
};
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";

.page {
  width: 100%;
  overflow: auto;
  background-color: #f4f6f9;
}
.container {
  width: @width-container;
  margin: 0 auto;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 40px;
  // border:1px solid #ddd;
  .reportcentertop {
  display: flex;
  justify-content: space-between;
  .reportcenter:first-child {
    margin-right: 15px;
    padding-left: 20px;
  }
  .reportcenter {
    background-color: #fff;
    border-radius: 10px;
    min-width: 504px;
    height: 210px;
    width: 50%;
    padding: 0px 5px;
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
      text-align: left;
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
        cursor: pointer;
        height: 51px;
        line-height: 51px;
        background-color: #4c65a4;
        box-shadow: 0px 2px 5px 1px rgba(12, 28, 69, 0.29);
        // border: solid 1px #3d5caa;
        color: #fff;
      }
      li:hover .title {
        color: #ffffff;
      }
      li {
        margin-right: 10px;
        height: 51px;
        line-height: 51px;
        border-bottom: solid 1px #cccccc;
        span{
          vertical-align: text-bottom;
        }
        span:nth-child(1) {
          
          // padding-right: 10px;
          // color: #af4141;
        }
        span.title {
          font-size: 16px;
          color: #4a5ea3;
          white-space: nowrap;
          font-weight: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          width: 40%;
          line-height: 51px;
        }
        span:nth-child(2) {
          display: inline-block;
          width: 50%;
        }
        span:nth-child(2).name {
          display: inline-block;
          width: 15%;
        }
        span:nth-child(3) {
          display: inline-block;
          width: 15%;
        }
        span:nth-child(3).time {
          display: inline-block;
          width: 35%;
          text-align: center;
        }
        span:nth-child(4) {
          display: inline-block;
          width: 27%;
        }
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 18px;
        }
        .busy {
          color: #e75052;
        }
        .midbusy {
          color: #efc551;
        }
        .lowbusy {
          color: #3190f2;
        }
      }
      li:last-child {
        border: 0;
      }
    }
  }
  .reportcenter:last-child {
    margin-left: 15px;
    padding-left: 20px;
    ul {
      li {
        span.title {
          width: 28%;
        }
        span:nth-child(2) {
          width: 29%;
        }
        span:nth-child(2).name {
          width: 25%;
        }
        span:nth-child(3) {
          width: 20%;
        }
        span:nth-child(3).time {
          width: 20%;
        }
        span:nth-child(4) {
          width: 20%;
        }
      }
    }
  }
}

.reportcenterbottom {
  display: flex;
  justify-content: space-between;
  align-items: left;
  margin-top: 50px;
  // .re-bot-model:nth-child(1) > .top {
  //   background-color: #4960a2;
  // }
  // .re-bot-model:nth-child(2) > .top {
  //   background-color: #f76785;
  // }
  // .re-bot-model:nth-child(3) > .top {
  //   background-color: #1e8afa;
  // }
  // .re-bot-model:nth-child(4) > .top {
  //   background-color: #56aea1;
  // }
  // .re-bot-model:nth-child(1) > .bot {
  //   background-color: #445a96;
  // }
  // .re-bot-model:nth-child(2) > .bot {
  //   background-color: #e55f7c;
  // }
  // .re-bot-model:nth-child(3) > .bot {
  //   background-color: #247fdb;
  // }
  // .re-bot-model:nth-child(4) > .bot {
  //   background-color: #50a194;
  // }

  .re-bot-model {
    min-width: 230px;
    width: 2.13rem;
    min-height: 229px;
    height: 2rem;
    border-radius: 10px; //系统所有圆角都为10px
    margin-top: 51px;
    display: flex;
    flex-direction: column;
    .top {
      // cursor: pointer;
      background-color: #4960a2;
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
      background-color: #fff;

      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      align-items: center;
      color: #999;
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
        span:hover {
          cursor: pointer;
          text-decoration: underline;
          color: #278df6
        }
        // span:nth-child(1) {
        //   color: #00a2ff;
        // }
        // span:nth-child(2) {
        //   color: #ffc600;
        // }
        // span:nth-child(3) {
        //   color: #5cbc07;
        // }
      }
    }
  }
}
}
</style>
