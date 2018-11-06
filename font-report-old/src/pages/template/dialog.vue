<template>
  <div class="">
    <Dialogcomponent :dialogobj="dialogobj"  v-on:dialog-cancle="dialogHandle" v-on:dialog-sure="dialogHandle">
        <div v-if="dialogobj.title=='编辑1'">{{dialogobj.title}}</div>
        <div v-if="dialogobj.title=='编辑2'">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div v-if="dialogobj.title=='编辑3'">{{"33333"}}</div>
    </Dialogcomponent>
  </div>
</template>

<script>
import Dialogcomponent from "@/components/dialogcomponent.vue"; //弹窗样板外边框
export default {
  props: ["dialogOpt"],
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  computed: {
    dialogobj: function() {
      let objs = Object.assign(this.dialogOpt);
      return objs;
    }
  },
  components: {
    Dialogcomponent
  },
  methods: {
    dialogHandle: function(message, type) {
      //弹窗保存/取消
      if (type == "close") {
        //取消
        switch (message) {
          case "编辑1":
            console.log("执行" + message);
            break;
          case "编辑2":
            console.log("执行" + message);
            break;
        }
      }
      if (type == "sure") {
        //保存
        switch (message) {
          case "编辑1":
            console.log("执行" + message);
            break;
          case "编辑2":
            console.log("执行" + message);
            break;
        }
      }
      this.$emit("select-dialog", message, type);
    }
  }
};
</script>

<style scoped lang="less">
</style>
