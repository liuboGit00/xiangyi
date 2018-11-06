<template>
  <div class="page">
    <div class="emptyformgroup">
      <div v-show="suspendflag" class="topsuspend" >
        <div class="childsuspend">
          <el-button @click="choicesuspend('media')" type="primary" icon="el-icon-edit">媒体<i class="el-icon-caret-bottom"></i></el-button>
          <div class="tooltip" v-show="mediashowflag">
              <!-- <el-tabs v-model="activeName" @tab-click="handleClick" stretch='true'> -->
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
                <el-button type="primary" @click="savebtn">取消</el-button>
              </div>
          </div>   
        </div>
        <div class="childsuspend">
          <el-button @click="choicesuspend('graphe')" type="primary" icon="el-icon-edit">图表<i class="el-icon-caret-bottom"></i></el-button>
          <div class="tooltip" v-show="grapheshowflag">
              <!-- <el-tabs v-model="activeNametwo" @tab-click="handleClick" stretch='true'> -->
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
                <el-button type="primary" @click="savebtn">取消</el-button>
              </div>
          </div>   
        </div>
        <div class="childsuspend">
          <el-button @click="choicesuspend('theme')" type="primary" icon="el-icon-edit">主题<i class="el-icon-caret-bottom"></i></el-button>
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
                <el-button type="primary" @click="savebtn">取消</el-button>
              </div>
          </div>   
        </div>
      </div>
    </div>
    <div class="container">
      <div class="dashboardtemplate">
        <div class="aside top">
          <div class="template">
            <div class="templatelist"  id="regionReport_01">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_01')"></span>
                <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_01')" v-show="deleteflag"></span>
            </div>
            <div class="templatelist"  id="regionReport_02">
              <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_02')"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_02')" v-show="deleteflag"></span>
            </div>
          </div>
          <div class="template double">
            <div class="templatelist" id="regionReport_03">
              <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_03')"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_03')" v-show="deleteflag"></span>
            </div>
          </div>
          <div class="template">
            <div class="templatelist" id="regionReport_04">
              <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_04')"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_04')" v-show="deleteflag"></span>
            </div>
            <div class="templatelist"  id="regionReport_05">
              <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_05')"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_05')" v-show="deleteflag"></span>
            </div>
          </div>
        </div>
        <div class="aside bot">
          <div class="template">
            <div class="templatelist" id="regionReport_06">
              <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_06')"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_06')" v-show="deleteflag"></span>                
            </div>
            <div class="templatelist" id="regionReport_07">
              <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_07')"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_07')" v-show="deleteflag"></span>                
            </div>
            <div class="templatelist" id="regionReport_08">
              <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_08')"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_08')" v-show="deleteflag"></span>                
            </div>
            <div class="templatelist" id="regionReport_09">
              <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_09')"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe('regionReport_09')" v-show="deleteflag"></span>                
            </div>
          </div>
        </div>
        <div class="footbtn">
          <el-button type="primary" size="mini" @click="preview">预览</el-button>
          <el-button type="primary" size="mini" @click="savetemplate">保存</el-button>
          <!-- <el-button type="primary" size="mini" @click="publics">发布</el-button> -->
        </div>
      </div>
      <div class="addelement" v-show="suspendflag" @click="hidesuspend">
      </div>
      <DialogTemplateHtml />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DialogTemplateHtml from "@/common/DialogTemplateHtml.vue"; //弹框组件
import {
  GetMethod,
  DeleteMethod,
  PutMethod,
  PostMethod
} from "@/assets/js/Httpservice.js";
export default {
  data() {
    return {
      reportthemelist: [], //主题下拉框内容
      themevalue: "", //主题下拉框选中值
      formthemelist: [], //通过主题id查询的报表内容。

      report: {
        reportTitle: "", //临时存储报告标题
        reportId: ""
      },
      publicsagainflag: false, //在保存弹窗保存之后，发布弹窗打开之前
      publicsflag: false, //在点击发布之后，保存弹窗之前
      templateId: this.$route.query.templateId,
      // serverobject: server, //ajax服务
      suspendflag: false, //遮罩层是否显示
      dialogOpt: {
        //对话框配置
        dialogflag: false,
        width: "536px",
        disabled: false
      },
      form: {
        region: ""
      },
      action: window.localStorage.getItem("baseURL") + "upload/image",
      imgBaseURL: window.localStorage.getItem("imgBaseURL"),
      fileList: [], //文件上传数组
      itemsform: [], //图表查询结果展示
      moduleCode: "", //模板区域模块id
      activeName: "first",
      activeNametwo: "first2",
      deleteflag: false, //删除按钮是否显示
      moudulecode: "",
      formsliststore: [], //图表选择集合
      echomodulecode: [], //编辑回显的数据
      tab: "",
      mediashowflag: false, //添加顶部的层级显示
      themeshowflag: false,
      grapheshowflag: false
    };
  },
  components: {
    DialogTemplateHtml
  },
  mounted() {
    this.$emit("typeShow", false);
    let self = this;
    if (self.$route.query.reportId) {
      self.ajaxshowecho();
    }
  },
  methods: {
    ajaxshowecho() {
      this.$emit("typeShow", true);
      let self = this;
      let params = self.$route.query.reportId;
      GetMethod("report-modules/" + params, function success(respar) {
        if ((respar.data.status = "SUCCESS")) {
          self.$emit("typeShow", false);
          // 1报表|2文本|3媒体
          self.echomodulecode = respar.data.data;
          respar.data.data.forEach((obj, index) => {
            if (obj.dataType == 1) {
              self.formsliststore.push({
                dataType: "1",
                moduleCode: obj.moduleCode,
                obj: obj
              }); //将添加的对象放到集合中
              self.moduleCode = obj.moduleCode;
              // this.suspendflag = false; //遮罩挂件层消失
              let html =
                "<span class='formcontent' style='font-size:18px;display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>" +
                obj.dataContent +
                "</span>";
              self.addgraphecontent(
                html,
                ".formcontent",
                1,
                obj.reportFormsCode
              );
            }
            // if(obj.dataType == 2){
            //     $("#"+obj.moduleCode).append("<span>"+obj.dataContent+"<span>")
            // }
            if (obj.dataType == 3) {
              self.formsliststore.push({
                dataType: "3",
                moduleCode: obj.moduleCode,
                obj: self.imgBaseURL + obj.dataContent
              }); //将添加的对象放到集合中
              // this.suspendflag = false;
              self.moduleCode = obj.moduleCode;
              self.fileList = [];
              let html =
                "<img width='100%' height='100%' src=" +
                self.imgBaseURL +
                obj.dataContent +
                ">";
              self.addgraphecontent(html, "img", 3, obj.reportFormsCode);
            }
          });
        }
      })
      // self.serverobject.reportmodulesearch(params, function success(respar) {
      //   if ((respar.data.status = "SUCCESS")) {
      //     self.$emit("typeShow", false);
      //     // 1报表|2文本|3媒体
      //     self.echomodulecode = respar.data.data;
      //     respar.data.data.forEach((obj, index) => {
      //       if (obj.dataType == 1) {
      //         self.formsliststore.push({
      //           dataType: "1",
      //           moduleCode: obj.moduleCode,
      //           obj: obj
      //         }); //将添加的对象放到集合中
      //         self.moduleCode = obj.moduleCode;
      //         // this.suspendflag = false; //遮罩挂件层消失
      //         let html =
      //           "<span class='formcontent' style='font-size:18px;display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>" +
      //           obj.dataContent +
      //           "</span>";
      //         self.addgraphecontent(
      //           html,
      //           ".formcontent",
      //           1,
      //           obj.reportFormsCode
      //         );
      //       }
      //       // if(obj.dataType == 2){
      //       //     $("#"+obj.moduleCode).append("<span>"+obj.dataContent+"<span>")
      //       // }
      //       if (obj.dataType == 3) {
      //         self.formsliststore.push({
      //           dataType: "3",
      //           moduleCode: obj.moduleCode,
      //           obj: self.imgBaseURL + obj.dataContent
      //         }); //将添加的对象放到集合中
      //         // this.suspendflag = false;
      //         self.moduleCode = obj.moduleCode;
      //         self.fileList = [];
      //         let html =
      //           "<img width='100%' height='100%' src=" +
      //           self.imgBaseURL +
      //           obj.dataContent +
      //           ">";
      //         self.addgraphecontent(html, "img", 3, obj.reportFormsCode);
      //       }
      //     });
      //   }
      // });
    },
    echographe(dataType) {
      if (dataType == 1) {
        this.formsliststore.push({
          dataType: dataType,
          moduleCode: this.moduleCode,
          obj: obj
        }); //将添加的对象放到集合中
        this.suspendflag = false; //遮罩挂件层消失
        let html =
          "<span class='formcontent' style='font-size:18px;display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>" +
          obj.reportFormsTitle +
          "</span>";
        this.addgraphecontent(html, ".formcontent", 1);
      }
    },
    getShowChart(item) {
      if (item.chartType == "1") {
        this.$set(item, "tabeShow", true);
      } else if (item.chartType == "2") {
        this.$set(item, "barShow", true);
      } else if (item.chartType == "4") {
        this.$set(item, "lineShow", true);
      } else if (item.chartType == "5") {
        this.$set(item, "pieShow", true);
      } else {
        this.$set(item, "lineShow", false);
        this.$set(item, "pieShow", false);
        this.$set(item, "barShow", false);
        this.$set(item, "tabeShow", false);
      }
    },
    choicechartype(item, chartType, data) {
      this.$set(item, "chartType", chartType);
      switch (chartType) {
        case 1:
          item.chartData = data.tableChartVot;
          break;
        case 2:
          item.chartData = data.zhexianChartVo;
          break;
        case 4:
          item.chartData = data.zhexianChartVo;
          break;
        case 5:
          item.chartData = data.pieCharts;
          break;
      }
    },
    deletegraphe(moduleCode) {
      $("#" + moduleCode).attr("dataType", null);
      $("#" + moduleCode).off("mouseenter");
      $("#" + moduleCode)
        .find(".delete")
        .css({ display: "none" });
      $("#" + moduleCode)
        .find(".addcen")
        .css({ display: "block" });
      if ($("#" + moduleCode).find("img")) {
        $("#" + moduleCode)
          .find("img")
          .remove();
      }
      if ($("#" + moduleCode).find(".formcontent")) {
        $("#" + moduleCode)
          .find(".formcontent")
          .remove();
      }
      this.formsliststore.forEach((obj, index) => {
        if (obj.moduleCode == moduleCode) {
          this.formsliststore.splice(index, 1);
        }
      });
    },
    hidesuspend() {
      this.suspendflag = false;
      this.activeNametwo = "first2";
      this.successforms("1");
    },
    successtheme(obj, dataType) {
      this.formsliststore.push({
        dataType: dataType,
        moduleCode: this.moduleCode,
        obj: obj
      }); //将添加的对象放到集合中
      this.suspendflag = false; //遮罩挂件层消失
      let html =
        "<span class='formcontent' style='font-size:18px;display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>" +
        obj.reportFormsTitle +
        "</span>";
      this.addgraphecontent(html, ".formcontent", 1, obj.reportFormsCode);
    },
    themechange() {
      //主题下拉框改变查询对应的列表
      let self = this;
      let params = { themeId: this.themevalue };
      self.formthemelist = [];
      GetMethod("report-forms",params,function success(res) {
        //接口请求、
        if (res.data.status == "SUCCESS") {
          self.formthemelist = res.data.data.list;
        }
      })
      // server.reportforms(params, function success(res) {
      //   //接口请求、
      //   if (res.data.status == "SUCCESS") {
      //     self.formthemelist = res.data.data.list;
      //   }
      // });
    },
    queryreporttheme() {
      //获取主题下拉框内容
      let self = this;
      GetMethod("/report-forms/themes", function success(res) {
        //接口请求、
        if ((res.data.status = "SUCCESS")) {
          self.reportthemelist = [];
          res.data.data.list.forEach(function(obj, index) {
            self.reportthemelist.push({
              value: String(obj.themeId),
              label: obj.themeName
            });
          });
        }
      })
      // server.reportformstheme("", function success(res) {
      //   //接口请求、
      //   if ((res.data.status = "SUCCESS")) {
      //     self.reportthemelist = [];
      //     res.data.data.list.forEach(function(obj, index) {
      //       self.reportthemelist.push({
      //         value: String(obj.themeId),
      //         label: obj.themeName
      //       });
      //     });
      //   }
      // });
    },
    addgraphecontent(html, dom, dataType, reportFormsCode) {
      //遮罩挂件选择完毕，添加模板区域模块内容
      // 1报表|2文本|3媒体
      $("#" + this.moduleCode)
        .attr({ dataType: dataType, reportFormsCode: reportFormsCode })
        .append(html)
        .find(".addcen")
        .css("display", "none");
      $("#" + this.moduleCode)
        // .find(dom)
        .on("mouseenter mouseleave", function(event) {
          if (event.type == "mouseenter") {
            $(this)
              // .offsetParent()
              .find(".delete")
              .css({ display: "block" });
          } else {
            $(this)
              // .offsetParent()
              .find(".delete")
              .css({ display: "none" });
          }
        });
    },
    successreportform(obj, dataType) {
      this.formsliststore.push({
        dataType: dataType,
        moduleCode: this.moduleCode,
        obj: obj
      }); //将添加的对象放到集合中
      this.suspendflag = false; //遮罩挂件层消失
      let html =
        "<span class='formcontent' style='font-size:18px;display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>" +
        obj.reportFormsTitle +
        "</span>";
      this.addgraphecontent(html, ".formcontent", 1, obj.reportFormsCode);
    },
    successforms(type) {
      //报表类型选择完毕
      let self = this,
      params = { formsType: type };
      GetMethod("/report-forms",params,function success(res) {
        //接口请求、
        if ((res.data.status = "SUCCESS")) {
          $("#reportform_" + type).css({ display: "none" });
          self.itemsform = res.data.data.list;
        }
      })
      // server.reportforms(params, function success(res) {
      //   //接口请求、
      //   if ((res.data.status = "SUCCESS")) {
      //     $("#reportform_" + type).css({ display: "none" });
      //     self.itemsform = res.data.data.list;
      //   }
      // });
    },
    successfulupload(response, file, fileList) {
      //上传图片成功
      if (response.status == "SUCCESS") {
        this.formsliststore.push({
          dataType: "3",
          moduleCode: this.moduleCode,
          obj: this.imgBaseURL + response.data.fileName
        }); //将添加的对象放到集合中
        this.suspendflag = false;
        this.fileList = [];
        let html =
          "<img width='100%' height='100%' src=" +
          this.imgBaseURL +
          response.data.fileName +
          ">";
        this.addgraphecontent(html, "img", 3);
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    preview() {
      //预览
      localStorage.setItem(
        "formsliststore",
        JSON.stringify(this.formsliststore)
      );
      let html = $(".dashboardtemplate")
        .clone()
        .html();
      localStorage.setItem("share", html);
      window.open("#/dashboardpreview", "_blank");
    },
    publics() {
      //发布
      let html = $(".dashboardtemplate")
        .clone()
        .html();
      localStorage.setItem("share", html);
      this.publicsflag = true; //是否点击了发布
      this.publicsagainflag = false; //点击了发布，先出保存弹框在出发布
      this.selectDialog("保存"); //先保存然后在发布
    },
    savetemplate() {
      //保存
      let self = this;
      let confirmOptions = {}
      let html = $(".dashboardtemplate")
        .clone()
        .html();
      localStorage.setItem("share", html);
      if (this.$route.query.reportId) {   
        //更新操作
        let reportModules = {
          reportModuleId: []
        };
        $(".templatelist").each((index, obj) => {
          let datacontent = "",
            reportFormsCode = "";
          if (obj.getAttribute("dataType") == 3) {
            //媒体
            datacontent = obj.lastChild.src.substr(
              obj.lastChild.src.lastIndexOf("/") + 1
            );
          }
          if (obj.getAttribute("dataType") == 2) {
            //文本
            datacontent = obj.lastChild.innerHTML;
          }
          if (obj.getAttribute("dataType") == 1) {
            //报表
            datacontent = obj.lastChild.innerHTML;
            reportFormsCode = obj.getAttribute("reportformscode");
          }
          self.echomodulecode.forEach(objchild => {
            if (objchild.moduleCode == obj.getAttribute("id")) {
              reportModules.reportModuleId.push({
                reportModuleId: objchild.reportModuleId,
                dataType: obj.getAttribute("dataType")
                  ? Number(obj.getAttribute("dataType"))
                  : undefined,
                dataContent: datacontent ? datacontent : undefined,
                reportFormsCode: reportFormsCode ? reportFormsCode : undefined
              });
            }
          });
        });
        PutMethod("/report-modules",reportModules.reportModuleId,function success(res) {
          //接口请求、
          if (res.data.status == "SUCCESS") {
            self.$router.push({ path: "/reportwatch" });
          }
        })
        // server.reportupdate(reportModules.reportModuleId, function success(
        //   res
        // ) {
        //   //接口请求、
        //   if (res.data.status == "SUCCESS") {
        //     self.$router.push({ path: "/reportwatch" });
        //   }
        // });
      } else {
        // this.selectDialog("保存");
        confirmOptions = {
          type: "dialog", //warning
          title: "保存", //标题自定义显示内容
          show: true, //对话框显示标志位
          width: "536px", //对话框自定义宽度
          name: "dashboardSave", //区分对话框显示表单内容
          btnCancelText: "取消", //取消按钮自定义显示内容
          btnSubmitText: "确定", //确定按钮自定义显示内容
          isShowFoot: true,
          btnSubmitFunction: function(formdata) {   //点击确定
            console.log('确定了',formdata)
            //对话框保存(formdata为对话框表单对象)
            self.dialogOpt.dialogflag = false; //弹窗隐藏
            self.dialogOpt.disabled = true; //禁止多次点击
            formdata["templateId"] = self.templateId;
            if (self.publicsagainflag) {
              //点击发布
              
              if (formdata.receiveUserId.length == 0) {
                self.$message({
                  message: "用户选择不能为空",
                  type: "warning"
                });
                return;
              }
              let params = formdata;
              let nweparam = [];
              formdata.receiveUserId.forEach(obj => {
                nweparam.push({
                  reportId: self.report.reportId,
                  allowTwice: formdata.allowTwice,
                  urgentType: formdata.urgentType,
                  usefulTime: formdata.usefulTime,
                  remark: formdata.remark,
                  reportTitle: self.report.reportTitle,
                  receiveUserId: obj.id,
                  receiveUserName: obj.label
                });
              });
              PostMethod("/report-publishing", nweparam, function success(res) {
                //接口请求、
                if ((res.data.status = "SUCCESS")) {
                  self.dialogOpt.dialogflag = false; //弹窗取消
                  self.dialogOpt.disabled = false; //禁止多次点击
                  self.publicsagainflag = false;
                  self.$router.push({ path: "/reportpublic" });
                }
              })
              // server.reportpublish(nweparam, function success(res) {
              //   //接口请求、
              //   if ((res.data.status = "SUCCESS")) {
              //     self.dialogOpt.dialogflag = false; //弹窗取消
              //     self.dialogOpt.disabled = false; //禁止多次点击
              //     self.publicsagainflag = false;
              //     self.$router.push({ path: "/reportpublic" });
              //   }
              // });
            } else {
              //只点击保存
              self.report.reportTitle = formdata.reportTitle; //将报告主题保存到变量里面
              console.log(formdata)
              let report = {
                report: formdata
              };
              
              let reportModules = {
                reportModules: []
              };
              $(".templatelist").each((index, obj) => {
                let datacontent = "",
                  reportFormsCode = "";
                if (obj.getAttribute("dataType") == 3) {
                  //媒体
                  datacontent = obj.lastChild.src.substr(
                    obj.lastChild.src.lastIndexOf("/") + 1
                  );
                }
                if (obj.getAttribute("dataType") == 2) {
                  //文本
                  datacontent = obj.lastChild.innerHTML;
                }
                if (obj.getAttribute("dataType") == 1) {
                  //报表
                  datacontent = obj.lastChild.innerHTML;
                  reportFormsCode = obj.getAttribute("reportformscode");
                }
                reportModules.reportModules.push({
                  moduleCode: obj.getAttribute("id"),
                  dataType: obj.getAttribute("dataType")
                    ? obj.getAttribute("dataType")
                    : null,
                  dataContent: datacontent,
                  reportFormsCode: reportFormsCode
                });
              });
              let params = Object.assign(reportModules, report);
              console.log(params)
              PostMethod("reports", params, function success(res) {
                //接口请求、
                if ((res.data.status = "SUCCESS")) {
                  self.dialogOpt.dialogflag = false;
                  self.dialogOpt.disabled = false; //禁止多次点击
                  if (self.publicsflag) {
                    self.selectDialog("发布");
                    self.publicsagainflag = true;
                    self.report.reportId = res.data.data.reportId;
                  } else {
                    // self.$router.push({ path: "/reportwatch" });
                  }
                }
              })
              // server.reportsave(params, function success(res) {
              //   //接口请求、
              //   if ((res.data.status = "SUCCESS")) {
              //     self.dialogOpt.dialogflag = false;
              //     self.dialogOpt.disabled = false; //禁止多次点击
              //     if (self.publicsflag) {
              //       self.selectDialog("发布");
              //       self.publicsagainflag = true;
              //       self.report.reportId = res.data.data.reportId;
              //     } else {
              //       self.$router.push({ path: "/reportwatch" });
              //     }
              //   }
              // });
              // }
            }
          },
          btnCancelFunction: function() {
            //取消按钮事件
            console.log("取消");
          }
        };
        self.$store.dispatch("setDialogModalOptions", confirmOptions);
      }
    },
    savetheme() {
      //保存主题
      // this.tooltip = false;
      this.suspendflag = false;
    },
    savebtn() {
      this.mediashowflag = false;
      this.themeshowflag = false;
      this.grapheshowflag = false;
      $(".tooltip").hide();
    },
    choicesuspend(params) {
      //遮罩层挂件点击
      this.mediashowflag = false;
      this.themeshowflag = false;
      this.grapheshowflag = false;
      if (params == "theme") {
        this.themeshowflag = true;
      }
      if (params == "graphe") {
        this.grapheshowflag = true;
      }
      if (params == "media") {
        this.mediashowflag = true;
      }
      // $(".tooltip").css("display", "none");
      // $(el.target)
      //   .offsetParent()
      //   .find(".tooltip")
      //   .css("display", "block");
      this.queryreporttheme();
      this.activeNametwo = "first2";
      this.successforms("1");
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
    addgraphe: function(moudulecode) {
      //添加模板区域内容
      this.suspendflag = true;
      this.moduleCode = moudulecode;
    },
    selectDialog: function(message, type) {
      //弹窗打开/关闭（message对话框标题，type是操作类型sure为保存close为取消）
      if (type) {
        //关闭弹窗
        this.dialogOpt.dialogflag = false;
        self.publicsagainflag = false;
      } else {
        //打开弹窗
        this.dialogOpt = {
          dialogflag: true, //根据flag决定弹窗是否出现
          width: "536px",
          disabled: false,
          title: message //根据title决定弹窗页面内容。
        };
      }
    },
    submitDialog: function(message, type, formdata) {
      //对话框保存(formdata为对话框表单对象)
      let self = this;
      self.dialogOpt.dialogflag = false; //弹窗隐藏
      self.dialogOpt.disabled = true; //禁止多次点击
      formdata["templateId"] = self.templateId;
      if (self.publicsagainflag) {
        //点击发布
        if (formdata.receiveUserId.length == 0) {
          this.$message({
            message: "用户选择不能为空",
            type: "warning"
          });
          return;
        }
        let params = formdata;
        let nweparam = [];
        formdata.receiveUserId.forEach(obj => {
          nweparam.push({
            reportId: self.report.reportId,
            allowTwice: formdata.allowTwice,
            urgentType: formdata.urgentType,
            usefulTime: formdata.usefulTime,
            remark: formdata.remark,
            reportTitle: self.report.reportTitle,
            receiveUserId: obj.id,
            receiveUserName: obj.label
          });
        });
        PostMethod("/report-publishing", nweparam, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false; //弹窗取消
            self.dialogOpt.disabled = false; //禁止多次点击
            self.publicsagainflag = false;
            self.$router.push({ path: "/reportpublic" });
          }
        })
        // server.reportpublish(nweparam, function success(res) {
        //   //接口请求、
        //   if ((res.data.status = "SUCCESS")) {
        //     self.dialogOpt.dialogflag = false; //弹窗取消
        //     self.dialogOpt.disabled = false; //禁止多次点击
        //     self.publicsagainflag = false;
        //     self.$router.push({ path: "/reportpublic" });
        //   }
        // });
      } else {
        //只点击保存
        this.report.reportTitle = formdata.reportTitle; //将报告主题保存到变量里面
        let report = {
          report: formdata
        };
        let reportModules = {
          reportModules: []
        };
        $(".templatelist").each((index, obj) => {
          let datacontent = "",
            reportFormsCode = "";
          if (obj.getAttribute("dataType") == 3) {
            //媒体
            datacontent = obj.lastChild.src.substr(
              obj.lastChild.src.lastIndexOf("/") + 1
            );
          }
          if (obj.getAttribute("dataType") == 2) {
            //文本
            datacontent = obj.lastChild.innerHTML;
          }
          if (obj.getAttribute("dataType") == 1) {
            //报表
            datacontent = obj.lastChild.innerHTML;
            reportFormsCode = obj.getAttribute("reportformscode");
          }
          reportModules.reportModules.push({
            moduleCode: obj.getAttribute("id"),
            dataType: obj.getAttribute("dataType")
              ? obj.getAttribute("dataType")
              : null,
            dataContent: datacontent,
            reportFormsCode: reportFormsCode
          });
        });
        let params = Object.assign(reportModules, report);
        PostMethod("/reports", params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            self.dialogOpt.disabled = false; //禁止多次点击
            if (self.publicsflag) {
              self.selectDialog("发布");
              self.publicsagainflag = true;
              self.report.reportId = res.data.data.reportId;
            } else {
              self.$router.push({ path: "/reportwatch" });
            }
          }
        })
        // server.reportsave(params, function success(res) {
        //   //接口请求、
        //   if ((res.data.status = "SUCCESS")) {
        //     self.dialogOpt.dialogflag = false;
        //     self.dialogOpt.disabled = false; //禁止多次点击
        //     if (self.publicsflag) {
        //       self.selectDialog("发布");
        //       self.publicsagainflag = true;
        //       self.report.reportId = res.data.data.reportId;
        //     } else {
        //       self.$router.push({ path: "/reportwatch" });
        //     }
        //   }
        // });
        // }
      }
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variable.less";
.page {
  width: 100%;
  overflow: auto;
  background-color: #f4f6f9;
}
// .emptyformgroup {
//   height: @height-formselectgroup;
//   display: flex;
//   align-items: center;
//   background-color: #4c65a4;
//   display: flex;
//   flex-direction: column;
//   align-items: start;
//   padding-left: 64px;
//   justify-content: center;
// }
.emptyformgroup {
  background: #4b63a7;
  // margin-left: -40px;
  // margin-right: -40px;
  // margin-top: -30px;
  height: 120px;
  padding-left: 40px;
  padding-right: 60px;
  // background: #4b63a7;
  // margin-left: -40px;
  // margin-right: -40px;
  // margin-top: -15px;
  // height: 140px;
  position: relative;
  // top: 0;
  // left: 0;
  .topsuspend {
    width: 85%;
    height: 120px;
    position: fixed;
    top: 80px;
    left: 240px;
    background: rgba(250, 250, 250, 0.5);
    opacity: 0.8;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .childsuspend {
      display: inline-block;
      // width:100px;
      // height:50px;
      // background-color: #278df6;
      margin: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      button {
        color: #fff;
      }
      .tooltip {
        position: absolute;
        top: 140%;
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
  }
}
//   图表子元素的flex排列方式
.el-tab-pane.clearfix .box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.el-tab-pane.clearfix .box::after {
  content: " ";
  width: 30%;
}
.el-tab-pane.clearfix .box .el-button {
  min-width: 108px;
  width: 30%;
  height: 29px;
  margin-bottom: 6px;
  border: 0;
  outline: 0;
}
.el-tab-pane.clearfix .box .el-button + .el-button {
  margin-left: 0px;
}
.container {
  width: @width-container;
  margin: 0 auto;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 40px;
  // .dashboardtemplate {
  //   width: @width-containerContent;
  //   margin: 0 auto;
  //   border: 1px solid #ddd;
  //   position: relative;
  //   // top: -40px;
  //   z-index: 2;
  //   background: #fff;
  //   border-radius: 10px;
  //   min-height: 200px;
  // }
  .dashboardtemplate {
    position: relative;
    top: -100px;
    left: 0;
    border: 1px solid;
    // width: 100%;
    width: @width-containerContent;
    height: 600px;
    margin: 0 auto;
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
}
.addelement {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
}
</style>
