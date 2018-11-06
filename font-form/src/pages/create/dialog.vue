<template>
  <div class="">
    <Dialogcomponent :dialogobj="dialogobj"  v-on:dialog-cancle="dialogHandle" v-on:dialog-sure="dialogHandlesure">
        <div v-if="dialogobj.title=='编辑'">
          <el-form :inline="true" :model="form">
             <el-form-item label="报表标题">
                <el-input v-model="form.reportFormsTitle" :maxlength='20'></el-input>
              </el-form-item>
             <!-- <el-form-item label="请选择变更的性质分类">
                <el-input v-model="form.remark"></el-input>
              </el-form-item> -->
            <el-form-item label="性质分类">
                <el-select v-model="form.propertyType" placeholder="模板分类" style="width:203px">
                <el-option label="财务" value="1"></el-option>
                <el-option label="人力" value="2"></el-option>
                <el-option label="固资" value="3"></el-option>
                <el-option label="运营" value="4"></el-option>
                <el-option label="生产" value="5"></el-option>
                <el-option label="其他" value="6"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="主题分类">
                <el-select v-model="value" placeholder="模板分类" @change="selectNum" style="width:203px">
                <el-option
                  v-for="item in options"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
                <span class='el-icon-plus' @click="theTheme"></span>
            </el-form-item>
             <el-form-item label="备 注" class='rightMag' style="margin-left:25px">
                <el-input type="textarea" v-model="form.remark" :maxlength='200'></el-input>
              </el-form-item>
          </el-form>
        </div>
    </Dialogcomponent>
    <el-dialog
      title="填写主题名称和备注"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form>
        <el-form-item label="主题名称">
          <el-input v-model="Name" :maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="themeNas" :maxlength='200'></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="themeSave">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Dialogcomponent from "@/components/dialogcomponent.vue"; //弹窗样板外边框
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  props: ["dialogOpt"],
  data() {
    return {
      Name: "",
      themeNas: "",
      centerDialogVisible: false,
      options: [],
      value: "",
      // 表单数据
      // form: {
      //   reportFormsTitle:"",
      //   propertyType:'',
      //   reportFormsId:"",
      // },
      form: {
        remark: "",
        themeId: "",
        reportFormsTitle: "",
        formsType: "",
        propertyType: "",
        templateName: "",
        reportFormsTitle: "",
        publishStatus: ""
      },
      formId: 4,
      items: []
    };
  },
  // updated() {
  //   this.ajaxshow();
  // },
  mounted() {
    this.ajaxshow();
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
    theTheme() {
      this.centerDialogVisible = true;
    },
    themeSave() {
      let self = this;
      if (self.Name == "") {
        this.$message({
          message: "请填写主题名称!",
          type: "warning"
        });
      } else if (self.themeNas == "") {
        this.$message({
          message: "请填写备注!",
          type: "warning"
        });
      } else {
        self.options = [];
        let params = Object.assign({
          themeName: self.Name,
          remark: self.themeNas
        });
        server.reportmergerTheme(params, function success(res) {
          //接口请求、
          self.ajaxshow();
        });
        self.Name = "";
        self.themeNas = "";
        self.centerDialogVisible = false;
      }
    },
    ajaxshow() {
      //ajax请求数据
      let self = this;
      server.reportmergerlen(function success(res) {
        //接口请求、
        let data = res.data.data;
        data.list.map(val => {
          self.options.push({ value: val.themeId, label: val.themeName }); //获取主题名称
        });
      });
    },
    selectNum() {
      this.form.themeId = this.value;
    },
    selectOp() {
      this.form.propertyType = this.value;
    },
    dialogHandlesure: function(message, type) {
      //保存
      if (this.form.reportFormsTitle == "") {
        this.$message({
          message: "请填写报表标题!",
          type: "warning"
        });
        return;
      } else if (this.form.propertyType == "") {
        this.$message({
          message: "请填写性质分类!",
          type: "warning"
        });
        return;
      } else if (this.form.value == "") {
        this.$message({
          message: "请填写主题分类!",
          type: "warning"
        });
        return;
      } else if (this.form.remark == "") {
        this.$message({
          message: "请填写备注!",
          type: "warning"
        });
        return;
      } else {
        for (let key in this.form) {
          //过滤空的属性
          if (this.form[key] == "") {
            delete this.form[key];
          }
        }
        switch (message) {
          case "编辑":
            this.$emit("handlesure-dialog", message, type, this.form);
            this.$message({
              message: "保存成功!",
              type: "warning"
            });
            break;
        }
      }
    },
    dialogHandle: function(message, type) {
      //取消
      this.value = ''
      this.$emit("handlecancle-dialog", message, type);
    }
  }
};
</script>

<style scoped lang="less" scoped>
.rightMag {
  margin-right: 25px;
}
</style>
