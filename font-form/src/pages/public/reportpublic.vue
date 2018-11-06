<template>
  <div class="page">
    <FormSelectGroup v-on:submit-query="submitshow" :module="'reportpublic'" /> 
    <CommonSuspend class="content-area" :suspendobj="suspendOpt" v-on:select-dialog="selectDialog">
      <div class="underlinebtn">
        <SwitchChange :switchOpt="switchOpt" v-on:switch-change="switchChange"/>
        <el-button type="primary" size="small" @click="share">发布</el-button>
      </div>
      <Scrollframe class="content-frame" :isLastPage="isLastPage"  v-on:ajax-query="ajaxshow" >
          <div class="receivelist" v-for="(item,index) in items" :key="index">
              <div class="list-top">
                  <span :title="item.reportTitle" v-if="angleshowflag">{{item.reportTitle}}</span>
                  <span  class="multipletitle" v-if="!angleshowflag" v-for="(list,ind) in item.titleList" :key="ind">
                    {{list.reportTitle}}
                  </span>
                  <div class="angle" v-if="angleshowflag">
                    <div class="obliqueangle">未发布</div>
                  </div>
              </div>    
          </div>
      </Scrollframe>
    </CommonSuspend>
    <Dialog  :dialogOpt="dialogOpt" v-on:select-dialog="selectDialog"></Dialog> 
  </div>
</template>

<script>
import FormSelectGroup from "@/components/formSelectGroup.vue"; //select选择组
import CommonSuspend from "@/components/commonSuspend.vue"; //通用悬浮
import Scrollframe from "@/components/Scrollframe.vue"; //滚动下拉加载
import SwitchChange from "@/components/switchChange.vue"; //模拟滑动开关
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  data() {
    return {
      //必须配置项
      isLastPage: false, //最后一页
      pagepation: {
        //翻页配置
        pageNum: 1,
        pageSize: 15
      },
      serverobject: server, //ajax服务
      items: [], //列表内容数据

      angleshowflag: true, //未发布左上角斜标
      value1: true,
      value2: true,
      // items: [],
      dialogOpt: {
        dialogflag: false
      },
      suspendOpt: {
        position: "bottom", //遮罩部件在位置
        domClass: "receivelist", //遮罩部件
        offsetbottom: "10%", //遮罩层距离底部的距离
        show: false //遮罩层是否显示控件
      },
      switchOpt: {
        //滑动开关组件
        width: "150px", //总宽度
        leftName: "全部", //左边开关的内容
        rightName: "已发布" //右边开关的内容
      }
    };
  },
  components: {
    FormSelectGroup,
    Scrollframe,
    CommonSuspend,
    Dialog,
    SwitchChange
  },
  mounted() {
    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
  },
  methods: {
    switchChange(message) {
      //开关切换组件
      //接收到的消息和开关的内容保持一致
      if (message == "全部") {
        this.angleshowflag = true;
      } else {
        //未发布
        this.angleshowflag = false;
      }
      this.items = [];
      this.ajaxshow();
    },
    share() {
      //报告发布
      this.selectDialog("发布");
    },
    ajaxshow: function(message) {
      //ajax请求数据
      let self = this;
      self.isLastPage = true; //在请求数据期间避免重复加载
      self.pagepation = message ? message : this.pagepation; //翻页
      self.serverobject.pagepation = this.pagepation; //翻页配置
      server.reportlist(message, function success(res) {
        //接口请求
        let data = res.data.data;
        self.items = self.items.concat(data.list);
        self.isLastPage = data.isLastPage; //是否最后一页
      });
    },

    // ajaxshow: function(message) {
    //   //ajax请求数据
    //   if (this.angleshowflag) {
    //     //全部
    //     for (let i = 0; i < 15; i++) {
    //       this.items.push({
    //         title: "报告" + Math.random(10000).toFixed(2),
    //         info: "六六实验室-子午",
    //         time: "2018-10-11"
    //       });
    //     }
    //   } else {
    //     //未发布
    //     for (let i = 0; i < 15; i++) {
    //       this.items.push({
    //         titleList: [
    //           { title: "报告" + Math.random(10000).toFixed(2) },
    //           { title: "报告" + Math.random(10000).toFixed(2) }
    //         ],
    //         info: "六六实验室-子午",
    //         time: "2018-10-11"
    //       });
    //     }
    //   }
    // },
    submitshow: function(message) {
      //列表查询条件提交
      this.pagepation = {
        //翻页重置
        pageNum: 1,
        pageSize: 15
      },
        this.ajaxshow(message);
    },
    selectDialog: function(message, type) {
      //弹窗打开/关闭（message为悬浮组件里的type字段）
      if (type) {
        //关闭弹窗
        this.dialogOpt.dialogflag = false;
      } else {
        //打开弹窗
        this.dialogOpt = {
          dialogflag: true, //根据flag决定弹窗是否出现
          title: message //根据title决定弹窗页面内容。
        };
      }
    }
  }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
.underlinebtn {
  justify-content: space-between;
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
    min-width: 320px;
    min-height: 215px;
    width: 3.05rem;
    height: calc(3.05rem - 100px);
    margin: 17px 0px;
    background-color: #f4f4f4;
    box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.09);
    float: left;
    position: relative;
    overflow: hidden;
    .list-top {
      width: 100%;
      height: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 2em;
      background: linear-gradient(#6886db, #4b63a7);
      padding-top: 50px;
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
      .multipletitle {
        display: inline-block;
        width: 100%;
        line-height: 30px;
      }
    }
  }
}
</style>
