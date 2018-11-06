<template>
  <div class="">
    <Dialogcomponent :dialogobj="dialogobj"  v-on:dialog-cancle="dialogHandle" v-on:dialog-sure="dialogHandlesure">
        <div v-if="dialogobj.title=='编辑'">
          <el-form ref="form" :model="form">
             <el-form-item label="编辑">
                <el-input v-model="form.reportFormsTitle" :required="true" :maxlength='20'></el-input>
              </el-form-item>
             <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark" :maxlength='200'></el-input>
              </el-form-item>
            <el-form-item label="性质分类">
              <el-select v-model='labels' placeholder="请选择" @change="selectOp">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
             </el-form-item>
          </el-form>
        </div>
        <div v-if="dialogobj.title=='删除'">
          <el-form ref="form" :model="form">
             <el-form-item label="">
                  是否确定删除？
              </el-form-item>
          </el-form>
        </div>
        <div v-if="dialogobj.title=='备注'">
          <el-form ref="form">
             <el-form-item label="备注">
                <el-input type="textarea" v-model="remarks"  :maxlength='200'>{{ remarks }}</el-input>
              </el-form-item>
          </el-form>
          <!-- <el-form ref="form">
             <p>{{ remarks }}</p>
          </el-form> -->
        </div>
    </Dialogcomponent>
  </div>
</template>

<script>
import Dialogcomponent from "@/components/dialogcomponent.vue"; //弹窗样板外边框
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  props: ["dialogOpt", "itemIds", "title"],
  data() {
    return {
      labels: "",
      remarks: "",
      options: [
        {
          value: "1",
          label: "财务"
        },
        {
          value: "2",
          label: "人力"
        },
        {
          value: "3",
          label: "固资"
        },
        {
          value: "4",
          label: "运营"
        },
        {
          value: "5",
          label: "生产"
        },
        {
          value: "6",
          label: "其他"
        }
      ],
      value: "",
      // 表单数据
      form: {
        reportFormsTitle: "",
        propertyType: "",
        remark: ""
      }
    };
  },
  watch: {
    itemIds() {
      this.form.reportFormsTitle = this.itemIds.reportFormsTitle;
      this.remarks = this.itemIds.remark;
      // this.value = this.itemIds.propertyType
      this.options.find(item => {
        //这里的userList就是上面遍历的数据源
        if (item.value == this.itemIds.propertyType) {
          //筛选出匹配数据
          this.labels = item.label; //我这边的name就是对应label的
        }
      });
      this.form.remark = this.itemIds.remark;
    }
  },
  mounted() {
    // this.form.reportFormsTitle = this.itemIds.reportFormsTitle
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
    selectOp(val) {
      this.form.propertyType = val;
    },
    dialogHandlesure: function(message, type) {
      //保存
      // for (let key in this.form) {
      //   //过滤空的属性
      //   if (this.form[key] == "") {
      //     delete this.form[key];
      //   }
      // }
      // switch (message) {
      //   case "备注":
      //     this.$emit("handlecancle-dialog", message, type);
      //     break;
      //   case "删除":
      //     this.$emit("handlesure-dialog", message, type, this.form);
      //     this.$message({
      //       message: "删除成功!",
      //       type: "warning"
      //     });
      //     break;
      //   // case "修改性质分类":
      //   //   this.$emit("handlesure-dialog", message, type, this.form);
      //   //   break;
      // }
      if (message == "编辑") {
        if (this.form.reportFormsTitle == "") {
          this.$message({
            message: "请填写编辑标题!",
            type: "warning"
          });
          return false;
        } else if (this.form.remark == "") {
          this.$message({
            message: "请填写备注!",
            type: "warning"
          });
          return;
        }
        //  else if (this.form.propertyType == "") {
        //   this.$message({
        //     message: "请填写性质分类!",
        //     type: "warning"
        //   });
        //   return;
        // } 
        else {
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
                message: "编辑成功!",
                type: "warning"
              });
              break;
          }
        }
      }
      if (message == "删除") {
        switch (message) {
          case "删除":
            this.$emit("handlesure-dialog", message, type, this.form);
            this.$message({
              message: "删除成功!",
              type: "warning"
            });
            break;
          // case "修改性质分类":
          //   this.$emit("handlesure-dialog", message, type, this.form);
          //   break;
        }
      }
    },
    dialogHandle: function(message, type) {
      //取消
      this.form.reportFormsTitle = this.itemIds.reportFormsTitle;
      this.form.remark = this.itemIds.remark;
      this.$emit(
        "handlecancle-dialog",
        this.itemIds.reportFormsTitle,
        this.itemIds.remark,
        type
      );
    }
  }
};
</script>

<style scoped lang="less">
</style>
