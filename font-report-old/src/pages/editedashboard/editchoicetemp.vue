<template>
  <div class="page">
        <div class="emptyformgroup"></div>
            <div class="underlinebtn">
                <span class="title">请选择模板</span>
                <div class="search">
                    <input type="text" v-model="searchtemplateId" @keydown="searchtemplate" placeholder="请输入模板名称">
                    <span class="icon el-icon-search"></span>
                </div>
            </div>
            <Scrollframe class="content-frame" :pagepation="pagepation" :isLastPage="isLastPage"  v-on:ajax-query="ajaxshow" >
                <div class="receivelist" v-for="(item,index) in items" :key="index" @mousedown="downtemplate"
                @click="clicktemplate(index,item)">
                    <div class="list-top" :style="{background:item.bgcolor}">
                        <span class="defaultitle" :title="item.templateName" v-if="angleshowflag" >{{item.templateName}}</span>
                        <span class="defaultitle" :title="item.remark" v-if="angleshowflag" >{{item.remark}}</span>
                        <span  class="multipletitle" v-if="!angleshowflag" v-for="(list,ind) in item.titleList" :key="ind">
                          {{list.templateName}}
                        </span>
                        <div class="angle" v-if="item.publishStatus">
                          <div class="obliqueangle">未发布</div>
                        </div> 
                        <!-- <div v-show="item.infochecked" class="infochecked">
                            <span class="el-icon-circle-check-outline"></span>
                        </div>                                          -->
                    </div>    
                </div>
            </Scrollframe>  
        <Dialog  :dialogOpt="dialogOpt" v-on:select-dialog="selectDialog"></Dialog>
  </div>
</template>

<script>
import FormSelectGroup from "@/components/formSelectGroup.vue"; //select选择组
// import CommonSuspend from "@/components/commonSuspend.vue"; //通用悬浮
import Scrollframe from "@/components/Scrollframe.vue"; //滚动下拉加载
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
      value1: [1, 4],
      dialogOpt: {
        dialogflag: false
      },
      suspendOpt: {
        position: "bottom", //遮罩部件在位置
        domClass: "list-top", //遮罩部件
        offsetbottom: "10%", //遮罩层距离底部的距离
        show: false //遮罩层是否显示控件
      },
      dialogVisible: false,
      searchtemplateId: "" //查询模板id
    };
  },
  components: {
    FormSelectGroup,
    Scrollframe,
    // CommonSuspend,
    Dialog
  },
  methods: {
    searchtemplate(e) {
      let self = this;
      if (e.keyCode == 13) {
        let param = { templateName: this.searchtemplateId, showType: 1 };
        server.reportlistsearch(param, function success(res) {
          let data = res.data.data;
          self.items = data.list == undefined ? [] : data.list;
        });
      }
    },
    clicktemplate: function(index, item) {
      let templateId = item.templateId;
      this.$set(this.items[index], "infochecked", true);
      this.$router.push({
        path: "/editedashboard",
        query: { templateId: templateId }
      });
    },
    downtemplate: function(el) {
      $(el.target)
        .find(".info")
        .css({ transition: "height .2s", height: "100%" });
    },
    ajaxshow: function(message) {
      this.$emit("typeShow", true);
      //ajax请求数据
      let self = this;
      self.isLastPage = true; //在请求数据期间避免重复加载
      self.pagepation = message ? message : this.pagepation; //翻页
      self.serverobject.pagepation = this.pagepation; //翻页配置
      message["showType"] = 1; //大屏模板列表获取
      server.reportlisttemplate(message, function success(res) {
        self.$emit("typeShow", false);
        //接口请求
        let data = res.data.data;
        self.items = self.items.concat(data.list);
        self.isLastPage = data.isLastPage; //是否最后一页
      });
    },
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
          dialogflag: true,
          title: message
        };
      }
    },
    share: function() {
      this.dialogVisible = true;
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
.emptyformgroup {
  background: #4b63a7;
  margin-left: -40px;
  margin-right: -40px;
  margin-top: -30px;
  height: 120px;
  padding-left: 40px;
  padding-right: 60px;
}
.underlinebtn {
  justify-content: space-between;
  margin-top: -40px;
  button[type="button"] {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
  .title {
    font-size: 24px;
    color: #1f1f1f;
  }
  .search {
    border-radius: 50%;
    position: relative;
    input {
      border-radius: 20px;
      height: 30px;
      outline: none;
      padding-left: 40px;
      border: 1px solid #ddd;
    }
    span {
      position: absolute;
      left: 10px;
      top: 5px;
      font-size: 20px;
    }
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
</style>
