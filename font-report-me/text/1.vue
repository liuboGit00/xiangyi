<template>
  <div class="page">
    <FormSelectGroup :module="'reportwatch'" class="search">
      <div class="underlinebtn">
        <el-button class="merge" type="primary" size="small" v-if="ismerge">取消合并</el-button>
        <el-button type="primary" size="small" @click="publics">合并</el-button>  
      </div>
    </FormSelectGroup>
    <DialogTemplateHtml/>
    <div class="container clearfix">  
      <div class="receivelist" @mouseover='showSuspend(item)' @mouseout="closeSuspend(item)" v-for="(item,index) in items" :key="index">
          <div class="list-top">
            <div>
              <span class="defaultitle" :class="[item.show?'active':'']">标题不超过十五个字</span>
              <span class="defaultitle" :class="[item.show?'active':'']">{{item.id}}</span>
              <span class="defaultitle" :class="[item.show?'active':'']">创建时间:2018-10-10 10:10</span>
              <span class="defaultitle" :class="[item.show?'active':'']"></span>
              <span class="multipletitle" v-if="item.show">
                <span class="line"></span>
                <CommonSuspend/>
              </span>
            </div>
            <div class="angle">
              <div class="obliqueangle">未发布</div> 
            </div>
            <div class="angle">
              <div class="obliquenext">已发布</div>
            </div>
             
              <!-- <div class="remark" :title="item.remark" v-if="angleshowflag">备注：{{item.remark}}</div> -->
          </div>
          <div class="combination" v-if="checkboxshow"><el-checkbox></el-checkbox></div>     
      </div>
      <div class="Paginator">
        <Paginator :paginatorOpts='paginatorOpt' />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FormSelectGroup from "@/common/formSelectGroup.vue"; //select选择组
import DialogTemplateHtml from "@/common/DialogTemplateHtml.vue"; //弹框
import Paginator from "@/common/paginator.vue";
import CommonSuspend from "@/common/commonSuspend.vue";
export default {
  data() {
    return {
      items: [],
      checkboxshow: false,
      // total: '',
      checkednumber: 1,
      ismerge: false,
      isshowSuspend: false
    };
  },
  components: {
    FormSelectGroup,
    DialogTemplateHtml,
    Paginator,
    CommonSuspend
  },
  created() {
    this.getShowData();
    this.initPaginatorOpt();
    this.suspendOption();
  },
  methods: {
    getShowData() {
      let obj = [
        { id: 1, username: 11, time: "2018-11-10 10:10" },
        { id: 1, username: 11, time: "2018-11-10 10:10" },
        { id: 1, username: 11, time: "2018-11-10 10:10" },
        { id: 1, username: 11, time: "2018-11-10 10:10" },
        { id: 1, username: 11, time: "2018-11-10 10:10" }
      ];
      obj.forEach(function(item) {
        item.ctime = true;
        item.show = false;
      });

      this.items = obj;
    },
    publics() {
      this.checkboxshow = !this.checkboxshow;
      this.ismerge = !this.ismerge;
      if (this.checkednumber > 0) {
        this.dialogs(); //先保存然后在发布
      }
    },
    showSuspend(item) {
      item.show = true;
      item.ctime = false;
    },
    closeSuspend(item) {
      item.show = false;
      item.ctime = true;
    },
    dialogs() {
      let confirmOptions = {
        type: "dialog", //warning
        title: "合并", //标题自定义显示内容
        show: true, //对话框显示标志位
        width: "500px", //对话框自定义宽度
        name: "Report-second", //区分对话框显示表单内容
        btnCancelText: "取消1", //取消按钮自定义显示内容
        btnSubmitText: "确定1", //确定按钮自定义显示内容
        btnSubmitFunction: function() {
          //保存按钮事件
          console.log("保存");
        },
        btnCancelFunction: function() {
          //取消按钮事件
          console.log("取消");
        }
      };
      this.$store.dispatch("setDialogModalOptions", confirmOptions);
    },
    initPaginatorOpt() {
      let paginatorOpt = {
        total: 50, //报告总条数
        currentPage: 1,
        paginatorFunction: function(page) {
          console.log(page);
        }
      };
      this.paginatorOpt = paginatorOpt;
    },
    suspendOption() {
      let suspendOption = {
        title:'备注'
      };
      this.$store.dispatch("setSuspendOptions", suspendOption);
    }
    

  }
};
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";
.page {
  .search {
    position: relative;
    z-index: 1;
    .underlinebtn {
      margin: 0 auto;
      width: @width-container;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #fff;
      .el-button{
        background-color: #4c65a4;
        border: none;
      }
    }
  }
  .Paginator {
    position: absolute;
    right: 30px;
    bottom: 7px;
  }
  width: 100%;
  overflow: auto;
  background-color: #f4f6f9;
  position: relative;
  .container {
    width: @width-container;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 40px;
    position: relative;
    background-color: #fff;

    .receivelist {
      cursor: pointer;
      min-width: 320px;
      min-height: 215px;
      width: 3.05rem;
      height: calc(3.05rem - 100px);
      margin: 17px 0px;
      margin-left: 42px;
      float: left;
      position: relative;
      overflow: visible !important;
      .list-top {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        background: linear-gradient(#5c73ac,#557ec1,rgba(78,137,214,0.84),rgba(64,158,255,0.5));
        padding-top: 57px;
        .defaultitle {
          overflow: hidden;
          line-height: 28px;
          display: inline-block;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 80%;
        }
        .active{
          transition: line-height 0.5s;
          line-height: 16px;
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
        .multipletitle {
          // border-top: 1px solid #666;
          padding-top: 10px;
          position: relative;
          bottom: 10px;
          display: inline-block;
          width: 100%;
          line-height: 30px;
          .line {
            margin-left: 40px;
            // padding-top: 10px;
            display: block;
            width: 245px;
            border: none;
            width: 1px;
            background-color: #fff;
            opacity: 0.66;
          }
        }
      }
    }
    .combination {
      position: absolute;
      bottom: -30px;
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
}
</style>
