<template>
  <div class="page">
      <div class="shade" v-show="shadeing" @mousedown="hideShade"></div>
      <FormSelectGroup>
        <div class="suspend-tootip">
          <span class="iconfont icon-baogao suspend-title" title="退出" @click="singout"></span>
          <span class="iconfont icon-baogao suspend-title" title="撤销" @click="reset"></span>

          <div class="childsuspend">
            <el-button :disabled="disabled" class="suspend-title" @click="choicesuspend('text')" type="primary" icon="suspend-first el-icon-edit">文本<i class="el-icon-caret-bottom"></i></el-button>
            <div class="tooltip textTooltip" v-show="textshowflag">
                <div class="filter-foot">
                  <div class="text" @click="handleFontSize('16')">小字号</div>
                  <div class="text" @click="handleFontSize('24')">中字号</div>
                  <div class="text" @click="handleFontSize('36')">大字号</div>
                </div>
            </div> 
          </div>
          <div class="childsuspend">
            <el-button  :disabled="disabled" class="suspend-title" @click="choicesuspend('media')" type="primary" icon="suspend-first el-icon-edit">媒体<i class="el-icon-caret-bottom"></i></el-button>
            <div class="tooltip" v-show="mediashowflag">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="图片" name="first">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :action="action"
                      :file-list="fileList"
                      accept=".gif,.jpg,.bmp,.png,.jpeg"
                      :on-success="successfulupload"
                      :limit=1
                      :auto-upload="false">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                  </el-tab-pane>
                </el-tabs>  
                <div class="filter-foot">
                  <el-button type="primary"  @click="hideShade">取消</el-button>
                </div>
            </div>  
          </div>
          <div class="childsuspend">
            <el-button :disabled="disabled" class="suspend-title" @click="choicesuspend('graphe')" type="primary" icon="suspend-first el-icon-edit">图表<i class="el-icon-caret-bottom"></i></el-button>
            <div class="tooltip" v-show="grapheshowflag">
                <el-tabs v-model="activeNametwo" @tab-click="handleClick">
                  <el-tab-pane label="分组表" name="first2" class="clearfix">
                      <div class="box">
                        <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item,'1')"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>
                      </div>
                  </el-tab-pane>
                  <el-tab-pane label="垂直柱状图" name="second2" class="clearfix">
                      <div class="box">
                        <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item,'1')"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>
                      </div>
                  </el-tab-pane>
                  <el-tab-pane label="水平柱状图" name="third2" class="clearfix">
                      <div class="box">
                        <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item,'1')"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>
                      </div>
                  </el-tab-pane>
                  <el-tab-pane label="折线图" name="four2" class="clearfix">
                      <div class="box">
                        <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item,'1')"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>
                      </div>
                  </el-tab-pane>
                  <el-tab-pane label="饼图" name="five2" class="clearfix">
                      <div class="box">
                        <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item,'1')"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>
                      </div>
                  </el-tab-pane>
                </el-tabs>
                <div class="filter-foot">
                  <el-button type="primary" @click="hideShade">取消</el-button>
                </div>
            </div>  
          </div>
          <div class="childsuspend">
            <el-button :disabled="disabled" class="suspend-title" @click="choicesuspend('theme')" type="primary" icon="suspend-first el-icon-edit">主题<i class="el-icon-caret-bottom"></i></el-button>
                  <div class="tooltip" v-show="themeshowflag">
                    <div class="filter">
                        <div>
                          <label style="color:black;">主题分类</label>
                          <el-select v-model="themevalue" placeholder="主题分类" @change="themechange">
                            <el-option v-for="(item,index) in reportthemelist" :key="index"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                    </div>
                    <div class="filter-btn clearfix">
                      <div class="box">
                        <el-button type="primary"  v-for="(theme,index) in formthemelist" :key="index" @click="successtheme(theme,'1')"><span class="form-name" :title="theme.reportFormsTitle">{{theme.reportFormsTitle}}</span></el-button>
                      </div>
                    </div>
                    <div class="filter-foot">
                      <!-- <el-button type="primary" @click="savetheme">确定</el-button> -->
                      <el-button type="primary" @click="hideShade">取消</el-button>
                    </div>
                </div>  
          </div>

          <div>
              <el-button :disabled="disabledPreview" class="tootipBtn" type="primary" @click="preview">预览</el-button>
              <el-button class="tootipBtn second" type="primary" @click="add">保存</el-button>
          </div>
        </div>
      </FormSelectGroup>

      <div class="container" id="mouseContainer">
        <DialogTemplateHtml />
        <div class="context-create">
          <table class="table" cellspacing="0" cellpadding="0">
            <tr v-for="(item,index) in tables" :key="index">
              <td class="fileDiv" v-for="(itemcol,index) in item.col" :key="index"></td>
            </tr>
          </table>
        </div>
        <Graphe :class="moduleCode" :chartShowData = "chartShowData" style="display:none;"></Graphe>
      </div>
  </div>
</template>

<script>
import FormSelectGroup from "@/common/formSelectGroup.vue"; //select选择组
import { mouseSelect } from "@/assets/js/mouseSelect.js"; //鼠标圈选
import { GetMethod, PostMethod } from "@/assets/js/Httpservice.js"; //ajax请求
import { Tool } from "@/assets/js/Tool.js"; //所有工具方法"
import DialogTemplateHtml from "@/common/DialogTemplateHtml.vue"; //对话框
import Graphe from "@/common/Graphe.vue"; //图表集合
export default {
  data() {
    return {
      chartShowData: "", //echarts图形展示数据对象
      formthemelist: [], //通过主题id查询的报表内容。
      reportthemelist: [], //主题下拉框内容
      themevalue: "", //主题下拉框选中值
      itemsform: [], //图表查询结果展示
      formsliststore: [], //图表选择集合
      moduleCode: "", //模板区域模块id
      tables: [],
      selTableInfo: "", //返回圈选div
      mediashowflag: false, //媒体下拉
      themeshowflag: false, //主题下拉
      grapheshowflag: false, //图表下拉
      textshowflag: false, //文字下拉
      activeNametwo: "first2",
      activeName: "first",
      fileList: [], //文件上传数组
      action: window.localStorage.getItem("baseURL") + "upload/image",
      imgBaseURL: window.localStorage.getItem("imgBaseURL"),
      shadeing: false, //遮罩层
      disabled: true, //禁止点击
      disabledPreview: true //禁止预览
    };
  },
  mounted() {
    this.initTableSelect();
  },
  components: {
    FormSelectGroup,
    DialogTemplateHtml,
    Graphe
  },
  computed: {
    listerGrapheChart() {
      return this.$store.state.grapheChart;
    }
  },
  watch: {
    listerGrapheChart(newval, oldval) {
      if (newval) {
        this.addgraphecontent(newval);
      }
    }
  },
  methods: {
    initTableSelect() {
      let _this = this;
      //初始化网格
      for (let row = 0; row < 18; row++) {
        this.tables.push({ row: row, col: [] });
        for (let col = 0; col < 32; col++) {
          this.tables[row].col.push({ row: row, col: col });
        }
      }

      //初始化圈选得到选择的td
      mouseSelect(
        ".fileDiv",
        ".table",
        "#mouseContainer",
        ".context-create",
        function insertDiv(list, unieId) {
          if (list.length > 0) {
            _this.disabledPreview = false;
            _this.disabled = false;
            _this.moduleCode = unieId;
          }
        }
      ); //表格td，表格，容器,拖动区域
    },
    //保存
    // add() {
    // let _this = this;
    // let html = $(".dashboardtemplate")
    // .clone()
    // .html();
    // localStorage.setItem("share", html);
    // if (this.$route.query.reportId) {
    //   //更新操作
    //   let reportModules = {
    //     reportModuleId: []
    //   };
    //   $(".templatelist").each((index, obj) => {
    //     let datacontent = "",
    //       reportFormsCode = "";
    //     if (obj.getAttribute("dataType") == 3) {
    //       //媒体
    //       datacontent = obj.lastChild.src.substr(
    //         obj.lastChild.src.lastIndexOf("/") + 1
    //       );
    //     }
    //     if (obj.getAttribute("dataType") == 2) {
    //       //文本
    //       datacontent = obj.lastChild.innerHTML;
    //     }
    //     if (obj.getAttribute("dataType") == 1) {
    //       //报表
    //       datacontent = obj.lastChild.innerHTML;
    //       reportFormsCode = obj.getAttribute("reportformscode");
    //     }
    //     self.echomodulecode.forEach(objchild => {
    //       if (objchild.moduleCode == obj.getAttribute("id")) {
    //         reportModules.reportModuleId.push({
    //           reportModuleId: objchild.reportModuleId,
    //           dataType: obj.getAttribute("dataType")
    //             ? Number(obj.getAttribute("dataType"))
    //             : undefined,
    //           dataContent: datacontent ? datacontent : undefined,
    //           reportFormsCode: reportFormsCode ? reportFormsCode : undefined
    //         });
    //       }
    //     });
    //   });
    //   server.reportupdate(reportModules.reportModuleId, function success(
    //     res
    //   ) {
    //     //接口请求、
    //     if (res.data.status == "SUCCESS") {
    //       self.$router.push({ path: "/reportwatch" });
    //     }
    //   });
    // } else {
    // _this.addTemplateReport()
    // }
    // },
    //预览
    preview() {
      // localStorage.setItem(
      //   "formsliststore",
      //   JSON.stringify(this.formsliststore)
      // );
      // let html = $(".dashboardtemplate")
      //   .clone()
      //   .html();
      // localStorage.setItem("share", html);
      // window.open("#/dashboardpreview", "_blank");
    },
    //改变字体
    handleFontSize(size) {
      $("#" + this.moduleCode)
        .find(".content")
        .css("font-size", size + "px");
      this.hideShade();
    },
    //取消添加媒体/主题/图表等
    hideShade() {
      this.mediashowflag = false;
      this.themeshowflag = false;
      this.grapheshowflag = false;
      this.textshowflag = false;
      this.shadeing = false;

      this.themevalue = null;
      this.reportthemelist = [];
      this.formthemelist = [];
    },
    defineTemplate() {
      this.$router.push({
        path: "/editrepoart",
        query: {
          templateId: this.reportsindex.templateId,
          reportId: this.reportsindex.reportId
        }
      });
    },
    //撤销
    reset(el) {
      if ($(".moveframe").length > 0) {
        $(".moveframe")[$(".moveframe").length - 1].remove();
        if (!$(".moveframe").length) {
          this.disabledPreview = true;
          this.disabled = true;
          this.moduleCode = "";
        }
      }
    },
    add() {
      let confirmOptions = {
        type: "dialog", //default
        title: "保存", //标题自定义显示内容
        show: true, //对话框显示标志位
        width: "536px", //对话框自定义宽度
        name: "add", //区分对话框显示表单内容
        isShowFoot: true,
        btnSubmitFunction: function(form) {
          console.log("保存");
          let params = form;
          PostMethod("reports", params, function(res) {});
        },
        btnCancelFunction: function() {
          console.log("取消");
        }
      };
      this.$store.dispatch("setDialogModalOptions", confirmOptions);
    },
    //退出
    singout() {
      let _this = this;
      Tool.prompt("报告内容还未保存，是否保存？", function success(res) {
        _this.addTemplateReport();
      });
    },
    //图表请求
    successforms(type) {
      let _this = this,
        params = { formsType: type };
      GetMethod("report-forms", params, function success(res) {
        _this.itemsform = res.data.data.list;
      });
    },
    queryreporttheme() {
      //获取主题下拉框内容
      let _this = this;
      GetMethod("report-forms/themes", function success(res) {
        //接口请求、
        _this.reportthemelist = [];
        res.data.data.list.forEach(function(obj, index) {
          _this.reportthemelist.push({
            value: String(obj.themeId),
            label: obj.themeName
          });
        });
      });
    },
    successtheme(obj, dataType) {
      let _this = this;
      if (dataType == "1") {
        this.chartShowData = Object.assign(obj, { chartType: dataType });
        this.$store.dispatch("setGrapheChart", this.chartShowData);
      }
      // this.formsliststore.push({
      //   dataType: dataType,
      //   moduleCode: this.moduleCode,
      //   obj: obj
      // }); //将添加的对象放到集合中
      // this.suspendflag = false; //遮罩挂件层消失
      // let html =
      //   "<span class='formcontent' style='font-size:18px;display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>" +
      //   obj.reportFormsTitle +
      //   "</span>";
      // this.addgraphecontent(html, ".formcontent", 1, obj.reportFormsCode);
    },
    themechange() {
      //主题下拉框改变查询对应的列表
      let _this = this;
      let params = { themeId: this.themevalue };
      _this.formthemelist = [];
      GetMethod("report-forms", params, function success(res) {
        _this.formthemelist = res.data.data.list;
      });
    },
    choicesuspend(params) {
      this.hideShade();
      //遮罩层挂件点击
      this.mediashowflag = false;
      this.themeshowflag = false;
      this.grapheshowflag = false;
      this.textshowflag = false;
      this.shadeing = true;
      if (params == "theme") {
        this.themeshowflag = true;
        this.queryreporttheme();
      }
      if (params == "graphe") {
        this.grapheshowflag = true;
        this.activeNametwo = "first2";
        this.successforms("1");
      }
      if (params == "media") {
        this.mediashowflag = true;
      }
      if (params == "text") {
        this.textshowflag = true;
      }
    },
    handleClick(tab, event) {
      this.itemsform = [];
      this.tab = tab;
      switch (tab.label) {
        case "分组表":
          this.successforms("1");
          break;
        case "垂直柱状图":
          this.successforms("2");
          break;
        case "水平柱状图":
          this.successforms("3");
          break;
        case "折线图":
          this.successforms("4");
          break;
        case "饼图":
          this.successforms("5");
          break;

        default:
          break;
      }
    },
    successfulupload(response, file, fileList) {
      //上传图片成功
      if (response.status == "SUCCESS") {
        this.formsliststore.push({
          dataType: "3",
          moduleCode: this.moduleCode,
          // obj: this.imgBaseURL + response.data.fileName
          obj: response.data.serverURI + response.data.fileName
        }); //将添加的对象放到集合中
        // this.suspendflag = false;
        this.fileList = [];
        let html =
          "<img width='100%' height='100%' style='position:absolute;top:0;left:0;right:0;bottom:0;' src=" +
          response.data.serverURI +
          response.data.fileName +
          ">";
        this.addgraphecontent(html, "img", 3);
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },

    successreportform(obj, dataType) {
      let _this = this;
      if (dataType == "1") {
        this.chartShowData = Object.assign(obj, { chartType: dataType });
        this.$store.dispatch("setGrapheChart", this.chartShowData);
      }
    },
    addgraphecontent(html, dom, dataType, reportFormsCode) {
      //遮罩挂件选择完毕，添加模板区域模块内容
      // 1报表|2文本|3媒体
      if (!dataType && !reportFormsCode) {
        $("#" + this.moduleCode)
          .find(".content")
          .append(html);
      } else {
        $("#" + this.moduleCode)
          .attr({ dataType: dataType, reportFormsCode: reportFormsCode })
          .find(".content")
          .empty()
          .append(html);
      }
      this.hideShade();
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variable.less";
.page {
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  background-color: #f4f6f9;
}
.suspend-tootip {
  width: @width-containerContent;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  color: #ffffff;
  span.suspend-title {
    float: left;
    font-size: 24px;
    margin-right: 178px;
    cursor: pointer;
  }
  span.suspend-title:first-child {
    margin-left: 47px;
    margin-right: 17px;
    cursor: pointer;
  }
  .childsuspend {
    float: left;
    // display: block;
    display: inline-block;
    .el-button.suspend-title {
      width: 103px;
      height: 45px;
      background-color: #278df6;
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      border: solid 1px #b7b7b7;
      padding: 0;
      .el-icon-caret-bottom {
        padding-left: 11px;
      }
      .suspend-first {
        font-size: 18px;
      }
      span {
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
.container {
  width: @width-container;
  margin: 0 auto;
  padding: 0 22px;
  margin-top: 10px;
  clear: both;
  position: relative;
  top: -38px;
}
.context-create {
  margin: 0 auto;
  width: @width-containerContent;
  background-color: #ffffff;
  box-shadow: 0px 2px 13px 1px rgba(58, 63, 80, 0.11);
  border-radius: 10px;
  padding: 15px 10px;
}
.table {
  position: relative;
  border-right: 1px dashed #4c65a4;
  border-bottom: 1px dashed #4c65a4;
  td {
    height: 32px;
    width: 32px;
    border-top: 1px dashed #4c65a4;
    border-left: 1px dashed #4c65a4;
  }
  td.seled {
    background: rgba(76, 101, 164, 0.5);
  }
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
    // border: 1px solid;
    min-width: 320px;
    min-height: 215px;
    width: 3.05rem;
    height: calc(3.05rem - 100px);
    margin: 17px 0px;
    float: left;
    position: relative;
    overflow: hidden;
    .list-top {
      width: 100%;
      height: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 20px;
      background: linear-gradient(#6886db, #4b63a7);
      padding-top: 57px;
      position: relative;
      .defaultitle {
        overflow: hidden;
        line-height: 28px;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
        margin: 0 auto;
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
      }

      .info {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: top;
        align-items: center;
        background-color: #3c98f7;
        flex-direction: column;
        padding-top: 10px;
      }
      .infochecked {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 80px;
        }
      }
    }
  }
}
.childsuspend {
  margin-right: 5px;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 20;
  button {
    color: #fff;
  }
  .tooltip {
    position: absolute;
    top: 80px;
    // right:0;
    transform: translateX(-43%);
    width: 600px;
    min-height: 200px;
    background-color: #fff;
    // display: none;
    padding: 20px;
    .form-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      width: 100%;
    }
    .echartstype {
      display: inline-block;
      width: 10%;
      float: left;
      img {
        width: 100%;
      }
    }
    .filter-btn {
      // display: flex;
      // justify-content: space-between;
      .box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .el-button {
          min-width: 108px;
          width: 30%;
          height: 29px;
          margin-bottom: 6px;
          border: 0;
          outline: 0;
          padding: 9px 15px;
          font-size: 12px;
          border-radius: 3px;
        }
      }
      .box::after {
        content: " ";
        width: 30%;
      }
    }
    .filter-btn::after {
      content: " ";
      width: 25%;
    }
    .filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .filter-btn button {
      width: 25%;
      margin-bottom: 10px;
      margin-left: 0;
      float: left;

      // min-width: 108px;
      // width: 30%;
      // height: 29px;
      // margin-bottom: 6px;
      // border: 0;
      // outline: 0;
    }
    .filter-btn button.middle {
      margin-right: 12.5%;
      margin-left: 12.5%;
    }
    .filter-img {
      .part {
        display: flex;
        flex-direction: column;
        width: 25%;
        height: auto;
        min-height: 1px;
        float: left;
        img {
          width: 100%;
        }
      }
      .middle {
        margin-right: 12.5%;
        margin-left: 12.5%;
      }
    }
    .filter-foot {
      text-align: right;
      margin-top: 20px;
    }
  }
  .tooltip.textTooltip {
    width: 136px;
    left: 37%;
    padding: 0;
    min-height: 96px;
    .filter-foot {
      margin-top: 0px;
      .text {
        height: 32px;
        line-height: 32px;
        color: black;
        font-size: 14px;
        text-align: left;
        border-bottom: 1px solid #e5e8eb;
        cursor: pointer;
        padding-left: 10px;
      }
      .text:nth-child(1) {
        font-size: 12px;
      }
      .text:hover {
        background-color: #f1f2f7;
      }
    }
  }
  .tooltip::after {
    content: " ";
    display: block;
    width: 1px;
    height: 1px;
    position: absolute;
    top: -10px;
    left: 50%;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }
}
.dashboardtemplate {
  position: relative;
  top: -100px;
  left: 0;
  border: 1px solid;
  width: 100%;
  height: 600px;
  // min-height:600px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 20px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .aside {
    display: flex;
    // flex:1;
    .template {
      flex: 1;
      display: flex;
      flex-direction: column;
      .templatelist {
        flex: 1;
        // flex-shrink:0;
        // flex-grow:0;
        border: 1px dashed #ddd;
        margin: 5px;
        border-radius: 4px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .delete {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 30px;
          color: #ffffff;
        }
        .delete:hover {
          color: #ffffff;
          background-color: #2182e7;
          cursor: pointer;
          border-radius: 4px;
        }
        .addcen {
          color: green;
          font-size: 50px;
          cursor: pointer;
        }
        .addcen:hover {
          color: #278df6;
        }
      }
    }
  }
  .top {
    flex: 2;
  }
  .bot {
    display: flex;
    flex: 1;
    .template {
      flex-direction: row;
    }
  }
  .template.double {
    flex: 2;
  }
  .footbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
}
.shade {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background: rgba(51, 51, 51, 0.5);
}
</style>

<style lang="less">
.childsuspend .el-button.suspend-title .suspend-first {
  font-size: 18px;
}
.childsuspend .el-button.suspend-title span {
  font-family: PingFangSC-Regular;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
.childsuspend .el-button.suspend-title .el-icon-caret-bottom {
  font-size: 16px;
}
.el-button.tootipBtn {
  width: 81px;
  height: 36px;
  background-color: #278df6;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 0;
  span {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #fefefe;
  }
}
.el-button.tootipBtn {
  margin-left: 110px;
}
.el-button.tootipBtn.second {
  margin-left: 5px;
}
.themeBtn {
  height: 40px;
  line-height: 40px;
}
</style>
