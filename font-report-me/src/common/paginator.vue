<template>
  <div class="define-pagination">
   <el-pagination
    background
    small
    layout="prev, pager, next"
    prev-text='上一页'
    next-text='下一页'
    :page-size='6'
    :current-page ="paginatorOpts.currentPage"
    :total="paginatorOpts.total"
    @current-change="handleCurrentChange">
  </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed:{
    paginatorOpts(){
      return this.$store.state.paginatorOptions
    }
  },
  methods: {
    handleCurrentChange(val) {
      //当前页改变
      console.log('点击了分页')
      if(this.paginatorOpts.isdialog){
        this.paginatorOpts.dialogpaginatorFun(val)
      }else{
        this.paginatorOpts.paginatorFunction(val);
      }
    }
  }
};
</script>

<style>
.define-pagination .el-pagination{
  text-align: right;
  padding-right:31px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #278df6;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  color: #278df6;
  border: solid 1px #278df6;
  margin-right: 10px;
}
.el-pagination.is-background .btn-next.disabled,
.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev.disabled,
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .el-pager li.disabled {
  border: solid 1px #b7b7b7;
  color: #b7b7b7;
}
.el-pagination.is-background .el-pager li {
  width: 25px;
  height: 21px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev {
  width: 56px;
  height: 21px;
  font-size: 14px;
}
</style>



