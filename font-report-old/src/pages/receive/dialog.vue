<template>
  <div class="">
    <Dialogcomponent :dialogobj="dialogobj"   v-on:dialog-cancle="dialogHandle" v-on:dialog-sure="dialogHandlesure">
        <div v-if="dialogobj.title=='回复'">
          <el-form ref="ruleForm2" :model="form" :rules="rules2">
              <el-form-item label="请输入要回复的内容" prop="replyContent">
                <el-input type="textarea" v-model="form.replyContent" maxlength="200"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div v-if="dialogobj.title=='已回复'">
          <el-form ref="ruleForm2" :model="form" :rules="rules2">
              <div>{{form.replyContent}}</div>
          </el-form>
        </div>
        <div v-if="dialogobj.title=='修改'">
          <el-form ref="ruleForm2" :model="form" :rules="rules2">
              <el-form-item label="修改标题"  prop="receiveReportTitle">
                <el-input v-model="form.receiveReportTitle" auto-complete="off" :maxlength='20'></el-input>
              </el-form-item>
              <!-- <el-form-item label="修改备注">
                  <el-input type="textarea" v-model="form.remark" :maxlength='200'></el-input>
              </el-form-item> -->
          </el-form>
        </div>
        <div v-if="dialogobj.title=='删除'">
            <div style="width:100%;height:100%;display:flex;justify-content:center;font-size:20px;color:#6c6e70;">确定删除？</div>            
        </div>
    </Dialogcomponent>
  </div>
</template>

<script>
import Dialogcomponent from "@/components/dialogcomponent.vue"; //弹窗样板外边框
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  props: ["dialogOpt", "reportsmodel"],
  data() {
    var validatePass = (rule, value, callback) => {
      //表单验证
      if (value === "" || value === undefined) {
        callback(new Error("输入内容不能为空"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      form: {
        //保存的表单
        receiveReportTitle: "",
        remark: "",
        usefulTime1: "",
        usefulTime2: "",
        urgentType: "",
        allowTwice: "",
        replyContent: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules2: {
        //表单验证
        replyContent: [
          // { validator: validatePass, trigger: 'blur' }
          { required: true, message: '输入内容不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  mounted (){
    console.log(this.form)
  }  
  ,
  computed: {
    dialogobj: function() {
      let objs = Object.assign(this.dialogOpt);
      return objs;
    }
  },
  components: {
    Dialogcomponent
  },
  watch: {
    reportsmodel() {
      this.form.receiveReportTitle = this.reportsmodel.receiveReportTitle;
      this.form.replyContent = this.reportsmodel.replyContent;
      // this.form.remark = this.reportsmodel.remark;
      // this.form.replyContent = this.replyContent;
    },
    // sendContent() {
    //   console.log(this.sendContent)
    //   this.form.replyContent = this.sendContent;
    // }
  },
  methods: {
    submitForm(formName, message, type) {
      //表单验证提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过
          this.$emit("handlesure-dialog", message, type, this.form); //对话框保存
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //表单验证重置
      this.$refs[formName].resetFields();
    },

    dialogHandlesure: function(message, type) {
      //保存操作
      for (let key in this.form) {
        //过滤空的属性
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      switch (message) {
        case "保存":
          this.submitForm("ruleForm2", message, type); //表单验证
          break;
        case "发布":
          this.form["receiveUserId"] = this.dataright;
          this.$emit("handlesure-dialog", message, type, this.form);
          break;
        case "回复":
          this.submitForm("ruleForm2", message, type); //表单验证
          break;
        case "已回复":
          this.submitForm("ruleForm2", message, type); //表单验证
          break;
        case "修改":
          this.submitForm("ruleForm2", message, type); //表单验证
          break;
        case "删除":
          this.$emit("handlesure-dialog", message, type, this.form);
          break;
      }
      this.form = {
        //保存的表单
        reportTitle: "",
        remark: "",
        usefulTime1: "",
        usefulTime2: "",
        urgentType: "",
        allowTwice: "",
        replyContent: this.sendContent
      };
    },

    dialogHandle: function(message, type) {
      //取消操作
      (this.form = {
        //保存的表单
        reportTitle: this.reportsmodel.reportTitle,
        remark: this.reportsmodel.remark,
        usefulTime1: "",
        usefulTime2: "",
        urgentType: "",
        allowTwice: "",
        replyContent: this.replyContent
      }),
        this.$emit("handlecancle-dialog", message, type);
    }
  }
};
</script>

<style scoped lang="less">
</style>
