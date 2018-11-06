<template>
  <div class="page">
    <FormSelectGroup v-on:submit-query="submitshow" :module="'reportpublic'"> 
      <div class="underlinebtn">
        <SwitchChange :switchOpt="switchOpt" v-on:switch-change="switchChange"/>
        <!-- <el-button type="primary" size="small" @click="publics" v-show="publicflag">编辑</el-button>         -->
        <el-button type="primary" size="small" @click="publics" v-show="publicflag">发布</el-button>
      </div>
    </FormSelectGroup>
    <CommonSuspend class="content-area" :suspendobj="suspendOpt" v-on:select-dialog="selectDialog">
      <!-- <div class="underlinebtn">
        <SwitchChange :switchOpt="switchOpt" v-on:switch-change="switchChange"/>
        <el-button type="primary" size="small" @click="publics" v-show="publicflag">发布</el-button>
      </div> -->
      <Scrollframe class="content-frame" :pagepation="pagepation" :isLastPage="isLastPage" @ajax-query="ajaxshow">
          <div class="receivelist" @mouseover="overreportlist(item)" @mousedown="popclick(item)" v-for="(item,index) in items" :key="index">
              <div class="list-top" @click="previewreport(item)">
                  <span class="defaultitle" v-if="publicflag" :title="item.reportTitle">{{item.reportTitle}}</span>
                  <span class="defaultitle" :title="item.createTime | dataformat" v-if="angleshowflag">创建时间：{{item.createTime | dataformat}}</span>
                  <span class="defaultitle " :title="item.tempNames" v-if="angleshowflag">报告分类：{{item.tempNames}}</span>
                  <span class="defaultitle" :title="item.remark" v-if="angleshowflag">备注：{{item.remark}}</span>
                  <div v-if="!publicflag" class="titlelist">
                    <div>
                      <span :title="item.reportTitle">{{item.reportTitle}}</span>
                    </div>
                    <div><span>to：</span><span :title="item.receiveUserName">{{item.receiveUserName}}</span></div>
                    <div><span>发布时间：</span><span :title="item.publishTime | dataformat">{{item.publishTime | dataformat}}</span></div>
                    <div><span>备注：</span><span :title="item.remark">{{item.remark}}</span></div>
                    <div class="angles">
                        <div class="localRelease">已发布</div>
                    </div>
                  </div>
                  
                  <span  class="multipletitle" v-if="!angleshowflag" v-for="(list,ind) in item.titleList" :key="ind">
                    {{list.reportTitle}}
                  </span>
                  <div class="angle" v-if="!item.publishStatus">
                    <div class="obliqueangle">未发布</div>
                  </div>
                  <div class="angle" v-if="item.publishStatus">
                    <div class='obliquenext'>已发布</div>
                  </div>
                  <!-- <div class="remark" :title="item.remark" v-if="angleshowflag">{{item.remark}}</div> -->
              </div>
              <div class="combination" v-if="checkboxshow"><el-checkbox v-model="item.checked" @change="changecombination(item)"></el-checkbox></div>      
          </div>
      </Scrollframe>
    </CommonSuspend>
     <Dialog :dialogOpt="dialogOpt"  v-on:handlecancle-dialog="selectDialog" v-on:handlesure-dialog="submitDialog"  :reportmodel="formList"></Dialog> 
      <!-- :itemid="item" -->
  </div>                              
</template>                                                  
<script>
import FormSelectGroup from "@/components/formSelectGroup.vue"; //select选择组
import CommonSuspend from "@/components/commonSuspend.vue"; //通用悬浮
import Scrollframe from "@/components/Scrollframe.vue"; //滚动下拉加载
import SwitchChange from "@/components/switchChange.vue"; //模拟滑动开关
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
      itemlist: null,
      obliquenext: "obliquenext",
      obliqueangle: "obliqueangle",
      isOK: true,
      formList: {},
      reportmodel: {},
      angleshowflag: true, //未发布左上角斜标
      // value1: true,
      // value2: true,
      // items: [],
      dialogOpt: {
        dialogflag: false,
        width: "536px"
      },
      suspendOpt: {
        name: "报告查看", //唯一区别遮罩的html内容（报告发布的全部展示和报告查看一样）
        position: "bottom", //遮罩部件在位置
        domClass: "receivelist", //遮罩部件
        offsetbottom: "10%", //遮罩层距离底部的距离
        show: true, //遮罩层是否显示控件
        bgshow: false
      },
      switchOpt: {
        //滑动开关组件
        width: "150px", //总宽度
        leftName: "全部", //左边开关的内容
        rightName: "已发布" //右边开关的内容
      },
      publicflag: true, //是否显示发布按钮
      reports: [], //勾选的报告对象集合
      reportsindex: {}, //点击的报告对象
      checkednumber: 0,
      reportIdlists: [], //合并报表的id
      reportshowtype: [], //展示报表类型
      checkboxshow: false,
      publictype: "全部", //全部/已发布
      publicsearchstore: "" //临时保存搜索条件
    };
  },
  components: {
    FormSelectGroup,
    Scrollframe,
    CommonSuspend,
    Dialog,
    SwitchChange
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
      // this.itemlist = item;
      //查看报告预览
      self = this;
      if (item.isMerger) {
        let templatename = JSON.parse(item.oldReportIds)[0].templateCode.split(
          "/"
        )[0];
        if (templatename == "dashboard") {
          localStorage.setItem("oldReportIds", item.oldReportIds);
          window.open("#/dashboardprevmultiple", "_blank");
        } else {
          localStorage.setItem("oldReportIds", item.oldReportIds);
          window.open("#/reportprevmultiple", "_blank");
        }
      } else {
        switch (item.templateCode) {
          case "dashboard/template_01": //大屏/模板类型1
            window.open(
              "#/dashboardpreview?reportId=" + item.reportId,
              "_blank"
            );
            break;
          case "report/template_01": //报告/模板类型1
            window.open("#/reportpreview?reportId=" + item.reportId, "_blank");
            break;
          default:
            break;
        }
      }
    },
    canclecombination(item) {
      let self = this;
      self.checkboxshow = false;
      self.checkednumber = [];
      self.reportIdlists = []; //报告id用于合并
      self.reportshowtype = []; //报告类型用于判断是否可以合并
      self.reporttemplateId = []; //合并所需的模板id
      self.checkednumber = 0;
      self.items.forEach(obj => {
        if (obj.checked) {
          obj.checked = false;
        }
      });
    },
    overreportlist(item) {
      //在遮罩显示之前确定编辑是否显示
      // 0不是|1是合并
      this.$set(this.suspendOpt, "editshowflag", item.isMerger);
    },
    popclick(item) {
      //点击的报告对象
      this.reportsindex = item;
      this.reportmodel = item;
    },
    switchChange(message) {
      //开关切换组件
      let self = this;
      self.items = [];
      self.pagepation = {
        pageNum: 1,
        pageSize: 15
      };
      self.publictype = message;
      if (message == "全部") {
        self.publicflag = true;
        self.angleshowflag = true;
        self.$set(self.suspendOpt, "name", "报告查看");

        self.isLastPage = true; //在请求数据期间避免重复加载
        self.serverobject.pagepation = self.pagepation; //翻页配置
        let params = Object.assign(self.pagepation, self.publicsearchstore); //把翻页和查询条件合并
        server.reportlist(params, function success(res) {
          //接口请求
          let data = res.data.data;
          self.isLastPage = data.isLastPage; //是否最后一页
          self.items = self.items.concat(data.list);
        });
      } else {
        //已发布
        self.checkboxshow = false;
        self.publicflag = false;
        self.angleshowflag = false;
        // self.reportmodel.publishStatus=false;
        self.$set(self.suspendOpt, "name", "报告发布");

        self.isLastPage = true; //在请求数据期间避免重复加载
        self.serverobject.pagepation = self.pagepation; //翻页配置
        let params = Object.assign(self.pagepation, self.publicsearchstore); //把翻页和查询条件合并
        // debugger
        server.reportlistpublish(params, function success(res) {
          //接口请求
          let data = res.data.data;
          self.isLastPage = data.isLastPage; //是否最后一页
          self.items = self.items.concat(data.list);
        });
      }
    },
    publics() {
      //发布
      this.checkboxshow = !this.checkboxshow;
      this.publicsflag = true;
      if (this.checkednumber > 0) {
        this.selectDialog("发布"); //先保存然后在发布
      }
    },
    changecombination(item) {
      //复选框发生change事件。
      this.reportIdlists.push(item.reportId); //报告id用于合并
      this.reportshowtype.push(item.showType); //报告类型用于判断是否可以合并
      if (item.checked) {
        this.checkednumber++;
        this.reports.push(item);
      } else {
        this.checkednumber--;
        this.reports.forEach((obj, index) => {
          if (obj.reportId == item.reportId) {
            this.reports.splice(index, 1);
          }
        });
      }
    },
    selectDialog: function(message, type) {
      this.formList = this.reportmodel;
      //弹窗打开/关闭（message对话框标题，type是操作类型sure为保存close为取消）
      if (type) {
        //关闭弹窗
        this.dialogOpt.dialogflag = false;
        this.canclecombination();
      } else {
        //打开弹窗
        if (message == "编辑") {
          this.dialogOpt = {
            dialogflag: false, //根据flag决定弹窗是否出现
            width: "536px",
            title: message //根据title决定弹窗页面内容。
          };
          if (this.reportsindex.templateCode.split("/")[0] == "report") {
            this.$router.push({
              path: "/editrepoart",
              query: {
                templateId: this.reportsindex.templateId,
                reportId: this.reportsindex.reportId
              }
            });
          } else {
            this.$router.push({
              path: "/editedashboard",
              query: {
                templateId: this.reportsindex.templateId,
                reportId: this.reportsindex.reportId
              }
            });
          }
        } else {
          this.dialogOpt = {
            dialogflag: true, //根据flag决定弹窗是否出现
            width: "536px",
            title: message //根据title决定弹窗页面内容。
          };
        }
      }
    },
    ajaxshow: function(message) {
      // this.$emit("typeShow", true);
      //ajax请求数据
      let self = this;
      self.isLastPage = true; //在请求数据期间避免重复加载
      self.pagepation = message ? message : self.pagepation; //翻页
      self.serverobject.pagepation = self.pagepation; //翻页配置
      if (message == undefined) {
        message = "";
      }
      message = Object.assign(message, self.publicsearchstore);
      if (self.publictype == "全部") {
        server.reportlist(message, function success(res) {
          // self.$emit("typeShow", false);
          //接口请求
          let data = res.data.data;
          self.items = self.items.concat(data.list);
          for (var i = 0; i < self.items.length; i++) {
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
        });
      } else {
        server.reportlistpublish(message, function success(res) {
          //接口请求
          let data = res.data.data;
          self.items = self.items.concat(data.list);
          self.isLastPage = data.isLastPage; //是否最后一页
        });
      }
    },
    submitshow: function(message) {
      //列表查询条件提交
      (this.pagepation = {
        //翻页重置
        pageNum: 1,
        pageSize: 15
      }),
        (this.items = []);
      this.publicsearchstore = {}; //保存查询条件
      for (let key in message) {
        this.publicsearchstore[key] = message[key];
      }
      this.switchChange(this.publictype);
    },
    submitDialog: function(message, type, formdata) {
      //对话框保存(formdata为对话框表单对象)
      let self = this;
      let formdatas = formdata;
      if (message == "发布") {
        if (formdatas["receiveUserId"].length == 0) {
          this.$message({
            message: "用户选择不能为空",
            type: "warning"
          });
          return false;
        }
        let nweparam = [];
        self.reports.forEach(obj => {
          formdatas["receiveUserId"].forEach(objchild => {
            nweparam.push({
              reportId: obj.reportId,
              allowTwice: formdatas.allowTwice,
              urgentType: formdatas.urgentType,
              usefulTime: formdatas.usefulTime,
              remark: formdatas.remark,
              reportTitle: obj.reportTitle,
              receiveUserId: objchild.id,
              receiveUserName: objchild.label
            });
          });
        });
        server.reportpublish(nweparam, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.items = [];
            self.reports = []; //每次在合并和发布之后清空选择的用户对象
            self.checkboxshow = false;
            self.dialogOpt.dialogflag = false; //弹窗取消
            self.publicsagainflag = false;
            self.pagepation = {
              //翻页重置
              pageNum: 1,
              pageSize: 15
            };
            self.ajaxshow();
          }
        });
        this.canclecombination();
      }
      if (message == "修改") {
        let params = Object.assign(
          { reportId: self.reportsindex.reportId },
          formdata
        );
        server.reportthemeupdate(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            self.items = [];
            self.ajaxshow();
          }
        });
      }
      if (message == "删除") {
        if (self.publicflag) {
          //全部
          let params = self.reportsindex.reportId;
          server.reportsdelete(params, function success(res) {
            //接口请求、
            if ((res.data.status = "SUCCESS")) {
              self.dialogOpt.dialogflag = false;
              self.items = [];
              // self.ajaxshow()
              self.switchChange("全部");
            }
          });
        } else {
          //已发布
          let params = self.reportsindex.publishId;
          server.reportspublishdelete(params, function success(res) {
            //接口请求、
            if ((res.data.status = "SUCCESS")) {
              self.dialogOpt.dialogflag = false;
              self.items = [];
              // self.ajaxshow()
              self.switchChange("已发布");
            }
          });
        }
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
.underlinebtn {
  justify-content: space-between;
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
    min-height: 215px;
    width: 3.05rem;
    height: calc(3.05rem - 100px);
    margin: 17px 0px;
    background-color: #f4f4f4;
    box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.09);
    float: left;
    position: relative;
    overflow: visible !important;
    .list-top {
      width: 100%;
      height: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 20px;
      background: linear-gradient(#6886db, #4b63a7);
      padding-top: 50px;
      .titlelist {
        display: flex;
        flex-direction: column;
        .angles {
          position: absolute;
          top: 0;
          z-index: 2;
          left: 0;
          width: 150px;
          height: 150px;
          overflow: hidden;
          .localRelease {
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
      // span,
      // .remark {
      //   margin: 0 auto;
      //   text-align: center;
      //   overflow: hidden;
      //   display: block;
      //   text-overflow: ellipsis;
      //   white-space: nowrap;
      //   width: 80%;
      // }
      .defaultitle {
        overflow: hidden;
        line-height: 28px;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
        margin: 0 auto;
      }
      // .remark {
      //   margin-top: 116px;
      // }
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
      .multipletitle {
        display: inline-block;
        width: 100%;
        line-height: 30px;
      }
    }
    .combination {
      text-align: center;
      line-height: 30px;
      .el-checkbox__inner {
        width: 16px;
        height: 16px;
        border: 1px solid;
      }
    }
  }
}
</style>
