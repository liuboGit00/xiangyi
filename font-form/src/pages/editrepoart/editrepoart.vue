<template>
  <div class="page" v-cloak>
      <div class="emptyformgroup">
        <el-button type="primary" size="mini" @click="preview">预览</el-button>        
        <el-button type="primary" size="mini" @click="savetemplate">保存</el-button>
        <el-button type="primary" size="mini" @click="publics">发布</el-button>
        <div v-show="suspendflag" class="topsuspend">
            <!-- <div class="childsuspend" >
              <span class="iconfont icon-baocun" @click="choicesuspend"></span>
              <div class="tooltip">
              </div>   
            </div>
            <div class="childsuspend" >
              <span class="iconfont icon-shuaxin right" @click="choicesuspend"></span>
              <div class="tooltip">
              </div>   
            </div>
            <div class="childsuspend" >
              <span class="iconfont icon-shuaxin right" @click="choicesuspend"></span>              
              <div class="tooltip">
              </div>   
            </div>
            <div class="childsuspend" >
              <el-button  @click="choicesuspend" type="primary" icon="el-icon-edit">文本<i class="el-icon-caret-bottom"></i></el-button>
              <div class="tooltip">
              </div>   
            </div> -->
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
                        <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item,index)">{{item.reportFormsTitle}}</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="柱状图" name="second2" class="clearfix">
                      <span class="echartstype" id="reportform_3" @click="successforms('3')"><img src="@/assets/img/graphe_02.png" alt=""></span>
                      <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item,index)">{{item.reportFormsTitle}}</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="折线图" name="third2" class="clearfix">
                      <span class="echartstype" id="reportform_4" @click="successforms('4')"><img src="@/assets/img/graphe_03.png" alt=""></span>
                      <el-button v-for="(item,index) in itemsform" :key="index" type="primary" size="small" @click="successreportform(item,index)">{{item.reportFormsTitle}}</el-button>
                    </el-tab-pane>
                  </el-tabs>  
              </div>   
            </div>
            <!-- <div class="childsuspend" >
              <el-button  @click="choicesuspend" type="primary" icon="el-icon-edit">图表<i class="el-icon-caret-bottom"></i></el-button>
              <div class="tooltip">
              </div>   
            </div>
            <div class="childsuspend" >
              <el-button  @click="choicesuspend" type="primary" icon="el-icon-edit">表单<i class="el-icon-caret-bottom"></i></el-button>
              <div class="tooltip">
              </div>   
            </div> -->
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
                      <el-button type="primary"  v-for="(theme,index) in formthemelist" :key="index" @click="successtheme(theme,index)">{{theme.reportFormsTitle}}</el-button>
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

            <!-- <div class="childsuspend">
              <el-button @click="choicesuspend" type="primary" icon="el-icon-edit">主题<i class="el-icon-caret-bottom"></i></el-button>
              <div class="tooltip">
                  <div class="filter">
                      <div>
                        <label for="" style="color:black;">主题分类</label>
                        <el-select v-model="form.region" placeholder="主题分类">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </div>
                      <div>
                        <span class="el-icon-search"></span>
                        <span>搜索</span>
                      </div>
                  </div>  
                  <div class="filter-btn clearfix">
                      <el-button type="primary">主要按钮</el-button>
                      <el-button type="primary" class="middle">主要按钮</el-button>
                      <el-button type="primary">主要按钮</el-button>
                      <el-button type="primary">主要按钮</el-button>
                      <el-button type="primary" class="middle">主要按钮</el-button>
                      <el-button type="primary">主要按钮</el-button>
                  </div>
                  <div class="filter-img clearfix">
                      <div class="part"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                      <div class="part middle"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                      <div class="part"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                      <div class="part"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                      <div class="part middle"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                      <div class="part"><img src="@/assets/img/theme_01.png" alt=""><span>销售同比</span></div>
                  </div>
                  <div class="filter-foot">
                    <el-button type="primary" @click="savetheme">确定</el-button>
                    <el-button type="primary">取消</el-button>
                  </div>
              </div>   
            </div> -->
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
                <div class="graphe" :id="item.Graphid">
                    <span class="addcen el-icon-circle-plus" v-show="item.addGraphflag"  @click="addgraphe(item.Graphid,index)"></span>
                    <span class="delete iconfont icon-shanchu" v-show="item.deleteflag"></span>
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
      <div class="addelement" v-show="suspendflag"></div>
      <Dialog  :dialogOpt="dialogOpt" v-on:handlecancle-dialog="selectDialog" v-on:handlesure-dialog="submitDialog"></Dialog> 
  </div>
</template>

<script>
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  mounted() {
    this.ajaxshow();

    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
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
        width: "536px"
      },
      form: {
        region: ""
      },

      action: window.localStorage.getItem("baseURL") + "upload/image",
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
      items: []
    };
  },
  components: {
    Dialog
  },
  methods: {
    successreportform(obj, index) {
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
      //主题选择完毕
      this.suspendflag = false; //遮罩挂件层消失
      this.formthemelist = [];
      this.addgraphecontent(obj, 2);
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
        if ((res.data.status = "SUCCESS")) {
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
        this.suspendflag = false;
        this.fileList = [];
        this.addgraphecontent(
          response.data.serverURI + response.data.fileName,
          3
        );
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
      let html = $(".dashboardtemplate")
        .clone()
        .html();
      localStorage.setItem("reportsharereportshare", html);
      localStorage.setItem("items", JSON.stringify(this.items));
      window.open("#/reportpreview", "_blank");
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
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClick(tab, event) {
      this.itemsform = [];
    },
    addgraphe: function(moudulecode, index) {
      this.suspendflag = true;
      this.moduleCode = moudulecode;
      this.moduleCodeindex = index;
    },
    addtextcontent(obj) {
      //文本
      // obj.dataType=2;
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
          description: " ",
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
          dataType: "",
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
        self.items.forEach((obj, index) => {
          reportModules.reportModules.push({
            //header部分
            moduleCode: obj.headerid,
            dataType: 2,
            dataContent: obj.header
          });
          reportModules.reportModules.push({
            //info部分
            moduleCode: obj.Infoid,
            dataType: 2,
            dataContent: obj.info
          });
          reportModules.reportModules.push({
            //description部分
            moduleCode: obj.descriptionid,
            dataType: 2,
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
          }
          if (obj.dataType == 2) {
            reportModules.reportModules.push({
              moduleCode: obj.Graphid,
              dataType: 2,
              dataContent: obj.reportFormsTitle
            });
          }
          if (obj.dataType == 3) {
            reportModules.reportModules.push({
              moduleCode: obj.Graphid,
              dataType: 3,
              dataContent: obj.src
            });
          }
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
    },
    share() {
      this.selectDialog("发布");
    },
    savetemplate() {
      this.selectDialog("保存");
      // window.location.href=""
      // this.$router.push({ path: '/reportwatch' })
    },
    publics() {
      //发布
      this.publicsflag = true;
      this.selectDialog("保存"); //先保存然后在发布
      // this.selectDialog("发布");
    }
  }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
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
  //   .contents::after {
  //     content:"";
  //     width:"130px"
  //   // flex: auto;
  // }
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
        color: green;
        font-size: 50px;
        position: relative;
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
        }
      }
      .footer {
        // padding:15px 25px;
        position: relative;
        // flex:0.3;
        height: 22%;
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
          line-height: 25px;
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
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
        .filter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .filter-btn {
          display: flex;
          justify-content: space-between;
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

