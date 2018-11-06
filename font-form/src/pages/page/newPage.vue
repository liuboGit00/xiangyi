<template>
<div class='main'>
      <div class="chart-show">
        <LineChart ref="lineChart" :line-data="chartShowData.chartData" v-if="lineShow"></LineChart>
        <PieChart ref="pieChart" :pie-data="chartShowData.chartData" v-if="pieShow"></PieChart>
        <BarChart ref="barChart" :bar-data="chartShowData.chartData" v-if="barShow"></BarChart>
        <TableChart ref="tableChart" :chart-table-data="chartShowData.chartData" v-if="tabeShow"></TableChart>
      </div>
</div>
</template>

<script type="text/ecmascript-6">
import LineChart from "@/components/ChartItem/LineChart.vue";
import PieChart from "@/components/ChartItem/PieChart.vue";
import BarChart from "@/components/ChartItem/BarChart.vue";
import TableChart from "@/components/ChartItem/TableChart.vue";
import Dialog from "./dialog.vue"; //本页所有弹窗内容集合(每个页面单独添加)
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)

export default {
  data() {
    return {
      lineShow: false,
      pieShow: false,
      barShow: false,
      tabeShow: false,
      chartId: "",
      chartStyle: "",
      chartShowData: {
        chartData: "",
        chartType: ""
      },
      chartDataList: ""
    };
  },
  components: {
    LineChart,
    PieChart,
    BarChart,
    TableChart
  },
  watch: {
    chartShowData() {
      this.getShowChart();
    }
  },
  mounted() {
    this.themeSave();
  },
  methods: {
    themeSave() {
      let self = this;
      let chartId = localStorage.getItem("reportFormsCodes");
      let chartIdNum = String(chartId);
      server.reportmergerEchart(chartIdNum, function success(res) {
        //接口请求、
        let chartType = res.data.data.chartType;
        switch (chartType) {
          case 1:
            self.chartDataList = res.data.data.tableChartVot;
            break;
          case 2:
            self.chartDataList = res.data.data.lineChartVo;
            break;
          case 4:
            self.chartDataList = res.data.data.zhexianChartVo;
            break;
          case 5:
            self.chartDataList = res.data.data.pieCharts;
            break;
          default:
            break;
        }
        self.chartShowData = {
          chartType: res.data.data.chartType,
          chartData: self.chartDataList
        };
      });
    },
    getShowChart() {
      // if (this.chartShowData.chartData) {
      if (this.chartShowData.chartType == "1") {
        this.lineShow = false;
        this.pieShow = false;
        this.barShow = false;
        this.tabeShow = true;
      } else if (this.chartShowData.chartType == "2") {
        this.lineShow = false;
        this.pieShow = false;
        this.barShow = true;
        this.tabeShow = false;
      } else if (this.chartShowData.chartType == "4") {
        this.lineShow = true;
        this.pieShow = false;
        this.barShow = false;
        this.tabeShow = false;
      } else if (this.chartShowData.chartType == "5") {
        this.lineShow = false;
        this.pieShow = true;
        this.barShow = false;
        this.tabeShow = false;
      } else {
        this.lineShow = false;
        this.pieShow = false;
        this.barShow = false;
        this.tabeShow = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  // width: 100%;
  width: 60%;
  margin: 0 auto;
  margin-top: 5%;
}
</style>


