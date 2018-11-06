<template>
  <div class="page">
    <div class="formGroup-search"></div>
    <!-- <FormSelectGroup  :module="'reportpublic'"></FormSelectGroup> -->
     <div class="container">
        <div class="container-content">
          <div class="underlinebtn">
          </div>
          <div class="report-list content-frame">
            <div class="receivelist" @mouseover='showSuspend(item)' @mouseout="closeSuspend(item)" v-for="(item,index) in lists" :key="index">
              <div class="list-top">
                <div>
                  <span class="defaultitle" :class="[item.show?'active':'']">{{item.templateName}}</span>
                  <span class="defaultitle" :class="[item.show?'active':'']">{{item.clientType == 1 ? 'pc端' : '移动端'}} {{item.showType == 1 ? '大屏' : '报告'}}</span>
                  <span class="multipletitle" v-if="item.show">
                    <span class="line" ></span>
                    <CommonSuspend :parentItem="item" @handClick-suspend="handClickSuspend"/>
                  </span>
                </div>
              </div>
              <div class="combination" v-if="checkboxshow"><el-checkbox></el-checkbox></div>     
            </div>
          </div>
          <div class="Paginator" v-if="total">
            <Paginator/>
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
import {
  GetMethod,
  DeleteMethod,
  PutMethod,
  PostMethod
} from "@/assets/js/Httpservice.js";
export default {
  mounted() {
    if(this.$route.query.clientType == 1){
      this.homeToList('1')
    }else if(this.$route.query.clientType == 2){
      this.homeToList('2')
    }else{
      this.initlist();
    }
  },
  data() {
    return {
      lists: [],
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 6
      },
      total: '',
      checkboxshow: false,
      checkednumber: 1,
      isshowSuspend: false
    };
  },
  components: {
    FormSelectGroup,
    DialogTemplateHtml,
    Paginator,
    CommonSuspend
  },
  methods: {
    homeToList(type){
      let _this = this;
      let param = {
        clientType: type,
        pageNum: _this.pagepation.pageNum,
        pageSize: 6
      };
      GetMethod("/report-templates", param, function(res) {
        _this.lists = res.data.data.list;
        _this.total = res.data.data.total   
        _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum);
      });
    },
    //悬浮icon图标按钮点击
    handClickSuspend(param) {
      console.log(param);
      let confirmOptions = {};
      switch (param.handleName) {
        case '备注信息':
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
        default:
          break;
      }
    },
    initlist() {
      let _this = this;
      let param = {
        pageNum: _this.pagepation.pageNum,
        pageSize: 6
      };
      GetMethod("/report-templates", param, function(res) {
        _this.lists = res.data.data.list;
        _this.total = res.data.data.total   
        _this.initPaginatorOpt(res.data.data.total, _this.pagepation.pageNum);
      });
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
          GetMethod("/report-templates", param, function(res) {
            _this.lists = res.data.data.list;
          })
        }
      };
      _this.$store.dispatch("setPaginatorOptions", paginatorOpt);
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
  height: calc(100% - 100px);
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
    }
    .report-list {
      width: 100%;
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
          padding-top: 40px;
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
    .Paginator {
      position: absolute;
      right: 30px;
      bottom: 24px;
    }
  }
}
</style>
