<template>
    <div class='page' v-cloak>
        <!-- <Dialogvue v-on:submit-query="submitshow" :module="'reportwatch'" :options="options" /> -->
        <iframe id="iframe" style="width: 100%; height:100%" :src="testpdfurl"></iframe>
        <Dialog  :dialogOpt="dialogOpt" v-on:handlecancle-dialog="selectDialog" v-on:handlesure-dialog="submitDialog"></Dialog> 
    </div>
</template>

<script>
import Dialogvue from "./dialog.vue"; //select选择组
import CommonSuspend from "@/components/commonSuspend.vue"; //通用悬浮
import Scrollframe from "@/components/Scrollframe.vue"; //滚动下拉加载
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  data() {
    return {
      testpdfurl: "http://10.0.0.126:8084/business/#/basecharts?suneee=suneee",
      //必须配置项
      isLastPage: false, //最后一页
      formId: "", //报表id
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
        offsetbottom: "20%", //遮罩层距离底部的距离
        show: true //遮罩层是否显示控件
      },
      chartId: "",
      chartType: "",
      options: []
    };
  },
  components: {
    Dialog,
    Dialogvue
  },
  mounted() {
    this.accptChild();
    // this.ajaxshow();
    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
  },
  methods: {
    submitshow: function(message) {
      //列表查询条件提交
      let self = this;
      self.items = [];
      this.pagepation = {
        //翻页重置
        pageNum: 1,
        pageSize: 15
      },
        this.ajaxshow(message);
    },
    selectDialog: function(message, type) {
      //弹窗打开/关闭（message对话框标题，type是操作类型sure为保存close为取消）
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
    // 接收子组件传递的数据
    accptChild() {
      let self = this;
      window.addEventListener("message", function(e) {
        if (e.data) {
          self.chartId = e.data.chartId; //id
          self.chartType = e.data.chartType; //type
          if (e.data.status == "SUCCESS") {
            self.selectDialog("编辑");
          }
        }
      });
    },
    submitDialog: function(message, type, formdata) {
      //对话框保存(formdata为对话框表单对象)
      let self = this;
      self.items = [];
      if (message == "编辑") {
        let params = Object.assign(formdata, {
          reportFormsCode: self.chartId,
          formsType: self.chartType
        });
        server.reportmergernew(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            self.$router.push({
              name: "reportwatch",
              params: {
                index: "/reportwatch"
              }
            });
          }
        });
      }
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
.page {
  width: 100%;
  height: 100%;
}
</style>