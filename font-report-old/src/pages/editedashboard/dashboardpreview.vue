<template>
  <div class="page" style="height:100%;">
    <!-- <div class="dashboardtemplatecopy" v-html="blankdocument"></div> -->
    <div class="dashboardtemplatecopy">
        <div class="aside top">
          <div class="template">
              <div class="templatelist"  id="regionReport_01">
                  <LineChart ref="lineChart" :line-data="chartShowData1.chartData" v-if="chartShowData1.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData1.chartData" v-if="chartShowData1.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData1.chartData" v-if="chartShowData1.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData1.chartData" v-if="chartShowData1.tabeShow"></TableChart>                    
              </div>
              <div class="templatelist"  id="regionReport_02">
                  <LineChart ref="lineChart" :line-data="chartShowData2.chartData" v-if="chartShowData2.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData2.chartData" v-if="chartShowData2.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData2.chartData" v-if="chartShowData2.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData2.chartData" v-if="chartShowData2.tabeShow"></TableChart>                    
              </div>
          </div>
          <div class="template double">
              <div class="templatelist" id="regionReport_03">
                  <LineChart ref="lineChart" :line-data="chartShowData3.chartData" v-if="chartShowData3.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData3.chartData" v-if="chartShowData3.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData3.chartData" v-if="chartShowData3.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData3.chartData" v-if="chartShowData3.tabeShow"></TableChart>                    
              </div>
          </div>
          <div class="template">
              <div class="templatelist" id="regionReport_04">
                  <LineChart ref="lineChart" :line-data="chartShowData4.chartData" v-if="chartShowData4.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData4.chartData" v-if="chartShowData4.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData4.chartData" v-if="chartShowData4.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData4.chartData" v-if="chartShowData4.tabeShow"></TableChart>                    
              </div>
              <div class="templatelist"  id="regionReport_05">
                  <LineChart ref="lineChart" :line-data="chartShowData5.chartData" v-if="chartShowData5.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData5.chartData" v-if="chartShowData5.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData5.chartData" v-if="chartShowData5.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData5.chartData" v-if="chartShowData5.tabeShow"></TableChart>                    
              </div>
          </div>
        </div>
        <div class="aside bot">
          <div class="template">
              <div class="templatelist" id="regionReport_06">
                  <LineChart ref="lineChart" :line-data="chartShowData6.chartData" v-if="chartShowData6.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData6.chartData" v-if="chartShowData6.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData6.chartData" v-if="chartShowData6.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData6.chartData" v-if="chartShowData6.tabeShow"></TableChart>                    
              </div>
              <div class="templatelist" id="regionReport_07">
                  <LineChart ref="lineChart" :line-data="chartShowData7.chartData" v-if="chartShowData7.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData7.chartData" v-if="chartShowData7.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData7.chartData" v-if="chartShowData7.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData7.chartData" v-if="chartShowData7.tabeShow"></TableChart>                    
              </div>
              <div class="templatelist" id="regionReport_08">
                  <LineChart ref="lineChart" :line-data="chartShowData8.chartData" v-if="chartShowData8.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData8.chartData" v-if="chartShowData8.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData8.chartData" v-if="chartShowData8.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData8.chartData" v-if="chartShowData8.tabeShow"></TableChart>                    
              </div>
              <div class="templatelist" id="regionReport_09">
                  <LineChart ref="lineChart" :line-data="chartShowData9.chartData" v-if="chartShowData9.lineShow"></LineChart>
                  <PieChart ref="pieChart" :pie-data="chartShowData9.chartData" v-if="chartShowData9.pieShow"></PieChart>
                  <BarChart ref="barChart" :bar-data="chartShowData9.chartData" v-if="chartShowData9.barShow"></BarChart>
                  <TableChart ref="tableChart" :chart-table-data="chartShowData9.chartData" v-if="chartShowData9.tabeShow"></TableChart>                    
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
    $(".footbtn").css("display", "none");
    if (this.$route.query.template == "null") {
      this.emptytemplate();
    } else {
      this.ajaxshow();
    }
  },
  data() {
    return {
      chartShowData1: {},
      chartShowData2: {},
      chartShowData3: {},
      chartShowData4: {},
      chartShowData5: {},
      chartShowData6: {},
      chartShowData7: {},
      chartShowData8: {},
      chartShowData9: {},

      imgBaseURL: window.localStorage.getItem("imgBaseURL"),
      reportId: window.localStorage.getItem("reportId"),
      blankdocument: "",
      serverobject: server, //ajax服务
      formsliststore: []
    };
  },
  watch: {
    chartShowData1(val, oldval) {
      this.getShowChart(this.chartShowData1);
    },
    chartShowData2(val, oldval) {
      this.getShowChart(this.chartShowData2);
    },
    chartShowData3(val, oldval) {
      this.getShowChart(this.chartShowData3);
    },
    chartShowData4(val, oldval) {
      this.getShowChart(this.chartShowData4);
    },
    chartShowData5(val, oldval) {
      this.getShowChart(this.chartShowData5);
    },
    chartShowData6(val, oldval) {
      this.getShowChart(this.chartShowData6);
    },
    chartShowData7(val, oldval) {
      this.getShowChart(this.chartShowData7);
    },
    chartShowData8(val, oldval) {
      this.getShowChart(this.chartShowData8);
    },
    chartShowData9(val, oldval) {
      this.getShowChart(this.chartShowData9);
    }
  },
  methods: {
    emptytemplate() {
      for (let i = 0; i < 9; i++) {
        $("#chartShowData" + i).empty();
      }
    },
    getShowChart(item) {
      if (item.chartType == "1") {
        this.$set(item, "tabeShow", true);
      } else if (item.chartType == "2") {
        this.$set(item, "barShow", true);
      } else if (item.chartType == "4") {
        this.$set(item, "lineShow", true);
      } else if (item.chartType == "5") {
        this.$set(item, "pieShow", true);
      } else {
        this.$set(item, "lineShow", false);
        this.$set(item, "pieShow", false);
        this.$set(item, "barShow", false);
        this.$set(item, "tabeShow", false);
      }
    },
    choicechartype(item, chartType, data) {
      this.$set(item, "chartType", chartType);
      switch (chartType) {
        case 1:
          item.chartData = data.tableChartVot;
          break;
        case 2:
          item.chartData = data.zhexianChartVo;
          break;
        case 4:
          item.chartData = data.zhexianChartVo;
          break;
        case 5:
          item.chartData = data.pieCharts;
          break;
      }
    },
    ajaxshow() {
      // this.$emit("typeShow", true);
      let self = this;
      if (this.formsliststore.length > 0) {
        this.formsliststore.forEach((obj, index) => {
          if (obj.dataType == 1) {
            if (obj.obj.reportFormsCode) {
              self.serverobject.reportbichart(
                obj.obj.reportFormsCode,
                function success(res) {
                  // self.$emit("typeShow", false);
                  switch (obj.moduleCode.split("_")[1].substr(1)) { //模块id的值
                    case "1":
                      self.choicechartype(
                        self.chartShowData1,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                    case "2":
                      self.choicechartype(
                        self.chartShowData2,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                    case "3":
                      self.choicechartype(
                        self.chartShowData3,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                    case "4":
                      self.choicechartype(
                        self.chartShowData4,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                    case "5":
                      self.choicechartype(
                        self.chartShowData5,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                    case "6":
                      self.choicechartype(
                        self.chartShowData6,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                    case "7":
                      self.choicechartype(
                        self.chartShowData7,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                    case "8":
                      self.choicechartype(
                        self.chartShowData8,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                    case "9":
                      self.choicechartype(
                        self.chartShowData9,
                        res.data.data.chartType,
                        res.data.data
                      );
                      break;
                  }
                }
              );
            }
          }
          if (obj.dataType == 2) {
            $("#" + obj.moduleCode).append(
              "<span>" + obj.dataContent + "<span>"
            );
          }
          if (obj.dataType == 3) {
            $("#" + obj.moduleCode).append(
              "<img width='100%' height='100%' src=" + obj.obj + " />"
            );
          }
        });
      } else {
        let params = self.$route.query.reportId;

        self.serverobject.reportmodulesearch(params, function success(respar) {
          //报告查看根据id查询模块数据
          if ((respar.data.status = "SUCCESS")) {
            // 1报表|2文本|3媒体
            respar.data.data.forEach((obj, index) => {
              if (obj.dataType == 1) {
                if (obj.reportFormsCode) {
                  self.serverobject.reportbichart(
                    obj.reportFormsCode,
                    function success(res) {
                      switch (obj.moduleCode.split("_")[1].substr(1)) { //模块id的值
                        case "1":
                          self.choicechartype(
                            self.chartShowData1,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                        case "2":
                          self.choicechartype(
                            self.chartShowData2,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                        case "3":
                          self.choicechartype(
                            self.chartShowData3,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                        case "4":
                          self.choicechartype(
                            self.chartShowData4,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                        case "5":
                          self.choicechartype(
                            self.chartShowData5,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                        case "6":
                          self.choicechartype(
                            self.chartShowData6,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                        case "7":
                          self.choicechartype(
                            self.chartShowData7,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                        case "8":
                          self.choicechartype(
                            self.chartShowData8,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                        case "9":
                          self.choicechartype(
                            self.chartShowData9,
                            res.data.data.chartType,
                            res.data.data
                          );
                          break;
                      }
                    }
                  );
                }
              }
              if (obj.dataType == 2) {
                $("#" + obj.moduleCode).append(
                  "<span>" + obj.dataContent + "<span>"
                );
              }
              if (obj.dataType == 3) {
                $("#" + obj.moduleCode).append(
                  "<img width='100%' height='100%' src=" +
                    self.imgBaseURL +
                    obj.dataContent +
                    " />"
                );
              }
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
    }
  }
};
</script>

<style lang="less">
.dashboardtemplatecopy {
  position: relative;
  top: 0;
  left: 0;
  border: 1px solid;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 20px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .aside {
    display: flex;
    // flex:1;
    .template {
      flex: 1;
      display: flex;
      flex-direction: column;
      .templatelist {
        flex: 1;
        border: 1px dashed #ddd;
        margin: 5px;
        border-radius: 4px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .delete {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 20px;
          color: blue;
        }
        .delete:hover {
          color: #ffffff;
          background-color: blue;
          cursor: pointer;
        }
        .addcen {
          color: green;
          font-size: 50px;
          cursor: pointer;
        }
        .addcen:hover {
          color: #278df6;
        }
      }
    }
  }
  .top {
    flex: 2;
  }
  .bot {
    display: flex;
    flex: 1;
    .template {
      flex-direction: row;
    }
  }
  .template.double {
    flex: 2;
  }
  .footbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
}
</style>

