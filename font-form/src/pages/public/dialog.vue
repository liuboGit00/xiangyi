<template>
  <div class="">
    <Dialogcomponent :dialogobj="dialogobj"  v-on:dialog-cancle="dialogHandle" v-on:dialog-sure="dialogHandle">
        <div v-if="dialogobj.title=='发布'">
            <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入城市拼音"
                v-model="value2"
                :data="data2">
            </el-transfer>
            <el-form ref="form" :model="form" label-width="">
                <el-form-item label="是否允许二次转发">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="紧急程度">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="加急"></el-radio>
                    <el-radio label="紧急"></el-radio>
                    <el-radio label="正常"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="有效期限">
                    <el-col :span="9">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="8">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc" :maxlength="200"></el-input>
                </el-form-item>
            </el-form>
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
    const generateData2 = _ => {
      const data = [];
      const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu"
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };

    return {
      // 表单数据
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

      // 穿梭框数据
      data2: generateData2(),
      value2: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
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
