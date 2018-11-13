<template>
  <div id="paging">
    <el-pagination @prev-click='prev' @next-click='next' prev-text='上一页' next-text='下一页' background @current-change="currentHandler" :current-page="paginationData.page" :page-size="paginationData.size" layout="prev, pager, next" :total="paginationData.total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:["pagination"],
  data() {
    return {
      dialogVisible:false,
      iamgeInfo:'',
      form:""
    }
  },
  computed:{
      paginationData:function(){
        return this.pagination;    //包扣（宽度，标题，showflag）
      }
  },
  components: {
  },
  methods:{
    currentHandler(val){
        let data = {
            page: val,
            size: this.paginationData.size
        }
        this.$emit("pagingState",data)
    },
    prev(){

    },
    next(){

    }
  }
}
</script>

<style lang="less">
#paging{
    .el-pagination.is-background .el-pager li{
        border: 1px solid #409eff;
        color: #409eff;
    }
    .el-pagination.is-background .btn-next{
        border: 1px solid #409eff;
        color: #409eff;
    }
    .el-pagination.is-background .btn-prev{
        border: 1px solid #409eff;
        color: #409eff;
    }
    .el-pagination.is-background .btn-next:disabled{
        border: 1px solid #c0c4cc;
        color: #c0c4cc !important;
    }
    .el-pagination.is-background .btn-prev:disabled{
        border: 1px solid #c0c4cc;
        color: #c0c4cc !important;
    }
    // .el-pagination.is-background .btn-prev[disabled='disabled'] {
    //     border: solid 1px #c0c4cc;
    //     color: #c0c4cc!important;
    // }
    .el-button{
        background-color: #4c65a4 !important;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        color: #fff;
    }
    .el-button:hover {
        background-color: #c9d0e4 !important;
        color: #fff !important;
    }
    .el-pagination span:not([class*=suffix]){
        padding: 0px 10px;
    }
}

</style>
