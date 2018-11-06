<template>
  <div class="chart-pie" id="pieChart" :style="'width:100%;height:100%;'">
  </div>
</template>

<script>
export default {
  props: ["pieData"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          top: 20,
          left: "center",
          data: [], //图例数据从后台获取
          textStyle: {
            //图例文字的样式
            color: "#999",
            fontSize: 12
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "30%",
          containLabel: true
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [], //后台获取
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ] //图表展示数据从后台获取
      }
    };
  },
  watch: {
    pieData: {
      handler: function(val, oldVal) {
        this.getChartData();
        this.drawPie();
      },
      deep: true
    }
  },
  computed: {
    widthValue() {
      return document.body.clientWidth - 625.63;
      // this.drawPie();
    }
  },
  methods: {
    getChartData() {
      // 图例legend数据
      let legendData = [];
      for (let i = 0; i < this.pieData.length; i++) {
        // 图表series展示数据
        // this.option.series.push({
        //   name: this.pieData[i].name,
        //   type: "pie",
        //   radius: "55%",
        //   center: ["50%", "60%"],
        //   data: this.pieData, //后台获取
        //   itemStyle: {
        //     emphasis: {
        //       shadowBlur: 10,
        //       shadowOffsetX: 0,
        //       shadowColor: "rgba(0, 0, 0, 0.5)"
        //     }
        //   }
        // });
        legendData.push(this.pieData[i].name);
      }
      this.option.legend.data = legendData;
      this.option.series[0].data = this.pieData;
    },
    drawPie() {
      this.getChartData();
      // 基于准备好的dom，初始化echarts实例
      let pieChart = this.$echarts.init(document.getElementById("pieChart"));
      // 绘制图表
      pieChart.setOption(this.option);
    }
  },

  mounted() {
    this.getChartData();
    this.drawPie();
  }
};
</script>

<style lang="less" scoped>
.chart-pie {
  // width: 100%;
  height: 470px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>
