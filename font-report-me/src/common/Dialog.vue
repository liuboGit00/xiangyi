/*
 * @Author: dengzeyuan 
 * @Date: 2018-10-15 14:43:26 
 * @File Description: 'Dialog对话框模态框' 
 */
 
<template>
  <div class="">
    <el-dialog
      :title="dialogModalOptions.title || '默认标题'"
      :visible.sync="show"
      :width="dialogModalOptions.width || '496px'"   
      :before-close="cancle"  
      :close-on-click-modal=false
      >
      <span class='content'>
        <slot></slot>
      </span>
      <span slot="footer" class="dialog-footer" v-if="dialogModalOptions.isShowFoot">
        <el-button type="primary" @click="sure" :disabled="dialogModalOptions.disabled">
            {{dialogModalOptions.btnSubmitText || "确定"}}
        </el-button>
        <el-button @click="cancle">
            {{dialogModalOptions.btnCancelText || "取消"}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["dialogModalOptions", "formDate"],
  data() {
    return {
      show: false
    };
  },
  watch: {
    dialogModalOptions(newval, oldval) {
      this.show = newval.show; //对话框打开
    }
  },
  components: {},
  methods: {
    restForm() {
      var _this = this;
      for (let key in this.formDate) {
        if(key == 'dataright'){
          this.formDate[key] = [];
        }else{
          this.formDate[key] = "";
        }
        
      }
      this.$parent.$refs["ruleForm"].resetFields();
      console.log('清空了')
    },
    //取消
    cancle(done) {
      this.show = false;
      if (typeof this.dialogModalOptions.btnCancelFunction === "function") {
        this.dialogModalOptions.btnCancelFunction();
      }
      this.restForm();
    },
    //确定
    sure(done) {
      this.$parent.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.filterFormDate(); //过滤
          this.show = false;
          if (typeof this.dialogModalOptions.btnSubmitFunction === "function") {
            this.dialogModalOptions.btnSubmitFunction(this.formDate);
          }
          // this.restForm();  //暂时先不用 编辑大屏报告时会出错
        } else {
          return false;
        }
      });
    },
    filterFormDate() {
      for (let key in this.formDate) {
        //过滤空的属性
        if (this.formDate[key] == "") {
          delete this.formDate[key];
        }
      }
    },
  },
  computed: {
    confirmOptions() {
      return this.$store.state.dialog_modalOptions
    }
  },
};
</script>

<style scoped lang="less">
</style>

 
