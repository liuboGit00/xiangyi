<template>
  <div class="page">
    <!-- <div class="formGroup-search"></div> -->
    <FormSelectGroup  :module="'reportwatch'" v-on:submit-query="submitInfo" ref="formSelectGroup"></FormSelectGroup>
     <div class="container">
        <div class="container-content">
          <div class="underlinebtn">
            <el-button class="merge" type="primary" size="small" v-show="ismerge" @click="cancelMerge">取消合并</el-button>
            <el-button type="primary" size="small"  @click="merge">合并</el-button>  
          </div>
          <div class="report-list content-frame">
            <div class="receivelist" @mouseover='showSuspend(item)' @mouseout="closeSuspend(item)" v-for="(item,index) in lists" :key="index">
              <div class="list-top" :class="{'enter':item.show}">
                <span class="defaultitle title">{{item.reportTitle}}</span>
                <span class="defaultitle">{{item.clientType == 1 ? 'pc端' : '移动端'}} {{item.showType == 1 ? '大屏' : '报告'}}</span>
                <span class="defaultitle">创建时间：{{item.createTime | dataformat}}</span>
                <span class="defaultitle" v-if="item.publishStatus">发布时间：{{item.publishTime | dataformat}}</span>
                <div class="angle" v-if="item.publishStatus == 0">
                  <div class="obliqueangle">未发布</div> 
                </div>
                <div class="angle" v-if="item.publishStatus == 1">
                  <div class="obliquenext">已发布</div>
                </div>
              </div>
              <CommonSuspend class="multipletitle" v-show="item.show" :parentItem="item" @handClick-suspend="handClickSuspend"/>
              <div class="combination" v-if="checkboxshow"><el-checkbox v-model="item.checked" @change="changecombination(item)"></el-checkbox></div>     
            </div>
          </div>
          <div class="Paginator">
            <Paginator v-if="paginatorOpts.total"/>
          </div>
        </div>
        <DialogTemplateHtml />
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FormSelectGroup from "@/common/formSelectGroup.vue"; //select选择组
import DialogTemplateHtml from "@/common/DialogTemplateHtml.vue"; //弹框
import Paginator from "@/common/paginator.vue";
import CommonSuspend from "@/common/commonSuspend.vue";
import { Tool } from "@/assets/js/Tool.js"; //所有工具方法"
import {
  GetMethod,
  DeleteMethod,
  PutMethod,
  PostMethod
} from "@/assets/js/Httpservice.js";
export default {
  created() {
    this.initPaginatorOpt();
  },
  mounted(){
    if(this.$route.query.pc == 1){   //判断是从首页跳过来的
      this.homeToList('1')
    }else if (this.$route.query.modile == 1){
      this.homeToList('2')
    }else{
      this.initlist();
    }
  },
  data() {
    return {
      lists: [],   //展示列表
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 6
      },
      total: 0, //用于放数据总量  分页使用
      checkboxshow: false,
      checkednumber: 0,
      reports: [], //用于勾选报告的集合
      reportshowtype: [], //用于判断是否可以合并
      reportIdlists: [],  //报告id用于合并
      ismerge: false,    //是否展示取消合并按钮
    };
  },
  components: {
    FormSelectGroup,
    DialogTemplateHtml,
    Paginator,
    CommonSuspend
  },
  computed: {
    paginatorOpts() {
      //获取总条数用
      return this.$store.state.paginatorOptions;
    }
  },
  methods: {
    homeToList(type){   //首页跳过来重新查询pc列表
      let _this = this;
      let param = {
        clientType: type,
        pageNum: 1,
        pageSize: 6
      };
      GetMethod("/reports", param, function(res) {
        _this.lists = res.data.data.list;
        _this.total = res.data.data.total  //记录total
        _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum);
      });
    },
    initlist() {
      let _this = this;
      let param = {
        pageNum: _this.pagepation.pageNum,
        pageSize: 6
      };
      GetMethod("/reports", param, function(res) {
        _this.lists = res.data.data.list;
        _this.total = res.data.data.total  //记录total
        _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum);
      });
    },
    initCheckedStatus() {
      this.ismerge = false;
      this.checkboxshow = false;
      this.checkednumber = 0;
      this.reportshowtype = [];
      this.reportIdlists = [];
      this.reports.forEach(function(item) {
        item.checked = false;
      });
      this.reports = []; //清空勾选的报告集合
      this.reportshowtype = [];  //清空用于判断是否可合并数组
    },
    //悬浮icon图标按钮点击
    handClickSuspend(param) {
      let _this = this,
          confirmOptions = {};
      console.log(param);
      switch (param.handleName) {
        case "编辑报告":
          break;
        case "删除":
          Tool.prompt("您好， 是否确定删除此报告？", function success(res) {
            let reportId = param.reportId;
            DeleteMethod("reports/", reportId, function() {
              //重新请求
              _this.initlist();
            });
          });
          break;
        case "修改信息":
          confirmOptions = {
            type: "dialog", //warning
            title: "修改信息", //标题自定义显示内容
            show: true, //对话框显示标志位
            width: "500px", //对话框自定义宽度
            name: "Report-modify", //区分对话框显示表单内容
            btnCancelText: "取消", //取消按钮自定义显示内容
            btnSubmitText: "确定", //确定按钮自定义显示内容
            isShowFoot: true,
            item: param, //传给弹框的报告信息
            btnSubmitFunction: function(formdata) {
              //保存按钮事
              console.log(formdata);
              let parmas = {
                remark: formdata.remark,
                reportId: param.reportId,
                reportTitle: formdata.reportTitle
              };
              PutMethod("reports", parmas, function(res) {
                //回显信息
                _this.initlist();
              });
            },
            btnCancelFunction: function() {
              //取消按钮事件
              console.log("取消");
            }
          };
          this.$store.dispatch("setDialogModalOptions", confirmOptions);
          break;
        case "备注信息":
          confirmOptions = {
            type: "dialog", //warning
            title: "备注", //标题自定义显示内容
            show: true, //对话框显示标志位
            width: "500px", //对话框自定义宽度
            name: "Watch-remark", //区分对话框显示表单内容
            btnCancelText: "取消", //取消按钮自定义显示内容
            btnSubmitText: "确定", //确定按钮自定义显示内容
            isShowFoot: false,
            content: param.remark,
            btnSubmitFunction: function() {
              //保存按钮事件
              console.log("保存111");
            },
            btnCancelFunction: function() {
              //取消按钮事件
              console.log("取消");
            }
          };
          this.$store.dispatch("setDialogModalOptions", confirmOptions);
          break;
        case "回复信息":
          //重新调publish接口
          let Info = {
            reportId: param.reportId,
            pageNum: 1,
            pageSize: 6
          };
          GetMethod("report-publishing/publishing", Info, function(res) {
            console.log(res)
            confirmOptions = {
            type: "dialog", //warning
            title: "回复信息", //标题自定义显示内容
            show: true, //对话框显示标志位
            width: "604px", //对话框自定义宽度
            name: "Replay-Info", //区分对话框显示表单内容
            btnCancelText: "取消", //取消按钮自定义显示内容
            btnSubmitText: "确定", //确定按钮自定义显示内容
            isShowFoot: false,
            content: res.data.data.list,
            total: res.data.data.total,
            reportId: param.reportId,  //区分是哪个报告
            btnSubmitFunction: function() {
              //保存按钮事件
              console.log("保存111");
            },
            btnCancelFunction: function() {
              //取消按钮事件
              console.log("取消");
              //重新重置分页
              _this.initPaginatorOpt(_this.total, _this.pagepation.pageNum);
            }
          };
          _this.$store.dispatch("setDialogModalOptions", confirmOptions);
          });
          break;
        default:
          break;
      }
    },
    changecombination(item){    //勾选框
      //复选框发生change事件。
      if (item.checked) {
        this.checkednumber++;
        this.reports.push(item);
        this.reportIdlists.push(item.reportId); //报告id用于合并
        this.reportshowtype.push(item.showType); //报告类型用于判断是否可以合并
      } else {
        this.checkednumber--;
        this.reports.forEach((obj, index) => {
          if (obj.reportId == item.reportId) {
            this.reports.splice(index, 1);
            this.reportshowtype.splice(index, 1);
            this.reportIdlists.splice(index, 1);
          }
        });
      }
    },
    merge() {
      //合并
      let _this = this;
      let flag = true;   //区分是否可以合并
      if (!(_this.checkednumber > 1)) {
        _this.ismerge = true;
        _this.checkboxshow = true;
      } else {
        _this.reportshowtype.forEach(function(item, index) {
          if(_this.reportshowtype[0] == item){
            flag = true
          }else{
            flag = false
            return
          }
        });
        if(flag){
          let confirmOptions = {
          type: "dialog", //warning
          title: "合并", //标题自定义显示内容
          show: true, //对话框显示标志位
          width: "500px", //对话框自定义宽度
          name: "merge", //区分对话框显示表单内容
          btnCancelText: "取消", //取消按钮自定义显示内容
          btnSubmitText: "确定", //确定按钮自定义显示内容
          isShowFoot: true,
          btnSubmitFunction: function(formdatas) {
            //保存按钮事件
            console.log(formdatas);
            let parmas = {}
            let oldReportArr = [];
            let oldReportObj = {}
            _this.reports.forEach(function(item,index){
              oldReportObj.templateCode = item.templateCode
              oldReportObj.reportId = item.reportId
              oldReportArr.push(oldReportObj)
            })

            parmas.oldReportIds = JSON.stringify(oldReportArr)
            parmas.remark = formdatas.remark
            parmas.reportTitle = formdatas.reportTitle
            parmas.templateId =  _this.reports[0].templateId

            console.log(parmas)
            PostMethod("reports/merger", parmas, function(res) {
              _this.initCheckedStatus();
              _this.initlist();
            });
          },
          btnCancelFunction: function() {
            //取消按钮事件
            console.log("取消");
          }
        };
        this.$store.dispatch("setDialogModalOptions", confirmOptions);
        }else{
          Tool.prompt("不同模板的报告不可以合并", function success(res) {
          });
        }
      }
    },
    cancelMerge(){
      this.initCheckedStatus();
    },
    showSuspend(item) {
      this.$set(item, "show", true);
    },
    closeSuspend(item) {
      this.$set(item, "show", false);
    },
    initPaginatorOpt(total, pageNum) {
      //分页重置
      let _this = this;
      let paginatorOpt = {
        total: total, //报告总条数
        currentPage: Number(pageNum),
        paginatorFunction: function(page) {
          _this.pagepation.pageNum = page  //保存当前页码
          let param = {
            pageNum: page,
            pageSize: 6
          }
          GetMethod("/reports", param, function(res) {
            _this.lists = res.data.data.list;
          })
        }
      };
      _this.$store.dispatch("setPaginatorOptions", paginatorOpt);
    },
    submitInfo(formobj){    //查询选择组返回
      console.log(formobj)
      let _this = this;
        let init = {
          pageNum: 1,
          pageSize: 6
        };
        let param = Object.assign(init, formobj);
        GetMethod("/reports", param, function(res) {
          _this.total = res.data.data.total  //记录total
          _this.initPaginatorOpt(res.data.data.total, '1'); //重置分页组件
          _this.lists = res.data.data.list;
        });       
    }
  },
  filters: {
    dataformat: function(value) {
      if (!value) return "";
      value = value.toString();
      return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";
.page {
  width: 100%;
  overflow: auto;
  background-color: #f4f6f9;
  position: relative;
}
.formGroup-search {
  height: @height-formselectgroup;
  display: flex;
  align-items: center;
  background-color: #4c65a4;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 64px;
  justify-content: center;
}
.container {
  width: @width-container;
  height: calc(100% - 120px);
  margin: 0 auto;
  text-align: center;
  // border: 1px solid #ddd;
  padding: 0 40px;
  .container-content {
    width: 1046px;
    height: calc(100% + 40px);
    margin: 0 auto;
    // border: 1px solid #ddd;
    position: relative;
    top: -40px;
    z-index: 2;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 22px;
    .underlinebtn {
      padding: 0;
      button {
        background-color: #4c65a4;
        border: solid #4c65a4;
        padding: 3px 12px;
      }
    }
    .report-list {
      width: 100%;
      padding-bottom: 20px;
      border-radius: 0 0 10px 10px;
      background-color: #ffffff;
      display: flex;
      flex-wrap: wrap;
      margin-top: 17px;
      justify-content: space-between;
      .receivelist {
        cursor: pointer;
        width: 320px;
        height: 215px;
        // margin: 17px 0px 0px 0;
        margin-bottom: 30px;
        position: relative;
        overflow: visible !important;
        background: linear-gradient(
          #5c73ac,
          #557ec1,
          rgba(78, 137, 214, 0.84),
          rgba(64, 158, 255, 0.5)
        );
        .list-top {
          transition: all 0.2s;
          position: relative;
          top: 0;
          width: 100%;
          height: 100%;
          color: #ffffff;
          font-size: 16px;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          align-items: center;
          padding-top: 60px;
          .defaultitle {
            overflow: hidden;
            line-height: 28px;
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            width: 80%;
            &.title{
              font-size: 16px;
            }
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
        .list-top.enter {
          height: calc(100% - 63px);
          padding-top: 50px;
          padding-bottom: 8px;
          font-size:14px;
        }
        .combination {
          text-align: center;
          line-height: 30px;
          position: absolute;
          bottom: -30px;
          width: 100%;
          .el-checkbox__inner {
            width: 16px;
            height: 16px;
            border: 1px solid;
          }
        }
      }
      // .check {
      //   margin: 17px 0px 22px 0;
      // }
    }
    .Paginator {
      position: absolute;
      right: 30px;
      bottom: 24px;
    }
  }
}
</style>
