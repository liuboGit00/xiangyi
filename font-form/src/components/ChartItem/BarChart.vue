<template>
  <div class="chart-bar" id="barChart" :style="'width:' + widthValue + 'px'">
  </div>
</template>

<script>
export default {
  props: ["barData"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },

        legend: {
          data: [], //图例数据从后台获取
          top: 10,
          left: "center",
          itemWidth: 8, //图例的宽度
          itemHeight: 8, //图例的高度
          textStyle: {
            //图例文字的样式
            color: "#999",
            fontSize: 12
          }
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [], //x轴轴值数据从后台获取
          axisPointer: {
            type: "shadow"
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#999"]
            }
          },
          //  改变x轴颜色
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            name: "", //后台获取
            min: null, //后台获取
            max: null, //后台获取
            // interval: 50, //后台获取
            //一下是y轴样式设置
            axisLabel: {
              formatter: "{value}"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#999"]
              }
            },
            //  改变y轴颜色
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            }
          },
          {
            type: "value",
            name: "", //后台获取
            min: null, //后台获取
            max: null, //后台获取
            // interval: 50, //后台获取
            //一下是y轴样式设置
            axisLabel: {
              formatter: "{value}"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#999"]
              }
            },
            //  改变y轴颜色
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            }
          }
        ], //y轴轴值（分左轴值和右轴值）从后台获取
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 35
          },
          {
            type: "inside",
            xAxisIndex: [0],
            start: 1,
            end: 35
          }
        ],
        series: [] //图表展示数据从后台获取
      }
    };
  },
  watch: {
    // widthValue() {
    //   return document.body.clientWidth - 625.63;
    //   this.drawBar();
    // }
    barData: {
      handler: function(val, oldVal) {
        this.getBarChartData();
        this.drawBar();
      },
      deep: true
    }
  },
  computed: {
    widthValue() {
      return document.body.clientWidth - 625.63;
      this.drawBar();
    }
  },
  methods: {
    getBarChartData() {
      this.option.series = [];
      //legend图例数据
      let legendData = [];
      // 图表series数据展示
      if (this.barData.chartDataVOList) {
        for (let i = 0; i <= this.barData.chartDataVOList.length - 1; i++) {
          if (
            this.barData.chartDataVOList[i].type === 5 ||
            this.barData.chartDataVOList[i].type === 6
          ) {
            //图表series展示数据
            this.option.series.push({
              name: this.barData.chartDataVOList[i].name, //后台获取
              type: "bar",
              stack: "总量",
              data: this.barData.chartDataVOList[i].value //后台获取
            });
            legendData.push(this.barData.chartDataVOList[i].name);
          }
        }
        this.option.legend.data = legendData;
      } else {
        this.option.series.push({
          name: "", //后台获取
          type: "bar",
          stack: "总量",
          data: [] //后台获取
        });
        this.option.xAxis.data = [];
        this.option.yAxis[0].data = [];
        this.option.yAxis[1].data = [];
        this.option.series.length = 0;
        this.option.series = null;
      }

      // this.option.series = [];
      // y轴坐标轴轴值
      let yLeft = [];
      let yRight = [];
      let yLeftMax = null;
      let yRightMax = null;
      let yLeftMin = null;
      let yRightMin = null;
      let xAxisData = [];
      if (this.barData.chartDataVOList) {
        for (let j = 0; j <= this.barData.chartDataVOList.length - 1; j++) {
          if (this.barData.chartDataVOList[j].type === 5) {
            yLeft = yLeft.concat(this.barData.chartDataVOList[j].value);
            yLeftMax = Math.ceil(Math.max(...yLeft) / 10) * 10;
            yLeftMin = Math.floor(Math.min(...yLeft) / 10) * 10;
          } else if (this.barData.chartDataVOList[j].type === 6) {
            yRight = yRight.concat(this.barData.chartDataVOList[j].value);
            yRightMax = Math.ceil(Math.max(...yRight) / 10) * 10;
            yRightMin = Math.floor(Math.min(...yRight) / 10) * 10;
          } else if (this.barData.chartDataVOList[j].type === 2) {
            // x坐标轴轴值数据
            if (this.barData.xZhou.length == 0) {
              xAxisData = this.barData.chartDataVOList[j].value;
              this.option.xAxis.data = xAxisData;
            } else {
              this.option.xAxis.data = this.barData.xZhou;
            }
          }
        }
      }
      // if (yLeftMin > 0) {
      //   yLeftMin = 0;
      // } else {
      //   yLeftMin;
      // }
      if (yRightMin > 0) {
        yRightMin = 0;
      } else {
        yRightMin;
      }
      // this.option.yAxis[0].max = yLeftMax;
      // this.option.yAxis[0].min = yLeftMin;
      this.option.yAxis[1].max = yRightMax;
      this.option.yAxis[1].min = yRightMin;

      // this.drawBar();
    },
    drawBar() {
      this.getBarChartData();
      // 基于准备好的dom，初始化echarts实例
      let barChart = this.$echarts.init(document.getElementById("barChart"));

      barChart.clear();
      // 绘制图表
      barChart.setOption(this.option);
    }
  },

  mounted() {
    this.getBarChartData();
    this.drawBar();
    if (this.chart != null && this.chart != "" && this.chart != undefined) {
this.chart.dispose();
}
  }
};
</script>

<style lang="less" scoped>
.chart-bar {
  // width: 100%;
  height: 470px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>
