<template>
  <div class="">
    <Dialogcomponent :dialogobj="dialogobj"  v-on:dialog-cancle="dialogHandle" v-on:dialog-sure="dialogHandlesure">
        <div v-if="dialogobj.title=='编辑'">
          <el-form ref="form" :model="form">
             <el-form-item label="标题">
                <el-input v-model="form.themeName" :maxlength='20'></el-input>
              </el-form-item>
          </el-form>
          <el-form ref="form" :model="form">
             <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"  :maxlength='200'></el-input>
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
        </div>
        
          <!-- <el-form ref="form">
             <p>{{ remarks }}</p>
          </el-form> -->
        <!-- <div v-if="dialogobj.title=='修改性质分类'">
          <el-form ref="form" :model="form"> -->
             <!-- <el-form-item label="请选择变更的性质分类">
                <el-input v-model="form.remark"></el-input>
              </el-form-item> -->
              <!-- <el-select v-model="value" placeholder="请选择" @change="selectOp">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form>
        </div> -->
    </Dialogcomponent>
  </div>
</template>

<script>
import Dialogcomponent from "@/components/dialogcomponent.vue"; //弹窗样板外边框
export default {
  props: ["dialogOpt", "itemIds"],
  data() {
    return {
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
        themeName: "",
        propertyType: "",
        reportFormsId: "",
        remark: ""
      }
    };
  },
  watch: {
    itemIds() {
      this.form.themeName = this.itemIds.themeName;
      this.remarks = this.itemIds.remark;
      // this.value = this.itemIds.propertyType
      this.form.remark = this.itemIds.remark;
    }
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
    selectOp() {
      this.form.propertyType = this.value;
    },
    dialogHandlesure: function(message, type) {
      if (message == "编辑") {
        if (this.form.themeName == "") {
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
                message: "编辑成功!",
                type: "warning"
              });
              break;
          }
        }
      } else {
        //保存
        for (let key in this.form) {
          //过滤空的属性
          if (this.form[key] == "") {
            delete this.form[key];
          }
        }
        switch (message) {
          case "删除":
            this.$emit("handlesure-dialog", message, type, this.form);
            this.$message({
              message: "删除成功!",
              type: "warning"
            });
            break;
          case "备注":
            this.$emit("handlecancle-dialog", message, type);
            break;
        }
      }
    },
    dialogHandle: function(message, type) {
      //取消
      this.form.themeName = this.itemIds.themeName;
      this.form.remark = this.itemIds.remark;
      this.$emit(
        "handlecancle-dialog",
        this.itemIds.themeName,
        this.itemIds.remark,
        type
      );
    }
  }
};
</script>

<style scoped lang="less">
</style>
