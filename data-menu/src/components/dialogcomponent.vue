<template>
  <div class="">
    <el-dialog
        title="提示"
        :visible.sync="dialogobj.dialogVisible"
        width="610px"
        top="200px"
        :before-close="handleClose">
        <div style="height:100px;" v-if="dialogobj.type == 'set'">
          <div class="dialog-left">
            <i class="el-icon-warning"></i>
          </div>
          <div class="dialog-right">
            <p>抱歉，没有找到与“{{dialogobj.searchData}}”相关的数签结果</p>
            <p>象翌数签尚未收录数签“{{dialogobj.searchData}}”</p>
            <p>欢迎您来创建与分享关于该数签的信息</p>
          </div>
        </div>
        <div class="topImg" v-else>
          <el-form ref="form" :model="form" label-width="126px">
            <el-form-item label="图片说明：">
              <el-input v-model="iamgeInfo" placeholder="图片说明："></el-input>
            </el-form-item>
          </el-form> 
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setSign">{{dialogobj.button.ok}}</el-button>
          <el-button  @click="dialogobj.dialogVisible = false" >{{dialogobj.button.no}}</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:["dialogobj"],
  data() {
    return {
      dialogVisible:false,
      iamgeInfo:'',
      form:""
    }
  },
  computed:{
      dialogVisibles:function(){
        return this.dialogobj;    //包扣（宽度，标题，showflag）
      }
  },
  created(){
    
  },
  components: {
  },
  methods:{
    cancle(done){
    this.$emit("dialog-cancle",this.dialogVisibles.title,"close")   
    },
    sure(done){
    this.$emit("dialog-sure",this.dialogVisibles.title,"sure")
    },
    //点击叉号关闭页面
    handleClose(done){
      done();
    },
    setSign(){
      this.dialogobj.dialogVisible = false
      window.location.href = 'https://test-wl008.weilian.cn/front-data-menu-center/#/Numbersign-create?sessionId='+sessionStorage.getItem("testUserSessions")
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";
.el-dialog__wrapper .el-icon-warning{
  font-size: 76px;
  color:#409EFF;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.dialog-left,.dialog-right{
  float: left;
  height: 100px;
}
.dialog-left{
  width:100px;
  margin-right: 20px;
  position: relative;
}
.dialog-right{
  font-size: 20px;
  color: #6c6e70;
  padding-top: 6px;
  p:first-child{
    margin-bottom: 10px;
  }
}
.dialog-footer button{
  width: 80px;
  height: 42px;
  color: #fff;
  background: #c9d0e4;
  font-size: 18px;
}
.dialog-footer button:first-child{
  background: #4c65a4;
}
</style>
