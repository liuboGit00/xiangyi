<template>
  <div class="page">
    <FormSelectGroup v-on:submit-query="submitshow" :module="'reportwatch'">
    </FormSelectGroup>
    <CommonSuspend class="content-area" :suspendobj="suspendOpt" v-on:select-dialog="selectDialog">
      <!-- <div class="underlinebtn">
        <el-button type="primary" size="small" @click="combinations">合并</el-button>
        <el-button type="primary" size="small" @click="share">发布</el-button>
      </div> -->
      <Scrollframe class="content-frame" :pagepation="pagepation" :isLastPage="isLastPage"  v-on:ajax-query="ajaxshow" >
          <div class="receivelist" v-for="(item,index) in items" :key="index" @click="openPage" @mousedown="rewId(item)">
              <div class="list-top" :style="{backgroundImage:'url(' + item.imgBags + ')'}">
                  <span class="defaultitle" :title="item.reportFormsTitle" v-if="angleshowflag">{{item.reportFormsTitle}}</span>
                  <div class="defaultitle" :title="item.remark" v-if="angleshowflag">备注：{{item.remark}}</div>
                  <!-- <span  class="multipletitle" v-if="!angleshowflag" v-for="(list,ind) in item.titleList" :key="ind">
                    {{list.reportTitle}}
                  </span> -->
                  <span  class="multipletitle" :title="item.createTime">
                    {{item.createTime}}
                  </span>
                  <!-- <div class="angle" >
                    <div class="obliqueangle">{{item.tempNames}}</div>
                  </div> -->
                  <div class="angle">
                    <div class="obliquenext">{{item.tempNames}}</div>
                  </div>
                  <!-- <div class="remark" :title="item.remark" v-if="angleshowflag">{{item.remark}}</div> -->
              </div>
              <div class="combination" v-if="checkboxshow"><el-checkbox v-model="item.checked" @change="changecombination(item)"></el-checkbox></div>    
          </div>
      </Scrollframe>
    </CommonSuspend>
    <Dialog :dialogOpt="dialogOpt" v-on:handlecancle-dialog="selectDialog" v-on:handlesure-dialog="submitDialog" :itemIds="listForms" ></Dialog> 
  </div>
</template>

<script>
import FormSelectGroup from "@/components/formSelectGroup.vue"; //select选择组
import CommonSuspend from "@/components/commonSuspend.vue"; //通用悬浮
import Scrollframe from "@/components/Scrollframe.vue"; //滚动下拉加载
// import SwitchChange from "@/components/switchChange.vue";   //模拟滑动开关
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  data() {
    return {
      //必须配置项
      imgBags: "",
      titleData: "",
      isLastPage: false, //最后一页
      formTit: "",
      formId: "", //报表id
      listForms: "",
      formName: "",
      formTitle: "", //报表标题
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 15
      },
      serverobject: server, //ajax服务
      items: [], //列表内容数据
      reportIdlists: [], //合并报表的id
      checkboxshow: false,
      checkednumber: 0,
      tempNames: "",
      angleshowflag: true, //未发布左上角斜标
      // value1: true,
      // value2: true,
      dialogOpt: {
        dialogflag: false,
        width: "25%"
      },
      suspendOpt: {
        name: "报表查看",
        position: "bottom", //遮罩部件在位置
        domClass: "list-top", //遮罩部件
        offsetbottom: "0%", //遮罩层距离底部的距离
        show: true //遮罩层是否显示控件
      },
      options: [],
      reportFormsCodes: ""
    };
  },
  components: {
    FormSelectGroup,
    Scrollframe,
    CommonSuspend,
    Dialog
    // SwitchChange,
  },
  created() {
    let self = this;
    //判断第一次页面进入
    if (window.location.href.indexOf("sessionId") != -1) {
      self.axios
        .get("/users/" + window.location.href.split("=")[1])
        .then(res => {
          localStorage.setItem("photo", res.data.data.photo);
          localStorage.setItem("userName", res.data.data.userName);
          localStorage.setItem("sessionId", window.location.href.split("=")[1]);
          this.ajaxshow();
        });
    } else {
      self.axios
        .get("/users/" + localStorage.getItem("sessionId"))
        .then(res => {
          this.ajaxshow();
        });
    }
  },
  mounted() {
    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
  },
  methods: {
    rewId(item) {
      this.formTit = item;
      this.formId = item.reportFormsId;
      localStorage.setItem("reportFormsCodes", item.reportFormsCode);
    },
    openPage() {
      let html = $(".content-area")
        .clone()
        .html();
      window.open("#/newPage", "_blank");
    },
    changecombination(item) {
      //复选框发生change事件。
      this.reportIdlists.push(item.reportId);
      if (item.checked) {
        this.checkednumber++;
      } else {
        this.checkednumber--;
      }
    },
    share() {
      //报告发布
      this.selectDialog("发布"); //通过传参来分辨弹窗内容
    },
    combinations() {
      //报告合并
      this.checkboxshow = true;
      if (this.checkednumber > 0) {
        this.selectDialog("合并");
      }
    },
    ajaxshow: function(message) {
      //ajax请求数据

      this.$emit("typeShow", true);
      let self = this;
      self.isLastPage = true; //在请求数据期间避免重复加载
      // self.pagepation = message ? message : self.pagepation; //翻页
      self.serverobject.pagepation = self.pagepation; //翻页配置
      server.reportlist(message, function success(res) {
        self.$emit("typeShow", false);
        //接口请求
        let data = res.data.data;
        self.items = data.list;
        self.items.map(val => {
          if (val.formsType == 1) {//表格
            val.imgBags = require("../../assets/img/image-04.png");
          }
          if (val.formsType == 2) {//垂直柱状
            val.imgBags = require("../../assets/img/image-01.png");
          }
          // if (val.formsType == 3) {//柱状
          //   val.imgBags = require("../../assets/img/image-01.png");
          // }
          if (val.formsType == 4) {//线图
            val.imgBags = require("../../assets/img/image-03.png");
          }
          if (val.formsType == 5) {
            val.imgBags = require("../../assets/img/image-02.png");
          }

          if (val.propertyType == 1) {
            self.tempNames = val.propertyType;
            val.tempNames = "财务";
          }
          if (val.propertyType == 2) {
            self.tempNames = val.propertyType;
            val.tempNames = "人力";
          }
          if (val.propertyType == 3) {
            self.tempNames = val.propertyType;
            val.tempNames = "固资";
          }
          if (val.propertyType == 4) {
            self.tempNames = val.propertyType;
            val.tempNames = "运营";
          }
          if (val.propertyType == 5) {
            self.tempNames = val.propertyType;
            val.tempNames = "生产";
          }
          if (val.propertyType == 6) {
            self.tempNames = val.propertyType;
            val.tempNames = "其他";
          }
        });
        self.isLastPage = data.isLastPage; //是否最后一页
      });
      // this.$emit('formName',self.formName)
    },
    submitshow: function(message) {
      //列表查询条件提交
      this.options = [];
      this.items = [];
      //列表查询条件提交
      this.pagepation = {
        //翻页重置
        pageNum: 1,
        pageSize: 15
      };
        this.items = [];
      // let messages = Object.assign(message, this.pagepation);
      let messages = message
      this.ajaxshow(messages);
    },
    selectDialog: function(message, type) {
      //弹窗打开/关闭（message对话框标题，type是操作类型sure为保存close为取消）
      // if(message == '备注'){
      //   this.dialogOpt.dialogflag=false;
      //   return;
      // }
      if (type) {
        //关闭弹窗
        this.dialogOpt.dialogflag = false;
        this.listForms = '';
      } else {
        //打开弹窗
        this.listForms = this.formTit;
        this.dialogOpt = {
          dialogflag: true, //根据flag决定弹窗是否出现
          title: message, //根据title决定弹窗页面内容。
          width: "25%"
        };
      }
    },
    submitDialog: function(message, type, formdata) {
      //对话框保存(formdata为对话框表单对象)
      let formDats = formdata;
      let self = this;
      self.items = [];
      if (message === "编辑") {
        let params = Object.assign(formdata, { reportFormsId: self.formId });
        server.reportmerger(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            // formdata.reportFormsTitle = formDats.reportFormsTitle;
            // formdata.remark = formDats.remark;
            // formdata.propertyType = formDats.propertyType;
            self.dialogOpt.dialogflag = false;
            self.ajaxshow();
          }
        });
      }
      if (message === "删除") {
        server.reportdelete(self.formId, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            self.ajaxshow();
          }
        });
      }
      // if(message === '备注'){
      //   let params = Object.assign(formdata,{'reportFormsId':self.formId});
      //   server.reportmerger(params,function success(res) {  //接口请求、
      //     if(res.data.status = "SUCCESS"){
      //         // formdata.propertyType = '';
      //         self.dialogOpt.dialogflag=false;
      //         self.ajaxshow()
      //     }
      //   });
      // }
    }
  }
};
</script>
<style>
.define-select-group .el-input__icon{line-height: 30px;}
</style>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
.biaoge {
  background-image: url("../../assets/img/image-04.png");
}
.bingtu {
  background-image: url("../../assets/img/image-02.png");
}
.zhutu {
  background-image: url("../../assets/img/image-01.png");
}
.xiantu {
  background-image: url("../../assets/img/image-03.png");
}
.content-frame {
  border-radius: 10px;
  background-color: #ffffff;
  width: 100%;
  min-height: 300px;
  margin-top: -40px;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // border-radius: 10px;
  // background-color: #ffffff;
  // width: 100%;
  // min-height: 300px;
  // margin-top: -40px;
  // padding: 40px 20px;
  .receivelist {
    // border: 1px solid;
    cursor: pointer;
    min-width: 320px;
    min-height: 215px;
    width: 3.05rem;
    height: calc(3.05rem - 100px);
    margin: 17px 0px;
    float: left;
    position: relative;
    overflow: visible !important;
    .list-top {
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      text-align: center;
      color: #ffffff;
      font-size: 2em;
      // background: linear-gradient(#6886db, #4b63a7);
      padding-top: 57px;
      .defaultitle,
      .remark {
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
        font-size: 20px;
      }
      .remark {
        margin-top: 126px;
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
      .multipletitle {
        display: inline-block;
        width: 80%;
        line-height: 30px;
        font-size: 18px;
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
