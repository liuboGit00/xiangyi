<template>
  <div class="page">~
    <!-- <div class="dashboardtemplatecopy" v-html="blankdocument"></div> -->
      <div class="dashboardtemplatecopy">
        <!-- <div class="underlinehead">宁家鲜生数据分析</div> -->
        <div class="contents">
          <div class="lists templatelist" v-for="(item,index) in items" :key="index" :style="{'width':item.basewidth,'height':item.baseheight}">
                <div class="header">
                  <span :style="{background:item.bgcolor}"></span>
                  <input type="text" v-model="item.header" v-show="item.header" :id="item.headerid" @change="addtextcontent(item)">
                  <input type="text" v-model="item.info" v-show="item.info" :id="item.Infoid" @change="addtextcontent(item)">
                </div>
                <div class="graphe" :id="item.Graphid">
                    <span class="addcen el-icon-circle-plus" v-show="item.addGraphflag"  @click="addgraphe(item.Graphid,index)"></span>
                    <span class="delete iconfont icon-shanchu" v-show="item.deleteflag"></span>
                    <img width="100%" height="100%" :src="item.src" alt="" v-show="item.imgflag" />
                    <span class="formcontent" v-if="item.textflag">{{item.reportFormsTitle}}</span>

                    <LineChart ref="lineChart" :line-data="item.chartShowData.chartData" v-if="item.chartShowData.lineShow"></LineChart>
                    <PieChart ref="pieChart" :pie-data="item.chartShowData.chartData" v-if="item.chartShowData.pieShow"></PieChart>
                    <BarChart ref="barChart" :bar-data="item.chartShowData.chartData" v-if="item.chartShowData.barShow"></BarChart>
                    <TableChart ref="tableChart" :chart-table-data="item.chartShowData.chartData" v-if="item.chartShowData.tabeShow"></TableChart>                     
                </div>
                <div class="footer">
                    <textarea v-model="item.description" v-show="item.description" :id="item.descriptionid"  @change="addtextcontent(item)"></textarea>
                    <div class="scrollby" v-show="item.description">
                      <span class="el-icon-arrow-up" ref="prev" @click="scrollpage"></span>
                      <span class="el-icon-arrow-down" ref="next" @click="scrollpage"></span>
                    </div>
                </div>
          </div>
        </div>
      </div>    
  </div>
</template>

<script>
import LineChart from "@/components/ChartItem/LineChart.vue";
import PieChart from "@/components/ChartItem/PieChart.vue";
import BarChart from "@/components/ChartItem/BarChart.vue";
import TableChart from "@/components/ChartItem/TableChart.vue";

import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  components: {
    LineChart,
    PieChart,
    BarChart,
    TableChart
  },
  created() {
    this.$emit("blank-parent", false);
    if (
      this.$route.query.template == undefined &&
      this.$route.query.reportId == undefined
    ) {
      this.formsliststore = JSON.parse(localStorage.getItem("formsliststore"));
    }
  },
  mounted() {
    let typeShow = document.getElementsByClassName("page")[0];
    if (typeShow.style.display == "") {
      this.$emit("typeShow", false);
    }
    $(".footbtn").css("display", "none");
    if (this.$route.query.template == "null") {
      this.emptytemplate();
    } else {
      this.initlist();
      this.ajaxshow();
    }
  },
  data() {
    return {
      imgBaseURL: window.localStorage.getItem("imgBaseURL"),
      reportId: window.localStorage.getItem("reportId"),
      blankdocument: "",
      items: "",
      serverobject: server, //ajax服务
      backgroundColor: [
        "linear-gradient(to top, #6a89d9,#4c65a4)",
        "linear-gradient(to top, #f56986,#c77081)",
        "linear-gradient(to top, #86e6d8,#59ada1)",
        "linear-gradient(to top, #56aea1,#50a194)"
      ],
      formsliststore: []
    };
  },
  methods: {
    choicechartype(item, chartType, data) {
      item.chartShowData.chartType = chartType;
      item.chartShowData.tabeShow = false;
      item.chartShowData.barShow = false;
      item.chartShowData.lineShow = false;
      item.chartShowData.pieShow = false;
      switch (chartType) {
        case 1:
          item.chartShowData.chartData = data.tableChartVot;
          item.chartShowData.tabeShow = true;
          break;
        case 2:
          item.chartShowData.chartData = data.zhexianChartVo;
          item.chartShowData.barShow = true;
          break;
        case 4:
          item.chartShowData.chartData = data.zhexianChartVo;
          item.chartShowData.lineShow = true;
          break;
        case 5:
          item.chartShowData.chartData = data.pieCharts;
          item.chartShowData.pieShow = true;
          break;
      }
    },
    scrollpage(el) {
      //上下滚动
      if (el.target.className == "el-icon-arrow-up") {
        el.target.parentElement.previousElementSibling.scrollBy(0, -10);
      } else {
        el.target.parentElement.previousElementSibling.scrollBy(0, 10);
      }
    },
    ajaxshow() {
      // this.$emit("typeShow", true);
      let self = this;
      if (this.formsliststore.length > 0) {
        this.formsliststore.forEach((obj, index) => {
          self.items.forEach((objchild, indexchild) => {
            //9
            if (obj.dataType == 1 && obj.obj.reportFormsCode) {
              if (objchild.Graphid == obj.moduleCode) {
                self.serverobject.reportbichart(
                  obj.obj.reportFormsCode,
                  function success(res) {
                    // self.$emit("typeShow", false);
                    self.choicechartype(
                      objchild,
                      res.data.data.chartType,
                      res.data.data
                    );
                  }
                );
              }
            }
            if (obj.dataType == 2) {
              if (objchild.headerid == obj.obj.headerid) {
                objchild.header = obj.obj.header;
              }
              if (objchild.Infoid == obj.obj.Infoid) {
                objchild.info = obj.obj.info;
              }
              if (objchild.descriptionid == obj.obj.descriptionid) {
                objchild.description = obj.obj.description;
              }
            }
            if (obj.dataType == 3) {
              if (objchild.Graphid == obj.moduleCode) {
                objchild.imgflag = true;
                objchild.src = obj.obj;
              }
            }
            objchild.addGraphflag = false;
          });
        });
      } else {
        let params = self.$route.query.reportId;
        self.serverobject.reportmodulesearch(params, function success(respar) {
          if ((respar.data.status = "SUCCESS")) {
            // 1报表|2文本|3媒体
            respar.data.data.forEach((obj, index) => {
              //36

              self.items.forEach((objchild, indexchild) => {
                //9
                if (obj.dataType == 1 && obj.reportFormsCode) {
                  if (objchild.Graphid == obj.moduleCode) {
                    self.serverobject.reportbichart(
                      obj.reportFormsCode,
                      function success(res) {
                        self.choicechartype(
                          objchild,
                          res.data.data.chartType,
                          res.data.data
                        );
                      }
                    );
                  }
                }
                if (obj.dataType == 2) {
                  if (objchild.headerid == obj.moduleCode) {
                    objchild.header = obj.dataContent;
                  }
                  if (objchild.Infoid == obj.moduleCode) {
                    objchild.info = obj.dataContent;
                  }
                  if (objchild.descriptionid == obj.moduleCode) {
                    objchild.description = obj.dataContent;
                  }
                }
                if (obj.dataType == 3) {
                  if (objchild.Graphid == obj.moduleCode) {
                    objchild.imgflag = true;
                    objchild.src = self.imgBaseURL + obj.dataContent;
                  }
                }
                objchild.addGraphflag = false;
              });
            });
          }
        });
        // 更新已读状态
        if (self.$route.query.isRead == 0) {
          let param = { isRead: "1", publishId: self.$route.query.publishId };
          self.serverobject.reportreceivesput(param, function success(
            respar
          ) {});
        }
      }
    },
    initlist() {
      //ajax请求数据
      let first = 0,
        second = 1,
        three = 2,
        basewidth = "auto",
        baseheight = "auto";
      this.items = [];
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
          dataType: "",
          reportFormsCode: "",
          chartShowData: {
            tabeShow: false,
            pieShow: false,
            barShow: false,
            lineShow: false,
            chartType: "",
            chartData: ""
          }
        });
      }
    },
    emptytemplate() {
      let first = 0,
        second = 1,
        three = 2,
        basewidth = "auto",
        baseheight = "auto";
      this.items = [];
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
          addGraphflag: false,
          imgflag: false,
          textflag: false,
          Graphid: "regionReportGraph_0" + n,
          Infoid: "regionReportInfo_0" + n,
          descriptionid: "regionReportdescri_0" + n,
          headerid: "regionReportHeader_0" + n,
          reportFormsTitle: "",
          dataType: "",
          reportFormsCode: "",
          chartShowData: {
            tabeShow: false,
            pieShow: false,
            barShow: false,
            lineShow: false,
            chartType: "",
            chartData: ""
          }
        });
      }
    }
  }
};
</script>
<style scoped lang="less">
// .dashboardtemplatecopy{
//   border:1px solid #ddd;
//   width:100%;
//   min-height:600px;
//   border-radius: 10px;
//   background-color: #ffffff;
//   padding:10px;
//   margin-top:10px;
//   .underlinehead{
//     height:40px;
//     font-size: 20px;
//     margin-left: -9px;
//     margin-right: -9px;
//     color:#4b63a7;
//     text-align: center;
//     border-bottom:1px dashed #ddd;
//   }
//   .contents{
//     display: flex;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     .lists{
//       border: 1px solid #eee;
//       min-width: 320px;
//       min-height: 215px;
//       width: 3.05rem;
//       height: calc(3.05rem - 100px);
//       margin: 17px 0px;
//       float: left;
//       box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.09);
//       padding-top: 10px;
//       // width: 26%;
//       // border: 1px solid #ddd;
//       // margin-top:20px;
//       // min-height: 300px;
//       display: flex;
//       flex-direction: column;
//       // .childlists{
//           .header{
//             position: relative;
//             padding-left:10px;
//             padding-right:10px;
//             span{
//               display: block;
//               font-size: 25px;
//             }
//             span:first-child{
//               position: absolute;
//               top: 0;
//               left: 0;
//               bottom: 0;
//               width: 3px;
//             }
//             input{
//               display: inline-block;
//               width: 100%;
//               font-size: 12px;
//               color: #999999;
//               border: 1px solid #eee;
//             }
//             input:nth-child(2){
//               font-size: 25px;
//               color: #1f1f1f;
//               letter-spacing: 2px;
//               margin-bottom: 10px;
//             }
//           }
//           .graphe{
//             flex:1;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             color: green;
//             font-size: 50px;
//             position: relative;
//             .formcontent{
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               width:100%;
//               height:100%;
//               background: rgba(21, 15, 15, 0.28);
//             }
//             .delete{
//                 position: absolute;
//                 top: 10px;
//                 right: 10px;
//                 font-size: 30px;
//                 color: #ffffff;
//             }
//             .delete:hover{
//               color: #ffffff;
//               background-color: #2182e7;
//               cursor: pointer;
//             }
//           }
//           .footer{
//                 // padding:15px 25px;
//                 position: relative;
//                 // flex:0.3;
//                 height:30%;
//                 border-top: 1px dashed #ddd;
//                 padding: 15px 35px 15px 25px;
//             textarea{
//               height:100%;
//               width: 100%;
//               overflow-y: auto;
//               resize: none;
//               border: 1px solid #eee;
//               font-size: 12px;
//               color: #999999;
//               line-height: 18px;
//               letter-spacing: 1px;
//             }
//             .scrollby{
//               display: flex;
//               flex-direction: column;
//               justify-content: space-between;
//               position: absolute;
//               top: 0;
//               right: 0;
//               bottom: 0;
//               padding: 15px 10px 15px 0;
//               span{
//                 cursor: pointer;
//               }
//             }
//           }
//       // }
//     }
//   }
// }
[v-cloak] {
  display: none;
}
.templatemult {
  display: flex;
  flex-direction: column;
  // height: 100%;
}
.templatetab {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  .tabindex {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #ddd;
    margin: 0 10px;
    border-radius: 50%;
  }
  .active {
    background-color: #278df6;
  }
}
.dashboardtemplatecopy {
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



