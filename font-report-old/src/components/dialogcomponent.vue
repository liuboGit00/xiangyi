<template>
  <div class="">
    <el-dialog
      :title="dialogVisibles.title"
      :visible.sync="dialogVisibles.dialogflag"
      :width="dialogVisibles.width"      
      :before-close="handleClose"
      >
      <span class='content'><slot></slot></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure" :disabled="dialogVisibles.disabled">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["dialogobj"],
  data() {
    return {};
  },
  computed: {
    dialogVisibles: function() {
      return this.dialogobj; //包扣（宽度，标题，showflag）
    }
  },
  components: {},
  methods: {
    // handlechildren(event){      //点击内容区域
    //       let key = event.target.className; //通过class来辨别选择的元素
    //       switch (key) {
    //           case "text":
    //               console.log("点击内容了")
    //               break;
    //           default:
    //               break;
    //       }
    //   },
    cancle(done) {
      this.$emit("dialog-cancle", this.dialogVisibles.title, "close");
    },
    sure(done) {
      this.$emit("dialog-sure", this.dialogVisibles.title, "sure");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.cancle();
          // done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped lang="less">
</style>
