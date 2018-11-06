<template>
  <div class="page">
    <div class="emptyformgroup">
      <el-button type="primary" size="mini" @click="preview">预览</el-button>        
      <el-button type="primary" size="mini" @click="savetemplate">保存</el-button>
      <!-- <el-button type="primary" size="mini" @click="publics">发布</el-button> -->
      <div v-show="suspendflag" class="topsuspend">
          <div class="childsuspend">
            <el-button @click="choicesuspend('media')" type="primary" icon="el-icon-edit">媒体<i class="el-icon-caret-bottom"></i></el-button>
            <div class="tooltip"  v-show="mediashowflag">
                <el-tabs v-model="activeName" @tab-click="handleClick" stretch=true>
                  <el-tab-pane label="图片" name="first">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :action="actions"
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
                  <el-tabs v-model="activeNametwo" @tab-click="handleClick" stretch=true>
                    <el-tab-pane label="分组表" name="first2" class="clearfix">
                        <div class="box">
                          <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item)"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="垂直柱状图" name="second2" class="clearfix">
                        <div class="box">
                          <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item)"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>                            
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="水平柱状图" name="third2" class="clearfix">
                        <div class="box">
                          <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item)"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>                             
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="折线图" name="four2" class="clearfix">
                        <div class="box">
                          <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item)"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="饼图" name="five2" class="clearfix">
                        <div class="box">
                          <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item)"><span class="form-name" :title="item.reportFormsTitle">{{item.reportFormsTitle}}</span></el-button>                
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
                    <el-button type="primary"  v-for="(theme,index) in formthemelist" :key="index" @click="successtheme(theme,index)">{{theme.reportFormsTitle}}</el-button>
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
    <div class="dashboardtemplate">
        <!-- <div class="underlinehead">宁家鲜生数据分析</div> -->
      <div class="contents">
        <div class="lists templatelist" v-for="(item,index) in items" :key="index" :style="{'width':item.basewidth,'height':item.baseheight}">
          <div class="header">
            <span :style="{background:item.bgcolor}"></span>
            <input type="text" v-model="item.header" :id="item.headerid" @change="addtextcontent(item)">
            <input type="text" v-model="item.info" :id="item.Infoid" @change="addtextcontent(item)">
          </div>
          <div class="graphe" :id="item.Graphid" @mouseenter="entergraphe(item)" @mouseleave="leavegraphe(item)" >
              <span class="addcen el-icon-circle-plus" v-show="item.addGraphflag"  @click="addgraphe(item.Graphid,index)"></span>
              <span class="delete iconfont icon-shanchu" @click="deletegraphe(item)" v-show="item.deleteflag"></span>
              <img width="100%" height="100%" :src="item.src" alt="" v-show="item.imgflag" />
              <span class="formcontent" v-if="item.textflag">{{item.reportFormsTitle}}</span>
          </div>
          <div class="footer">
              <textarea v-model="item.description" :id="item.descriptionid"  @change="addtextcontent(item)"></textarea>
              <div class="scrollby">
                <span class="el-icon-arrow-up" ref="prev" @click="scrollpage"></span>
                <span class="el-icon-arrow-down" ref="next" @click="scrollpage"></span>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addelement" v-show="suspendflag" @click="hidesuspend"></div>
    <DialogTemplateHtml />
  </div>
  
</template>

<script type="text/ecmascript-6">
import DialogTemplateHtml from "@/common/DialogTemplateHtml.vue"
import {
  GetMethod,
  DeleteMethod,
  PutMethod,
  PostMethod
} from "@/assets/js/Httpservice.js";
export default {
  mounted() {
    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
    let self = this;
    if (self.$route.query.reportId) {
      self.ajaxshow();
      self.ajaxshowecho();
    } else {
      self.ajaxshow();
    }
  },
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
        width: "536px",
        disabled: false
      },
      form: {
        region: ""
      },

      action: window.localStorage.getItem("baseURL"),
      imgBaseURL: window.localStorage.getItem("imgBaseURL"),
      fileList: [], //文件上传数组
      itemsform: [], //图表查询结果展示
      moduleCode: "", //模板区域模块id
      moduleCodeindex: "", //模板区域模块id对应的index
      activeName: "first",
      activeNametwo: "first2",
      // deleteflag:false,   //删除按钮是否显示
      backgroundColor: [
        "linear-gradient(to top, #6a89d9,#4c65a4)",
        "linear-gradient(to top, #f56986,#c77081)",
        "linear-gradient(to top, #86e6d8,#59ada1)",
        "linear-gradient(to top, #56aea1,#50a194)"
      ],
      items: [],
      formsliststore: [], //图表选择集合
      echomodulecode: [], //编辑回显的数据
      mediashowflag: false, //添加顶部的层级显示
      themeshowflag: false,
      grapheshowflag: false
    };
  },
  computed: {
    actions() {
      return this.action + "upload/image";
    }
  },
  components: {
    DialogTemplateHtml
  },
  methods: {
    deletegraphe(item) {
      item.src = "";
      item.imgflag = false;
      item.deleteflag = false;
      item.addGraphflag = true;
      item.textflag = false;
      item.reportFormsTitle = "";
      item.dataType = null;
      this.formsliststore.forEach((obj, index) => {
        if (obj.moduleCode == item.Graphid) {
          this.formsliststore.splice(index, 1);
        }
      });
    },
    leavegraphe(item) {
      item.deleteflag = false;
    },
    entergraphe(item) {
      if (item.textflag || item.imgflag) {
        item.deleteflag = true;
      }
    },
    hidesuspend() {
      this.suspendflag = false;
      this.activeNametwo = "first2";
      this.successforms("1");
    },
    successreportform(obj, index) {
      this.formsliststore.push({
        dataType: 1,
        moduleCode: this.moduleCode,
        obj: obj
      }); //将添加的对象放到集合中

      this.suspendflag = false; //遮罩挂件层消失
      this.itemsform = [];
      this.addgraphecontent(obj, 1);
    },
    queryreporttheme() {
      //获取主题下拉框内容
      let self = this;
      server.reportformstheme("", function success(res) {
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
      });
    },
    successtheme(obj, index) {
      this.formsliststore.push({
        dataType: 1,
        moduleCode: this.moduleCode,
        obj: obj
      }); //将添加的对象放到集合中

      //主题选择完毕
      this.suspendflag = false; //遮罩挂件层消失
      this.formthemelist = [];
      this.addgraphecontent(obj, 1);
      //  this.suspendflag = false;    //遮罩挂件层消失
      //  let html="<span class='formcontent' style='display:flex;align-items: center;justify-content: center;width:100%;height:100%;background: rgba(21, 15, 15, 0.28);'>"+obj.reportFormsTitle+"</span>"
      //  this.addgraphecontent(html,".formcontent",2)
    },
    themechange() {
      //主题下拉框改变查询对应的列表
      let self = this;
      let params = { themeId: this.themevalue };
      server.reportforms(params, function success(res) {
        //接口请求、
        if (res.data.status == "SUCCESS") {
          self.formthemelist = res.data.data.list;
        }
      });
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
    addgraphecontent(obj, dataType) {
      //遮罩挂件选择完毕，添加模板区域模块内容
      // 1报表|2文本|3媒体
      if (dataType == 3) {
        //媒体图片
        this.items[this.moduleCodeindex]["src"] = obj;
        this.items[this.moduleCodeindex]["imgflag"] = true;
      }
      if (dataType == 1) {
        //报表图形
        this.items[this.moduleCodeindex]["reportFormsTitle"] =
          obj.reportFormsTitle;
        this.items[this.moduleCodeindex]["textflag"] = true;
        this.items[this.moduleCodeindex]["reportFormsCode"] =
          obj.reportFormsCode;
        this.items[this.moduleCodeindex]["imgflag"] = false;
      }
      if (dataType == 2) {
        //文本主题
        this.items[this.moduleCodeindex]["reportFormsTitle"] =
          obj.reportFormsTitle;
        this.items[this.moduleCodeindex]["textflag"] = true;
        this.items[this.moduleCodeindex]["imgflag"] = false;
      }
      this.items[this.moduleCodeindex]["addGraphflag"] = false;
      this.items[this.moduleCodeindex]["dataType"] = dataType;
    },
    successfulupload(response, file, fileList) {
      //上传图片成功
      if (response.status == "SUCCESS") {
        this.formsliststore.push({
          dataType: 3,
          moduleCode: this.moduleCode,
          obj: this.imgBaseURL + response.data.fileName
        }); //将添加的对象放到集合中

        this.suspendflag = false;
        this.fileList = [];
        this.addgraphecontent(this.imgBaseURL + response.data.fileName, 3);
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },

    scrollpage(el) {
      //上下滚动
      if (el.target.className == "el-icon-arrow-up") {
        el.target.parentElement.previousElementSibling.scrollBy(0, -10);
      } else {
        el.target.parentElement.previousElementSibling.scrollBy(0, 10);
      }
    },
    preview() {
      //预览
      localStorage.setItem(
        "formsliststore",
        JSON.stringify(this.formsliststore)
      );
      // let html = $(".dashboardtemplate")
      //   .clone()
      //   .html();
      // localStorage.setItem("reportshare", html);
      localStorage.setItem("items", JSON.stringify(this.items));
      window.open("#/reportpreview", "_blank");
    },
    savetheme() {
      //保存主题
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
    addgraphe: function(moudulecode, index) {
      this.suspendflag = true;
      this.moduleCode = moudulecode;
      this.moduleCodeindex = index;
    },
    addtextcontent(obj) {
      //文本
      this.formsliststore.push({
        dataType: "2",
        // moduleCode:this.moduleCode,
        obj: obj
      }); //将添加的对象放到集合中
    },
    ajaxshowecho() {
      let self = this;
      // debugger
      let params = self.$route.query.reportId;
      self.serverobject.reportmodulesearch(params, function success(respar) {
        if ((respar.data.status = "SUCCESS")) {
          // 1报表|2文本|3媒体
          self.echomodulecode = respar.data.data;
          respar.data.data.forEach((obj, index) => {
            //36
            self.items.forEach((objchild, indexchild) => {
              //9
              if (obj.dataType == 1) {
                if (objchild.Graphid == obj.moduleCode) {
                  // objchild.src = self.imgBaseURL+obj.dataContent;
                  objchild.reportFormsTitle = obj.dataContent;
                  objchild.textflag = true;
                  objchild.reportFormsCode = obj.reportFormsCode;
                  objchild.imgflag = false;
                  objchild.addGraphflag = false;
                  objchild.dataType = 1;
                  self.formsliststore.push({
                    dataType: "1",
                    moduleCode: obj.moduleCode,
                    obj: obj
                  }); //将添加的对象放到集合中
                }
              }
              if (obj.dataType == 2) {
                if (objchild.headerid == obj.moduleCode) {
                  objchild.header = obj.dataContent;
                  self.formsliststore.push({
                    dataType: "2",
                    obj: obj
                  }); //将添加的对象放到集合中
                }
                if (objchild.Infoid == obj.moduleCode) {
                  objchild.info = obj.dataContent;
                  self.formsliststore.push({
                    dataType: "2",
                    obj: obj
                  }); //将添加的对象放到集合中
                }
                if (objchild.descriptionid == obj.moduleCode) {
                  objchild.description = obj.dataContent;
                  self.formsliststore.push({
                    dataType: "2",
                    obj: obj
                  }); //将添加的对象放到集合中
                }
              }
              if (obj.dataType == 3) {
                if (objchild.Graphid == obj.moduleCode) {
                  objchild.imgflag = true;
                  objchild.src = self.imgBaseURL + obj.dataContent;
                  objchild.addGraphflag = false;
                  objchild.dataType = 3;
                  self.formsliststore.push({
                    dataType: "3",
                    moduleCode: obj.moduleCode,
                    obj: self.imgBaseURL + obj.dataContent
                  }); //将添加的对象放到集合中
                }
              }
            });
          });
        }
      });
    },
    ajaxshow: function(message) {
      //ajax请求数据
      let first = 0,
        second = 1,
        three = 2,
        basewidth = "auto",
        baseheight = "auto";
      for (let i = 0; i < 9; i++) {
        let n = i + 1;
        let bgcolor = this.backgroundColor, //定义的背景颜色集合
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
        basewidth = "3.5rem";
        baseheight = "calc(3.5rem - 100px)";
        if (i > 5) {
          basewidth = "100%";
          baseheight = "3.5rem";
        }
        if (i > 6) {
          basewidth = "5.28rem";
          baseheight = "5.28rem";
        }
        this.items.push({
          header: "",
          info: "",
          src: "",
          description: "",
          bgcolor: currentbgcolor,
          basewidth: basewidth,
          baseheight: baseheight,
          deleteflag: false,
          addGraphflag: true,
          imgflag: false,
          textflag: false,
          Graphid: "regionReportGraph_0" + n,
          Infoid: "regionReportInfo_0" + n,
          descriptionid: "regionReportdescri_0" + n,
          headerid: "regionReportHeader_0" + n,
          reportFormsTitle: "",
          dataType: null,
          reportFormsCode: ""
        });
      }
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
        server.reportpublish(nweparam, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.dialogOpt.dialogflag = false; //弹窗取消
            self.dialogOpt.disabled = false; //禁止多次点击
            self.publicsagainflag = false;
            self.$router.push({ path: "/reportpublic" });
          }
        });
      } else {
        //只点击保存
        self.report.reportTitle = formdata.reportTitle; //将报告主题保存到变量里面
        let report = {
          report: formdata
        };
        let reportModules = {
          reportModules: []
        };
        self.items.forEach((obj, index) => {
          reportModules.reportModules.push({
            //header部分
            moduleCode: obj.headerid,
            dataType: obj.header ? 2 : null,
            dataContent: obj.header
          });
          reportModules.reportModules.push({
            //info部分
            moduleCode: obj.Infoid,
            dataType: obj.info ? 2 : null,
            dataContent: obj.info
          });
          reportModules.reportModules.push({
            //description部分
            moduleCode: obj.descriptionid,
            dataType: obj.description ? 2 : null,
            dataContent: obj.description
          });
          // 1报表|2文本|3媒体
          if (obj.dataType == 1) {
            reportModules.reportModules.push({
              moduleCode: obj.Graphid,
              dataType: 1,
              dataContent: obj.reportFormsTitle,
              reportFormsCode: obj.reportFormsCode
            });
          } else if (obj.dataType == 2) {
            reportModules.reportModules.push({
              moduleCode: obj.Graphid,
              dataType: 2,
              dataContent: obj.reportFormsTitle
            });
          } else if (obj.dataType == 3) {
            reportModules.reportModules.push({
              moduleCode: obj.Graphid,
              dataType: 3,
              dataContent: obj.src.substr(obj.src.lastIndexOf("/") + 1)
            });
          } else {
            reportModules.reportModules.push({
              moduleCode: obj.Graphid,
              dataType: null,
              dataContent: obj.src.substr(obj.src.lastIndexOf("/") + 1)
            });
          }
        });
        let params = Object.assign(reportModules, report);
        server.reportsave(params, function success(res) {
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
        });
      }
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    share() {
      this.selectDialog("发布");
    },
    savetemplate() {
      let self = this;
      let html = $(".dashboardtemplate")
        .clone()
        .html();
      localStorage.setItem("reportshare", html);
      localStorage.setItem("items", JSON.stringify(this.items));

      if (this.$route.query.reportId) {
        //更新操作
        let reportModules = {
          reportModules: []
        };
        self.items.forEach((obj, index) => {
          self.echomodulecode.forEach(objchild => {
            if (obj.headerid == objchild.moduleCode) {
              reportModules.reportModules.push({
                //header部分
                reportModuleId: objchild.reportModuleId,
                dataType: obj.header ? 2 : null,
                dataContent: obj.header
              });
            }
            if (obj.Infoid == objchild.moduleCode) {
              reportModules.reportModules.push({
                //info部分
                reportModuleId: objchild.reportModuleId,
                dataType: obj.info ? 2 : null,
                dataContent: obj.info
              });
            }
            if (obj.descriptionid == objchild.moduleCode) {
              reportModules.reportModules.push({
                //description部分
                reportModuleId: objchild.reportModuleId,
                dataType: obj.description ? 2 : null,
                dataContent: obj.description
              });
            }
            if (obj.Graphid == objchild.moduleCode) {
              // 1报表|2文本|3媒体
              if (obj.dataType == 1) {
                reportModules.reportModules.push({
                  reportModuleId: objchild.reportModuleId,
                  dataType: 1,
                  dataContent: obj.reportFormsTitle,
                  reportFormsCode: obj.reportFormsCode
                });
              } else if (obj.dataType == 2) {
                reportModules.reportModules.push({
                  reportModuleId: objchild.reportModuleId,
                  dataType: 2,
                  dataContent: obj.reportFormsTitle
                });
              } else if (obj.dataType == 3) {
                reportModules.reportModules.push({
                  reportModuleId: objchild.reportModuleId,
                  dataType: 3,
                  dataContent: obj.src.substr(obj.src.lastIndexOf("/") + 1)
                });
              } else {
                reportModules.reportModules.push({
                  reportModuleId: objchild.reportModuleId,
                  dataType: null,
                  dataContent: obj.src.substr(obj.src.lastIndexOf("/") + 1)
                });
              }
            }
          });
        });
        server.reportupdate(reportModules.reportModules, function success(res) {
          //接口请求、
          if ((res.data.status = "SUCCESS")) {
            self.$router.push({ path: "/reportwatch" });
          }
        });
      } else {
        this.selectDialog("保存");
      }
    },
    publics() {
      //发布
      let html = $(".dashboardtemplate")
        .clone()
        .html();
      localStorage.setItem("reportshare", html);
      localStorage.setItem("items", JSON.stringify(this.items));
      this.publicsflag = true;
      this.publicsagainflag = false; //点击了发布，先出保存弹框在出发布
      this.selectDialog("保存"); //先保存然后在发布
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
// .formGroup-search {
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
// .container {
//   width: @width-container;
//   margin: 0 auto;
//   text-align: center;
//   padding-top: 30px;
//   padding-bottom: 40px;
//   border: 1px solid #ddd;
// }

.emptyformgroup {
  background: #4b63a7;
  margin-left: -40px;
  margin-right: -40px;
  margin-top: -30px;
  height: 120px;
  padding-left: 40px;
  padding-right: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .topsuspend {
    position: fixed;
    width: 85%;
    height: 120px;
    top: 80px;
    left: 240px;
    background: rgba(250, 250, 250, 0.5);
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
        .filter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
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
.dashboardtemplate {
  border: 1px solid #ddd;
  width: 100%;
  min-height: 600px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  margin-top: 10px;
  .underlinehead {
    height: 40px;
    font-size: 20px;
    margin-left: -9px;
    margin-right: -9px;
    color: #4b63a7;
    text-align: center;
    border-bottom: 1px dashed #ddd;
  }
  .contents {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .lists {
      border: 1px solid #eee;
      min-width: 320px;
      min-height: 215px;
      width: 3.05rem;
      height: calc(3.05rem - 100px);
      margin: 17px 0px;
      float: left;
      box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.09);
      padding-top: 10px;
      // width: 26%;
      // border: 1px solid #ddd;
      // margin-top:20px;
      // min-height: 300px;
      display: flex;
      flex-direction: column;
      // .childlists{
      .header {
        position: relative;
        padding-left: 10px;
        padding-right: 10px;
        span {
          display: block;
          font-size: 25px;
        }
        span:first-child {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 3px;
        }
        input {
          display: inline-block;
          width: 100%;
          font-size: 12px;
          color: #999999;
          border: 1px solid #eee;
        }
        input:nth-child(2) {
          font-size: 25px;
          color: #1f1f1f;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }
      }
      .graphe {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        // color: green;
        font-size: 18px;
        position: relative;
        .addcen {
          color: green;
          font-size: 50px;
          cursor: pointer;
        }
        .addcen:hover {
          color: #278df6;
        }
        .formcontent {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: rgba(21, 15, 15, 0.28);
        }
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
      }
      .footer {
        // padding:15px 25px;
        position: relative;
        // flex:0.3;
        height: 30%;
        border-top: 1px dashed #ddd;
        padding: 15px 35px 15px 25px;
        textarea {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          resize: none;
          border: 1px solid #eee;
          font-size: 12px;
          color: #999999;
          line-height: 18px;
          letter-spacing: 1px;
        }
        .scrollby {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          padding: 15px 10px 15px 0;
          span {
            cursor: pointer;
          }
        }
      }
      // }
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
