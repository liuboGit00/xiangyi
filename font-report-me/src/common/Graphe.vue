<template>
  <div class="chart-show" ref="chartShow">
    <LineChart ref="lineChart" :line-data="chartShowData.chartData" v-if="lineShow"></LineChart>
    <PieChart ref="pieChart" :pie-data="chartShowData.chartData" v-if="pieShow"></PieChart>
    <BarChart ref="barChart" :bar-data="chartShowData.chartData" v-if="barShow"></BarChart>
    <TableChart ref="tableChart" :chart-table-data="chartShowData.chartData" v-if="tabeShow"></TableChart>
  </div>
</template>

<script type="text/ecmascript-6">
import LineChart from "./ChartItem/LineChart.vue";
import PieChart from "./ChartItem/PieChart.vue";
import BarChart from "./ChartItem/BarChart.vue";
import TableChart from "./ChartItem/TableChart.vue";

import { GetMethod, PostMethod } from "@/assets/js/Httpservice.js"; //ajax请求
import { Tool } from "@/assets/js/Tool.js"; //所有工具方法"
export default {
  props: ["chartShowData"],
  data() {
    return {
      lineShow: false,
      pieShow: false,
      barShow: false,
      tabeShow: false
    };
  },
  components: {
    LineChart,
    PieChart,
    BarChart,
    TableChart
  },
  mounted() {
    this.getShowChart();
  },
  watch: {
    chartShowData(newval, oldval) {
      if (newval.reportFormsCode) {
        this.callback(newval.reportFormsCode);
      }
      this.getShowChart();
    }
  },
  methods: {
    callback(reportFormsCode) {
      var _this = this;
      GetMethod("report-forms/bi-chart/" + reportFormsCode, function(res) {
        _this.choicechartype(res.data.data.chartType, res.data.data);
      });
    },
    getShowChart() {
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
    },
    choicechartype(chartType, data) {
      let _this = this;
      switch (chartType) {
        case 1:
          this.$set(this.chartShowData, "chartData", data.tableChartVot);
          setTimeout(() => {
            _this.$store.dispatch(
              "setGrapheChart",
              _this.$refs.chartShow.innerHTML
            );
          }, 0);
          break;
        case 2:
          this.$set(this.chartShowData, "chartData", data.zhexianChartVo);
          setTimeout(() => {
            _this.$store.dispatch(
              "setGrapheChart",
              _this.$refs.chartShow.innerHTML
            );
          }, 0);
          break;
        case 4:
          this.$set(this.chartShowData, "chartData", data.zhexianChartVo);
          setTimeout(() => {
            _this.$store.dispatch(
              "setGrapheChart",
              _this.$refs.chartShow.innerHTML
            );
          }, 0);
          break;
        case 5:
          this.$set(this.chartShowData, "chartData", data.pieCharts);
          setTimeout(() => {
            _this.$store.dispatch(
              "setGrapheChart",
              _this.$refs.chartShow.innerHTML
            );
          }, 0);
          break;
      }
    }
  }
};
</script>

<style lang="less">
.chart-show {
}
</style>
