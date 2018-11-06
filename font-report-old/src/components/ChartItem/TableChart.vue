<template>
  <el-table class="chart-table" :data="tableData" height="100%" style="width:100%;border:0px;" :header-cell-style="{background:'#4c63a7'}">
    <el-table-column v-for="col in cols" :prop="col.prop" :label="col.label" :key="col.id" align="center">
    </el-table-column>
  </el-table>

</template>

<script>
export default {
  props: ["chartTableData"],
  data() {
    return {
      cols: [], //表头数据
      tableData: [] //表格内容数据
      // 后台返回数据格式
    };
  },
  watch: {
    chartTableData() {
      this.getTable();
    }
  },
  methods: {
    getTable() {
      // 获取表头数据
      this.cols = [];
      if (this.chartTableData.heads) {
        for (var i = 0; i <= this.chartTableData.heads.length - 1; i++) {
          this.cols.push({
            prop: this.chartTableData.heads[i].prop,
            label: this.chartTableData.heads[i].head
          });
        }
      } else {
        this.cols = [];
      }

      //表格数据
      this.tableData = this.chartTableData.rows;
    }
  },
  mounted() {
    this.getTable();
  }
};
</script>

<style lang="less" >
.chart-table {
  width: 100%;
  margin: 0 auto;
}
.el-table thead {
  color: #fff;
  font-size: 18px;
  font-weight: normal;
}
.el-table th,
.el-table tr {
  font-size: 16px;
}
</style>

