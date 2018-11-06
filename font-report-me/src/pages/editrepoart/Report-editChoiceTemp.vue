<template>
  <div class="page">
    <FormSelectGroup  :module="'Report-dashboardTemp'" @submit-query='submitQuery'></FormSelectGroup>
     <div class="container">
        <DialogTemplateHtml />
        <div class="dashtemp-header">
             <span>请选择模板</span>
             <!-- <el-button class="dashtemp-btn" type="primary" @click="handleDefineEdit">自定义编辑</el-button> -->
        </div>
        <div class="report-list content-frame">
          <div class="receivelist" @mouseover='triggerSuspend(item)' @mouseout="triggerSuspend(item)" 
            v-for="(item,index) in items" :key="index"
            @mousedown="downtemplate"
            @click="clicktemplate(index,item)">
            <div class="list-top">
              <div>
                <span class="defaultitle" :class="[item.show?'active':'']">{{item.templateName}}</span>
                <span class="defaultitle" :class="[item.show?'active':'']">{{item.remark}}</span>
                <span class="multipletitle" v-if="item.show">
                  <span class="line" ></span>
                  <CommonSuspend :parentItem="item" @handClick-suspend="handClickSuspend" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <Paginator class="paginator" v-if="total"/>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FormSelectGroup from "@/common/formSelectGroup.vue"; //select选择组
import DialogTemplateHtml from "@/common/DialogTemplateHtml.vue"; //对话框
import { GetMethod, PostMethod } from "@/assets/js/Httpservice.js"; //ajax请求
import { Tool } from "@/assets/js/Tool.js"; //所有工具方法"
import CommonSuspend from "@/common/commonSuspend.vue";
import Paginator from "@/common/paginator.vue";
export default {
  data() {
    return {
      items: [],
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 6
      },
      total: null
    };
  },
  components: {
    FormSelectGroup,
    DialogTemplateHtml,
    CommonSuspend,
    Paginator
  },
  mounted() {
    this.initList(); //初始化列表
  },
  methods: {
    //初始化列表
    initList() {
      let _this = this;
      _this.pagepation = Object.assign(_this.pagepation, { showType: 2 });
      GetMethod("report-templates", _this.pagepation, function(res) {
        _this.total = res.data.data.total
        _this.items = res.data.data.list;
        _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum);
      });
    },
    //翻页
    initPaginatorOpt(totals, currentPages) {
      let _this = this;
      let paginatorOpt = {
        total: totals, //报告总条数
        currentPage: currentPages,
        paginatorFunction: function(page) {
          _this.pagepation.pageNum = page;
          let param = {
            showType: 2,
            pageNum: page,
            pageSize: 6
          }
          GetMethod("report-templates", param, function(res) {
            _this.total = res.data.data.total
            _this.items = res.data.data.list;
            _this.initList();
          });
        }
      };
      this.$store.dispatch("setPaginatorOptions", paginatorOpt);
    },
    //悬浮icon图标按钮点击
    handClickSuspend(items) {
      let _this = this
      let confirmOptions = {
        title: "备注信息", //标题自定义显示内容
        show: true, //对话框显示标志位
        name: "Report-second", //区分对话框显示表单内容
        item: items,
        // type: "dialog", //warning
        // width: "500px", //对话框自定义宽度
        //     btnCancelText: "取消1", //取消按钮自定义显示内容
        //     btnSubmitText: "确定1", //确定按钮自定义显示内容
        // btnSubmitFunction: function(form) {
        // console.log("保存");
        // },
        btnCancelFunction: function() {
          console.log("取消");
          _this.initPaginatorOpt(_this.total, _this.pagepation.pageNum);
        }
      };
      this.$store.dispatch("setDialogModalOptions", confirmOptions);
    },
    //悬浮icon图标显示/隐藏
    triggerSuspend(item) {
      this.$set(item, "show", !(item.show ? item.show : false));
    },
    clicktemplate: function(index, item) {
      let templateId = item.templateId;
      this.$set(this.items[index], "infochecked", true);
      this.$router.push({
        path: "/Report-editRepoart",
        query: { templateId: templateId }
      });
    },
    downtemplate: function(el) {
      $(el.target)
        .find(".info")
        .css({ transition: "height .2s", height: "100%" });
    },
    //顶部列表查询条件
    submitQuery(formSearch) {
      let _this = this;
      _this.pagepation.pageNum = 1;
      //清除上一次的查询字段
      if (JSON.stringify(formSearch) !== "{}") {
        _this.pagepation = Object.assign(formSearch, _this.pagepation);
      } else {
        for (let key in _this.pagepation) {
          if (key !== "pageNum" && key !== "pageSize") {
            delete _this.pagepation[key];
          }
        }
      }
      this.initList();
    },
    // handleDefineEdit() {
    //   this.$router.push({
    //     path: "/Report-dashboardTempDefine",
    //     // query: {
    //     //   templateId: this.reportsindex.templateId,
    //     //   reportId: this.reportsindex.reportId
    //     // }
    //   });
    // }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variable.less";
.page {
  // position: relative;
  // bottom:0;
  width: 100%;
  overflow: auto;
  background-color: #f4f6f9;
}
.container {
  width: @width-containerContent;
  height: calc(100% - 80px);
  // height:100%;
  // height: calc(100% + 40px);
  margin: 0 auto;
  border: 1px solid #ddd;
  position: relative;
  // top: -40px;
  margin-top: -40px;
  background: #fff;
  border-radius: 10px;
  min-height: 200px;
  .paginator{
    position: absolute;
    right: 0;
    bottom: 10px;
  }
}
.dashtemp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #cccccc;
  height: 40px;
  padding: 0 20px;
  span {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #1f1f1f;
  }
  .dashtemp-btn {
    width: 90px;
    height: 26px;
    background-color: #4c65a4;
    border-radius: 4px;
    padding: 0;
  }
}
.report-list {
  width: 100%;
  padding: 0 22px;
  padding-bottom: 20px;
  // border: 1px solid #ddd;
  border-radius: 0 0 10px 10px;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  .receivelist {
    cursor: pointer;
    min-width: 320px;
    min-height: 215px;
    width: 3.05rem;
    height: calc(3.05rem - 100px);
    margin: 17px 0px 0px 0;
    position: relative;
    overflow: visible !important;
    .list-top {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 16px;
      background: linear-gradient(
        #5c73ac,
        #557ec1,
        rgba(78, 137, 214, 0.84),
        rgba(64, 158, 255, 0.5)
      );
      padding-top: 27px;
      .multipletitle {
        .line {
          display: block;
          border: none;
          height: 1px;
          background-color: #fff;
          margin-left: 40px;
          width: 245px;
          opacity: 0.66;
          margin-top: 60px;
          margin-bottom: 10px;
        }
      }
      .defaultitle {
        overflow: hidden;
        line-height: 28px;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
      }
      .active {
        transition: line-height 0.5s;
      }
      .angle {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        overflow: hidden;
      }
    }
    .combination {
      position: absolute;
      bottom: -35px;
      left: 50%;
      text-align: center;
      line-height: 30px;
      .el-checkbox__inner {
        width: 16px;
        height: 16px;
        border: 1px solid;
      }
    }
  }
  .check {
    margin: 17px 0px 22px 0;
  }
}
</style>
