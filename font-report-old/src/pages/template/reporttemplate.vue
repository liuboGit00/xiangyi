<template>
  <div class="page" v-cloak>
        <FormSelectGroup v-on:submit-query="submitshow" :module="'reporttemplate'">
          <div class="underlinebtn">
              <!-- <el-button type="primary" size="small" @click="share">分享</el-button> -->
          </div>      
        </FormSelectGroup>     
        <CommonSuspend class="content-area"  :suspendobj="suspendOpt" v-on:select-dialog="selectDialog">
              <Scrollframe class="content-frame" :pagepation="pagepation" :isLastPage="isLastPage"  v-on:ajax-query="ajaxshow" >
                  <div class="receivelist" v-for="(item,index) in items" :key="index">
                      <div class="list-top" @click="previewreport(item)" :style="{background:item.bgcolor}">
                          <!-- <span :title="item.templateName">{{item.templateName}}</span> -->
                      </div>    
                      <div class="list-bot">
                          <span :title="item.templateName">{{item.templateName}}</span>
                          <span :title="item.remark" style="margin-bottom:10%;">{{item.remark}}</span>
                      </div>    
                  </div>
              </Scrollframe>  
        </CommonSuspend>
        <Dialog  :dialogOpt="dialogOpt" v-on:select-dialog="selectDialog"></Dialog>
        <!-- <el-dialog
            title="分享"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <span>
                <el-transfer v-model="value1" :data="data"></el-transfer>
                <el-form ref="form" :model="form" label-width="80px" :style="elformstyle">
                  <el-form-item label="备注">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog> -->
  </div>
</template>

<script>
import FormSelectGroup from "@/components/formSelectGroup.vue"; //select选择组
import CommonSuspend from "@/components/commonSuspend.vue"; //通用悬浮
import Scrollframe from "@/components/Scrollframe.vue"; //滚动下拉加载
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };

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

      backgroundColor: [
        //颜色循环
        "linear-gradient(#6a89d9,#4c65a4)",
        "linear-gradient(#f56986,#c77081)",
        "linear-gradient(#86e6d8,#59ada1)"
      ],
      elformstyle: {
        width: "80%"
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      data: generateData(),
      value1: [1, 4],
      dialogOpt: {
        dialogflag: false
      },
      suspendOpt: {
        position: "middle", //遮罩部件在位置
        domClass: "list-top", //要绑定的dom
        show: false //是否显示挂件
      },
      dialogVisible: false
    };
  },
  components: {
    FormSelectGroup,
    Scrollframe,
    CommonSuspend,
    Dialog
  },
  mounted() {
    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
    this.ajaxshow();
  },
  methods: {
    previewreport(item) {
      //查看报告预览
      self = this;
      if (item.isMerger) {
        let templatename = JSON.parse(item.oldReportIds)[0].templateCode.split(
          "/"
        )[0];
        if (templatename == "dashboard") {
          localStorage.setItem("oldReportIds", item.oldReportIds);
          window.open("#/dashboardprevmultiple", "_blank");
        } else {
          localStorage.setItem("oldReportIds", item.oldReportIds);
          window.open("#/reportprevmultiple", "_blank");
        }
      } else {
        switch (item.templateCode) {
          case "dashboard/template_01": //大屏/模板类型1
            //  this.$router.push({path: "/editedashboard"})
            window.open("#/dashboardpreview?template=null", "_blank");
            break;
          case "report/template_01": //报告/模板类型1
            window.open("#/reportpreview?template=null", "_blank");
            // this.$router.push({path: "/editrepoart"})
            break;
          default:
            break;
        }
      }
    },
    ajaxshow: function(message) {
      this.$emit("typeShow", true);
      //ajax请求数据
      let self = this;
      self.isLastPage = true; //在请求数据期间避免重复加载
      this.pagepation = message ? message : this.pagepation; //翻页
      self.serverobject.pagepation = this.pagepation; //翻页配置
      server.reportlist(message, function success(res) {
        self.$emit("typeShow", false);
        //接口请求
        let data = res.data.data;
        self.items = data.list;
        self.isLastPage = data.isLastPage; //是否最后一页
        // self.limitchang = false;
        let first = 0,
          second = 1,
          three = 2;
        for (let i = 0; i < self.items.length; i++) {
          let bgcolor = self.backgroundColor, //定义的背景颜色集合
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
          self.items[i].bgcolor = currentbgcolor;
        }
      });
    },
    submitshow: function(message) {
      //列表查询条件提交
      this.pagepation = {
        //翻页重置
        pageNum: 1,
        pageSize: 15
      },
        this.items = [];
      let messages = Object.assign(message, this.pagepation);
      this.ajaxshow(messages);
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
[v-cloak] {
  display: none;
}
.content-frame {
  border-radius: 0 0 10px 10px;
  background-color: #ffffff;
  width: 100%;
  min-height: 300px;
  margin-top: 90px;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .receivelist {
    min-width: 320px;
    min-height: 460px;
    width: 3.05rem;
    height: calc(3.05rem + 140px);
    margin: 17px 0px;
    background-color: #f4f4f4;
    box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.09);
    float: left;
    position: relative;
    overflow: hidden;
    .list-top {
      // max-width: 320px;
      // width: 320px;
      // min-height: 250px;
      // height: 250px;
      height: 50%;
      text-align: center;
      color: #ffffff;
      padding-top: 50px;
    }
    .list-top span {
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .list-bot {
      width: 100%;
      height: 50%;
      text-align: center;
      background: #f4f4f4;
      padding: 30% 5% 0 5%;
      span {
        display: inline-block;
        width: 100%;
        // margin-top: 10px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
      }
      span:nth-child(1) {
        font-size: 18px;
        color: #1f1f1f;
        margin-bottom: 10px;
      }
      span:nth-child(2) {
        width: 100%;
        height: 40px;
        font-size: 16px;
        color: #666666;
      }
    }
    .phone {
      width: 50%;
      height: 34%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      overflow: hidden;
      box-shadow: 0px 0px 10px #4c4343;
      img {
        position: absolute;
        top: 0;
        z-index: 2;
        border-radius: 50%;
        border: 10px solid transparent;
      }
    }
    .phone:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 50%;
      background-color: #6988db;
    }
    .phone:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 50%;
      top: 50%;
      background-color: #ffffff;
    }
  }
}
</style>
