<template>
  <div class="page">
        <div class="emptyformgroup">
          <div v-show="suspendflag" class="topsuspend">
              <div class="childsuspend">
                <el-button @click="choicesuspend" type="primary" icon="el-icon-edit">媒体<i class="el-icon-caret-bottom"></i></el-button>
                <div class="tooltip">
                    <el-tabs v-model="activeName" @tab-click="handleClick" stretch=true>
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
                      <!-- <el-tab-pane label="音频" name="second"><p style="color:black;">音频</p></el-tab-pane> -->
                      <!-- <el-tab-pane label="视频" name="third"><p style="color:black;">视频</p></el-tab-pane> -->
                    </el-tabs>  
                </div>   
              </div>
              <div class="childsuspend">
                <el-button @click="choicesuspend" type="primary" icon="el-icon-edit">图表<i class="el-icon-caret-bottom"></i></el-button>
                <div class="tooltip">
                    <el-tabs v-model="activeNametwo" @tab-click="handleClick" stretch=true>
                      <el-tab-pane label="饼状图" name="first2" class="clearfix">
                        <span class="echartstype" id="reportform_2" @click="successforms('2')"><img src="@/assets/img/graphe_01.png" alt=""></span>
                          <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item)">{{item.reportFormsTitle}}</el-button>
                      </el-tab-pane>
                      <el-tab-pane label="柱状图" name="second2" class="clearfix">
                        <span class="echartstype" id="reportform_3" @click="successforms('3')"><img src="@/assets/img/graphe_02.png" alt=""></span>
                        <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item)">{{item.reportFormsTitle}}</el-button>
                      </el-tab-pane>
                      <el-tab-pane label="折线图" name="third2" class="clearfix">
                        <span class="echartstype" id="reportform_4" @click="successforms('4')"><img src="@/assets/img/graphe_03.png" alt=""></span>
                        <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item)">{{item.reportFormsTitle}}</el-button>
                      </el-tab-pane>
                    </el-tabs>  
                </div>   
              </div>
              <div class="childsuspend">
                <el-button @click="choicesuspend" type="primary" icon="el-icon-edit">主题<i class="el-icon-caret-bottom"></i></el-button>
                <div class="tooltip">
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
                        <!-- <div>
                          <span class="el-icon-search"></span>
                          <span>搜索</span>
                        </div> -->
                    </div>  
                    <div class="filter-btn clearfix">
                       <el-button type="primary"  v-for="(theme,index) in formthemelist" :key="index" @click="successtheme(theme)">{{theme.reportFormsTitle}}</el-button>
                    </div>
                    <!-- <div class="filter-img clearfix">
                       <div class="part"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                       <div class="part middle"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                       <div class="part"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                       <div class="part"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                       <div class="part middle"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                       <div class="part"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                    </div> -->
                    <div class="filter-foot">
                      <el-button type="primary" @click="savetheme">确定</el-button>
                      <el-button type="primary">取消</el-button>
                    </div>
                </div>   
              </div>
          </div>
        </div>
        <div class="dashboardtemplate">
          <div class="aside top">
            <div class="template">
              <div class="templatelist"  id="regionReport_01">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_01')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>
              </div>
              <div class="templatelist"  id="regionReport_02">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_02')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>
              </div>
            </div>
            <div class="template double">
              <div class="templatelist" id="regionReport_03">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_03')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>
              </div>
            </div>
            <div class="template">
              <div class="templatelist" id="regionReport_04">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_04')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>
              </div>
              <div class="templatelist"  id="regionReport_05">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_05')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>
              </div>
            </div>
          </div>
          <div class="aside bot">
            <div class="template">
              <div class="templatelist" id="regionReport_06">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_06')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>                
              </div>
              <div class="templatelist" id="regionReport_07">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_07')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>                
              </div>
              <div class="templatelist" id="regionReport_08">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_08')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>                
              </div>
              <div class="templatelist" id="regionReport_09">
                <span class="addcen el-icon-circle-plus" @click="addgraphe('regionReport_09')"></span>
                <span class="delete iconfont icon-shanchu" v-show="deleteflag"></span>                
              </div>
            </div>
          </div>
          <div class="footbtn">
           <el-button type="primary" size="mini" @click="preview">预览</el-button>
           <el-button type="primary" size="mini" @click="savetemplate">保存</el-button>
           <el-button type="primary" size="mini" @click="publics">发布</el-button>
          </div>
        </div>
        <div class="addelement" v-show="suspendflag">
        </div>
        <Dialog  :dialogOpt="dialogOpt" v-on:handlecancle-dialog="selectDialog" v-on:handlesure-dialog="submitDialog"></Dialog> 
  </div>
  
</template>

<script>
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
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
      serverobject: server, //ajax服务
      suspendflag: false, //遮罩层是否显示
      dialogOpt: {
        //对话框配置
        dialogflag: false,
        width: "536px"
      },
      form: {
        region: ""
      },

      action: window.localStorage.getItem("baseURL") + "upload/image",
      fileList: [], //文件上传数组
      itemsform: [], //图表查询结果展示
      moduleCode: "", //模板区域模块id
      activeName: "first",
      activeNametwo: "first2",
      deleteflag: false //删除按钮是否显示
    };
  },
  components: {
    Dialog
  },
  methods: {
    successtheme(obj) {
      //主题选择完毕
      this.suspendflag = false; //遮罩挂件层消失
      let html =
        "<span class='formcontent' style='display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>" +
        obj.reportFormsTitle +
        "</span>";
      this.addgraphecontent(html, ".formcontent", 2);
    },
    themechange() {
      //主题下拉框改变查询对应的列表
      let self = this;
      let params = { themeId: this.themevalue };
      server.reportforms(params, function success(res) {
        //接口请求、
        if ((res.data.status = "SUCCESS")) {
          self.formthemelist = res.data.data.list;
        }
      });
    },
    queryreporttheme() {
      //获取主题下拉框内容
      let self = this;
      server.reportformstheme("", function success(res) {
        //接口请求、
        if ((res.data.status = "SUCCESS")) {
          res.data.data.list.forEach(function(obj, index) {
            self.reportthemelist.push({
              value: String(obj.themeId),
              label: obj.themeName
            });
          });
        }
      });
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
        .find(dom)
        .on("mouseover mouseout", function(event) {
          if (event.type == "mouseover") {
            $(this)
              .offsetParent()
              .find(".delete")
              .css({ display: "block" });
          } else {
            $(this)
              .offsetParent()
              .find(".delete")
              .css({ display: "none" });
          }
        });
    },
    successreportform(obj) {
      this.suspendflag = false; //遮罩挂件层消失
      let html =
        "<span class='formcontent' style='display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>" +
        obj.reportFormsTitle +
        "</span>";
      this.addgraphecontent(html, ".formcontent", 1, obj.reportFormsCode);
    },
    successforms(type) {
      //报表类型选择完毕
      let self = this,
        params = { formsType: type };
      server.reportforms(params, function success(res) {
        //接口请求、
        if ((res.data.status = "SUCCESS")) {
          $("#reportform_" + type).css({ display: "none" });
          self.itemsform = res.data.data.list;
        }
      });
    },
    successfulupload(response, file, fileList) {
      //上传图片成功
      if (response.status == "SUCCESS") {
        this.suspendflag = false;
        this.fileList = [];
        let html =
          "<img width='100%' height='100%' src=" +
          response.data.serverURI +
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
      let html = $(".dashboardtemplate")
        .clone()
        .html();
      localStorage.setItem("share", html);
      window.open("#/dashboardpreview", "_blank");
    },
    publics() {
      //发布
      this.publicsflag = true;
      this.selectDialog("保存"); //先保存然后在发布
      // this.selectDialog("发布");
    },
    savetemplate() {
      //保存
      this.selectDialog("保存");
    },
    savetheme() {
      //保存主题
      this.suspendflag = false;
    },
    choicesuspend(el) {
      //遮罩层挂件点击
      $(".tooltip").css("display", "none");
      $(el.target)
        .offsetParent()
        .find(".tooltip")
        .css("display", "block");
      this.queryreporttheme();
    },

    handleClick(tab, event) {
      this.itemsform = [];
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
          title: message //根据title决定弹窗页面内容。
        };
      }
    },
    submitDialog: function(message, type, formdata) {
      //对话框保存(formdata为对话框表单对象)
      let self = this;
      formdata["templateId"] = self.templateId;
      if (self.publicsagainflag) {
        //点击发布
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
        server.reportpublish(nweparam, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false; //弹窗取消
            self.publicsagainflag = false;
            self.$router.push({ path: "/reportpublic" });
          }
        });
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
            datacontent = obj.lastChild.src;
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
        server.reportsave(params, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false;
            if (self.publicsflag) {
              self.selectDialog("发布");
              self.publicsagainflag = true;
              self.report.reportId = res.data.data.reportId;
            } else {
              self.$router.push({ path: "/reportwatch" });
            }
          }
        });
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
.emptyformgroup {
  background: #4b63a7;
  margin-left: -40px;
  margin-right: -40px;
  margin-top: -30px;
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
    position: absolute;
    width: 100%;
    height: 100%;
    // top: 40px;
    left: 0;
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
        display: none;
        padding: 20px;
        .echartstype {
          display: inline-block;
          width: 10%;
          float: left;
          img {
            width: 100%;
          }
        }
        .filter-btn {
          display: flex;
          justify-content: space-between;
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
