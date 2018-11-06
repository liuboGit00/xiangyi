<template>
  <div class="page" v-cloak>
    <FormSelectGroup v-on:submit-query="submitshow" :module="'reportreceive'">
      <div class="underlinebtn">
          <!-- <el-button type="primary" size="small" @click="share">分享</el-button> -->
      </div>      
    </FormSelectGroup> 
    <CommonSuspend class="content-area" :suspendobj="suspendOpt" v-on:select-dialog="selectDialog">
      <Scrollframe class="content-frame" :pagepation="pagepation" :isLastPage="isLastPage" @ajax-query="ajaxshow">
          <div class="receivelist"  @mousedown="popclick(item)" v-for="(item,index) in items" :key="index">
              <div class="list-top" @click="previewreport(item)" :style="{background:item.bgcolor}">
                  <span class="defaultitle" :title="item.receiveReportTitle">{{item.receiveReportTitle}}</span>
                  <!-- <span class="defaultitle" :title="item.remark">{{item.remark}}</span> -->
                  <div class="angle" v-if="!item.isRead">
                    <div class="obliqueangle">未读</div> 
                  </div>
                  <div class="angle" v-if="item.isRead">
                    <div class="obliquenext">已读</div>
                  </div>
              </div>    
              <div class="list-bot">
                  <span :title="item.publishUserName">from：{{item.publishUserName}}</span>
                  <!-- <span style="margin-bottom:5%;">{{item.publishTime | dataformat}}</span> -->
                  <span :title="item.publishTime | dataformat" >接收时间：{{item.publishTime | dataformat}}</span>
                  <span :title="item.tempNames" >报告分类：{{item.tempNames}}</span>
                  <span :title="item.remark" >备注：{{item.remark}}</span>
                  <el-button @click="replychange('1',item)" class="define" size="medium" type="primary" plain v-show="item.isReply">已回复</el-button>
                  <el-button @click="replychange('0',item)" size="medium" type="primary" plain v-show="!item.isReply">回复</el-button>
              </div>    
              <div class="phone">
                <img src="@/assets/img/user.png" width="100%" height="100%"  alt="">
              </div>
          </div>
      </Scrollframe>
    </CommonSuspend>
     <Dialog  :dialogOpt="dialogOpt" v-on:handlecancle-dialog="selectDialog" v-on:handlesure-dialog="submitDialog" :reportsmodel="formList"></Dialog> 
  </div>
</template>

<script>
import FormSelectGroup from "@/components/formSelectGroup.vue"; //select选择组
import CommonSuspend from "@/components/commonSuspend.vue"; //通用悬浮
import Scrollframe from "@/components/Scrollframe.vue"; //滚动下拉加载
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  data() {
    return {
      //必须配置项
      isLastPage: false, //最后一页
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 15
      },
      serverobject: server, //ajax服务
      items: [], //列表内容数据
      reportsmodel: {},
      tempName: "",
      tempNames: "",
      replyContents: "", //回复内容回显
      formList: {},
      backgroundColor: [
        //颜色循环
        "linear-gradient(#6a89d9,#4c65a4)",
        "linear-gradient(#f56986,#c77081)",
        "linear-gradient(#86e6d8,#59ada1)"
      ],
      dialogOpt: {
        dialogflag: false,
        width: "536px"
      },
      suspendOpt: {
        name: "报告接收", //唯一区别遮罩的html内容（报告发布的全部展示和报告查看一样）
        position: "top", //遮罩部件在位置
        domClass: "receivelist", //遮罩部件
        offsetbottom: "10%", //遮罩层距离底部的距离
        show: true, //遮罩层是否显示控件
        bgshow: false
      },
      isreplayobj: {},
      reports: [], //勾选的报告对象集合
      reportsindex: {} //点击的报告对象
    };
  },
  components: {
    FormSelectGroup,
    Scrollframe,
    CommonSuspend,
    Dialog
  },
  mounted() {
    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
    // this.ajaxshow();
  },
  methods: {
    previewreport(item) {
      //查看报告预览
      self = this;
      if (item.isMerger) {
        let templatename = JSON.parse(item.oldReportIds)[0].templateCode.split(
          "/"
        )[0];
        if (templatename == "dashboard") {
          localStorage.setItem("oldReportIds", item.oldReportIds);
          window.open(
            "#/dashboardprevmultiple?publishId=" +
              item.publishId +
              "&isRead=" +
              item.isRead,
            "_blank"
          );
        } else {
          localStorage.setItem("oldReportIds", item.oldReportIds);
          window.open(
            "#/reportprevmultiple?publishId=" +
              item.publishId +
              "&isRead=" +
              item.isRead,
            "_blank"
          );
        }
      } else {
        switch (item.templateCode) {
          case "dashboard/template_01": //大屏/模板类型1
            window.open(
              "#/dashboardpreview?reportId=" +
                item.reportId +
                "&publishId=" +
                item.publishId +
                "&isRead=" +
                item.isRead,
              "_blank"
            );
            break;
          case "report/template_01": //报告/模板类型1
            window.open(
              "#/reportpreview?reportId=" +
                item.reportId +
                "&publishId=" +
                item.publishId +
                "&isRead=" +
                item.isRead,
              "_blank"
            );
            break;
          default:
            break;
        }
      }
    },
    popclick(item) {
      //点击的报告对象
      this.reportsindex = item;
      this.reportsmodel = item;
    },
    replychange(val, item) {
      // this.reportsmodel = item;
      let self = this;
      self.isreplayobj = item;
      if (val == "0") {
        self.selectDialog("回复");
        $(".el-dialog__footer").show();
      } else if (val == "1") {
        self.selectDialog("已回复");
        self.replyContents = self.formList.replyContent;
        $(".el-dialog__footer").hide();
      }
    },
    ajaxshow: function(message) {
      this.$emit("typeShow", true);
      //ajax请求数据
      let self = this;
      self.isLastPage = true; //在请求数据期间避免重复加载
      self.pagepation = message ? message : self.pagepation; //翻页
      self.serverobject.pagepation = self.pagepation; //翻页配置
      if (message == undefined) {
        message = "";
      }
      server.reportlist(message, function success(res) {
        self.$emit("typeShow", false);
        //接口请求
        let data = res.data.data;
        self.items = self.items.concat(data.list);
        for (var i = 0; i < self.items.length; i++) {
          self.replyContents = self.items[i].replyContent;
          if (self.items[i].isRead == 1) {
            self.tempName = self.items[i].isRead;
            self.tempName = "已读";
          }
          if (self.items[i].isRead == 0) {
            self.tempName = self.items[i].isRead;
            self.tempName = "未读";
          }
          if (self.items[i].showType == 1) {
            self.tempNames = self.items[i].showType;
            self.items[i].tempNames = "大屏";
          }
          if (self.items[i].showType == 2) {
            self.tempNames = self.items[i].showType;
            self.items[i].tempNames = "报告";
          }
        }
        self.isLastPage = data.isLastPage; //是否最后一页
        // self.limitchang = false;
        let first = 0,
          second = 1,
          three = 2;
        for (let i = 0; i < self.items.length; i++) {
          let bgcolor = self.backgroundColor, //定义的背景颜色集合
            currentbgcolor = ""; //当前索引的背景颜色
          if (first == i) {
            currentbgcolor = bgcolor[0];
            first = first + 3; //隔三个循环一次
          }
          if (second == i) {
            currentbgcolor = bgcolor[1];
            second = second + 3;
          }
          if (three == i) {
            currentbgcolor = bgcolor[2];
            three = three + 3;
          }
          self.items[i].bgcolor = currentbgcolor;
        }
      });
    },
    selectDialog: function(message, type) {
      // console.log(this.reportsmodel);
      //弹窗打开/关闭（message为悬浮组件里的type字段）
      if (type) {
        this.formList = "";
        //关闭弹窗
        this.dialogOpt.dialogflag = false;
      } else {
        this.formList = this.reportsmodel;
        //打开弹窗
        this.dialogOpt = {
          dialogflag: true, //根据flag决定弹窗是否出现
          width: "536px",
          title: message //根据title决定弹窗页面内容。
        };
      }
    },
    submitshow: function(message) {
      //列表查询条件提交
      this.pagepation = {
        //翻页重置
        pageNum: 1,
        pageSize: 15
      },
        this.items = [];
      let messages = Object.assign(message, this.pagepation);
      this.ajaxshow(messages);
    },
    submitDialog: function(message, type, formdata) {
      //对话框保存(formdata为对话框表单对象)
      let self = this;
      let formdatas = formdata;
      if (message == "修改") {
        let params = Object.assign(
          { publishId: self.reportsindex.publishId },
          formdata
        );
        server.reportreceivesput(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            self.items = [];
            self.ajaxshow();
          }
        });
      }
      if (message == "删除") {
        let params = self.reportsindex.publishId;
        server.reportreceivesdelete(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            self.items = [];
            self.pagepation = {
              pageNum: 1,
              pageSize: 15
            };
            self.ajaxshow();
          }
        });
      }
      if (message == "回复") {
        let params = Object.assign(
          { isReply: "1", publishId: self.reportsindex.publishId },
          formdata
        );
        server.reportreceivesput(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            self.items = [];
            self.ajaxshow();
          }
        });
      }
      if (message == "已回复") {
        let params = Object.assign(
          { isReply: "1", publishId: self.reportsindex.publishId },
          formdata
        );
        server.reportreceivesput(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            self.items = [];
            self.ajaxshow();
          }
        });
      }
    }
  },
  filters: {
    dataformat: function(value) {
      if (!value) return "";
      value = value.toString();
      return new Date(value).Format("yyyy-MM-dd");
      // return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
.content-frame {
  border-radius: 0 0 10px 10px;
  background-color: #ffffff;
  width: 100%;
  min-height: 300px;
  margin-top: 90px;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .receivelist {
    min-width: 320px;
    min-height: 460px;
    width: 3.05rem;
    height: calc(3.05rem + 140px);
    margin: 17px 0px;
    background-color: #f4f4f4;
    box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.09);
    float: left;
    position: relative;
    overflow: hidden;
    .list-top {
      height: 50%;
      text-align: center;
      color: #ffffff;
      padding-top: 50px;
      .defaultitle {
        // overflow: hidden;
        // line-height: 28px;
        // display: inline-block;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // width: 80%;
        font-size: 26px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
      }
      .angle {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        overflow: hidden;
        .obliqueangle {
          position: absolute;
          top: 0;
          left: 0;
          width: 150px;
          height: 30px;
          background: #a3afb7;
          font-size: 20px;
          transform: translate(-25%, 77%) rotate(-45deg);
        }
        .obliquenext {
          position: absolute;
          top: 0;
          left: 0;
          width: 150px;
          height: 30px;
          background: #278df6;
          font-size: 20px;
          transform: translate(-25%, 77%) rotate(-45deg);
        }
      }
    }
    .list-bot {
      width: 100%;
      height: 50%;
      text-align: center;
      background: #f4f4f4;
      padding: 24% 5% 0 5%;
      // span:nth-child(1) {
      span {
        font-size: 18px;
        color: #1f1f1f;
        // margin-bottom: 10px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
      }
      // span:nth-child(2) {
      //   width: 100%;
      //   height: 40px;
      //   font-size: 16px;
      //   color: #666666;
      // }
    }
    .phone {
      display: none;
      width: 40%;
      height: calc(40% - 56px);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      overflow: hidden;
      box-shadow: 0px 0px 10px #4c4343;
      img {
        position: absolute;
        top: 0;
        z-index: 2;
        border-radius: 50%;
        border: 5px solid transparent;
      }
    }
    .phone:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 50%;
      background-color: #6988db;
    }
    .phone:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 50%;
      top: 50%;
      background-color: #ffffff;
    }
  }
}
</style>
