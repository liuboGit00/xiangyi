<template>
  <div :style="{height: heightValue + 'px'}" class='table'>
    <div class="table-head">
      <div class="table-head-content" v-for="(item,index) in head" :key="index" :style="{width: clientWidth +'px'}">{{item}}</div>
    </div>
    <div class="table-wrap">
      <vue-scroll>
        <div class="table-content">
          <s-table :tableData='tableData' :rowWidth='clientWidth'></s-table>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import STable from "./STable";
import VueScroll from "../VueScroll/VueScroll";
// import { mapState } from "vuex";
export default {
  props: ["chartTableData", "groupLoad", "groupShowLoad", "showArea"],
  data() {
    return {
      height: 30,
      clientWidth: "",
      timer1: true,
      timer2: true,
      // widthValue: "",
      head: [],
      tableData: [],
      dHeight: null
    };
  },
  watch: {
    groupLoad() {
      this.getTableData();
      this.getWidth1();
    },
    groupShowLoad() {
      this.getTableData();
      this.getWidth2();
    },
    // collapse() {
    //   setTimeout(() => {
    //     this.getWidth1();
    //   }, 300);
    // }
  },
  computed: {
    heightValue() {
      if (this.showArea === "newAndEdit") {
        this.$nextTick(() => {
          this.getWidth2();
        });
        return document.body.clientHeight - 350;
      } else if (this.showArea === "show") {
        return document.body.clientHeight - 220;
      }
      // return document.body.clientHeight - 350
    },
    // ...mapState(["collapse"])
  },
  components: {
    STable,
    // VueScrollVueScroll
  },
  methods: {
    // 查看获取宽度
    getWidth1() {
      // 动态设置背景图的高度为浏览器可视区域宽度
      // 首先在 DOM渲染数据时，设置宽度．
      var obj1 = document.getElementsByClassName("content");
      var obj2 = document.getElementsByClassName("picture-list");
      var width1 = obj1[0].offsetWidth;
      var width2 = obj2[0].offsetWidth;
      document.getElementsByClassName("show-chart")[1].style.width =
        width1 - width2 - 100 + "px";
      this.clientWidth = `${(width1 - width2 - 100) / this.head.length}`;
      var obj3 = document.getElementsByClassName("show-chart");
      obj3[1].style.border = "0px";
      // 然后监听window的resize事件．在浏览器窗口变化时再设置宽度．
      window.onresize = () => {
        if (document.getElementsByClassName("show-chart")[1]) {
          width1 = obj1[0].offsetWidth;
          width2 = obj2[0].offsetWidth;
          document.getElementsByClassName("show-chart")[1].style.width =
            width1 - width2 - 100 + "px";
          this.clientWidth = `${(width1 - width2 - 100) / this.head.length}`;
          obj3[1].style.border = "0px";
        }
      };
    },
    // 新建获取宽度
    getWidth2() {
      // 动态设置背景图的高度为浏览器可视区域宽度
      // 首先在 DOM渲染数据时，设置宽度．
      var obj1 = document.getElementsByClassName("chart-manage");
      var width1 = obj1[0].offsetWidth - 20;

      document.getElementsByClassName("table")[0].style.width = width1 + "px";
      this.clientWidth = `${width1 / this.head.length}`;
      var obj2 = document.getElementsByClassName("show-chart");
      obj2[0].style.border = "0px";
      // 然后监听window的resize事件．在浏览器窗口变化时再设置宽度．
      window.onresize = () => {
        if (document.getElementsByClassName("table")[0]) {
          width1 = obj1[0].offsetWidth - 20;
          document.getElementsByClassName("table")[0].style.width =
            width1 + "px";
          this.clientWidth = `${width1 / this.head.length}`;
          obj2[0].style.border = "0px";
        }
      };
    },
    // 获取表格数据
    getTableData() {
      if (this.chartTableData) {
        // 获取表头数据
        this.head = this.chartTableData.heads;
        // 获取表格数据
        this.tableData = this.chartTableData.value;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getTableData();
    this.getWidth1();
  }
};
</script>
<style lang="less" scoped>
.table-wrap {
  height: calc(~"100% - 30px");
  .table-content {
    border: 1px solid #278df6;
    box-sizing: border-box;
    float: left;
    position: relative;
  }
}
.table-head {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: #278df6;
  color: #ffffff;
  .table-head-content {
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #fff;
  }
}
</style>


