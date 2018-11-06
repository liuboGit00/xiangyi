<template>
  <div class="page" v-cloak>
    <FormSelectGroup v-on:submit-query="submitshow" :module="'reportheme'" />
    <CommonSuspend class="content-area" :suspendobj="suspendOpt" v-on:select-dialog="selectDialog">
      <!-- <div class="underlinebtn">
        <el-button type="primary" size="small" @click="combinations">合并</el-button>
        <el-button type="primary" size="small" @click="share">发布</el-button>
      </div> -->
      <Scrollframe class="content-frame" :pagepation="pagepation" :isLastPage="isLastPage" @ajax-query="ajaxshow">
          <div class="receivelist" v-for="(item,index) in items" :key="index" @mousedown="rewData(item)">
              <div class="list-top">
                  <span class="defaultitle" :title="item.themeName" v-if="angleshowflag">{{item.themeName}}</span>
                  <!-- <div class="defaultitle" :title="item.remark" v-if="angleshowflag">{{item.remark}}</div> -->
                  <p class="multipletitle">
                    <span v-for="(itemchild,indexchild) in item.titleNums" :title="itemchild.reportFormsTitle" :key='indexchild' @click="openPage"  @mousedown="rewId(itemchild)">
                      {{itemchild.reportFormsTitle}}
                    </span>
                  </p>
                  <!-- <div class="angle" v-if="!angleshowflag">
                    <div class="obliqueangle">财务</div>
                  </div>
                  <div class="angle" v-if="angleshowflag">
                    <div class="obliquenext">运营</div>
                  </div> -->
                  <!-- <div class="remark" :title="item.remark" v-if="angleshowflag">{{item.remark}}</div> -->
              </div>
              <div class="combination" v-if="checkboxshow"><el-checkbox v-model="item.checked" @change="changecombination(item)"></el-checkbox></div>    
          </div>
      </Scrollframe>
    </CommonSuspend>
    <Dialog  :dialogOpt="dialogOpt" v-on:handlecancle-dialog="selectDialog" v-on:handlesure-dialog="submitDialog" :itemIds="listForms"></Dialog> 
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
      formId: "", //报表id
      formIds: "",
      formTit: "",
      listForms: "",
      titleData: "",
      isLastPage: false, //最后一页
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 15
      },
      pagetitle: {
        //翻页配置
        pageNum: 1,
        pageSize: 15
      },
      serverobject: server, //ajax服务
      items: [], //列表内容数据
      reportIdlists: [], //合并报表的id
      checkboxshow: false,
      checkednumber: 0,
      angleshowflag: true, //未发布左上角斜标
      // value1: true,
      // value2: true,
      dialogOpt: {
        dialogflag: false,
        width: "25%"
      },
      suspendOpt: {
        name: "主题报表",
        position: "bottom", //遮罩部件在位置
        domClass: "list-top", //遮罩部件
        offsetbottom: "0%", //遮罩层距离底部的距离
        show: true //遮罩层是否显示控件
      }
    };
  },
  components: {
    FormSelectGroup,
    Scrollframe,
    CommonSuspend,
    Dialog
    // SwitchChange,
  },

  mounted() {
    // this.ajaxshow();
    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
    // this.ajaxshow();
  },
  methods: {
    rewTitle(item) {
      this.titleData = item.remark;
    },
    openPage() {
      let html = $(".content-area")
        .clone()
        .html();
      window.open("#/newztPage", "_blank");
    },
    rewData(item) {
      this.formTit = item;
      this.formId = item.themeId;
      localStorage.setItem("reportFormsCodes", item.reportFormsCode);
    },
    rewId(item) {
      localStorage.setItem("reportFormsCodesZt", item.reportFormsCode);
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
      this.$emit("typeShow", true);
      //ajax请求数据
      let self = this;
      self.isLastPage = true; //在请求数据期间避免重复加载
      // self.pagepation = message ? message : this.pagepation; //翻页
      // self.serverobject.pagepation = this.pagepation; //翻页配置
      server.reportlist(message, function success(res) {
        self.$emit("typeShow", false);
        //接口请求
        let data = res.data.data;
        self.items = self.items.concat(data.list);
        self.items.map(val => {
          let params = Object.assign({
            themeId: val.themeId,
            pageNum: 1,
            pageSize: 12
          });
          server.reporttitles(params, function success(res) {
            //接口请求
            self.$set(val, "titleNums", res.data.data.list);
          });
        });
        self.isLastPage = data.isLastPage; //是否最后一页
      });
    },
    submitshow: function(message) {
      //列表查询条件提交
      this.items = [];
      this.pagepation = {
        //翻页重置
        pageNum: 1,
        pageSize: 15
      },
        this.items = [];
      // let messages = Object.assign(message, this.pagepation);
      let messages = message;
      this.ajaxshow(messages);
    },
    selectDialog: function(message, type) {
      //弹窗打开/关闭（message对话框标题，type是操作类型sure为保存close为取消）
      this.listForms = this.formTit;
      // if(message == '修改性质分类'){
      //   this.dialogOpt.dialogflag=false;
      //   return;
      // }
      if (type) {
        //关闭弹窗
        this.dialogOpt.dialogflag = false;
      } else {
        //打开弹窗
        this.dialogOpt = {
          dialogflag: true, //根据flag决定弹窗是否出现
          title: message, //根据title决定弹窗页面内容。
          width: "25%"
        };
      }
    },
    submitDialog: function(message, type, formdata) {
      //对话框保存(formdata为对话框表单对象)
      let self = this;
      self.items = [];
      if (message === "编辑") {
        let params = Object.assign(formdata, { themeId: self.formId });
        server.reportmerger(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            formdata.themeName = "";
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
      if (message === "修改性质分类") {
        let params = Object.assign(formdata, { themeId: self.formId });
        server.reportmerger(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            // formdata.themeId = '';
            self.dialogOpt.dialogflag = false;
            self.ajaxshow();
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
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
  .receivelist {
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
      text-align: center;
      color: #ffffff;
      font-size: 2em;
      background: linear-gradient(#6886db, #4b63a7);
      padding-top: 57px;
      .defaultitle {
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        line-height: 28px;
        white-space: nowrap;
        width: 80%;
        font-size: 20px;
      }
      // .remark {
      //   margin-top: 146px;
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
      //       .multipletitle{
      //   display: inline-block;
      //   width:80%;
      //   line-height: 30px;
      //   font-size: 18px;
      // }
      .multipletitle {
        display: inline-block;
        width: 100%;
        flex-wrap: wrap;
        display: flex;
        line-height: 30px;
        font-size: 18px;
        span {
          width: 33.3%;
          line-height: 33px;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
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
