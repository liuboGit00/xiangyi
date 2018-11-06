<template>
  <div class="define-select-group">
      <div class="group-content" v-if="module == 'reportwatch'">   
         <!-- //报告查看 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="报表类型">
                <el-select v-model="value1" @change="selectNum1" placeholder="">
                <el-option
                  v-for="item in options1"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性质分类">
                <el-select v-model="value2" @change="selectNum2" placeholder="">
                <el-option
                  v-for="item in options2"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主题分类">
                <el-select v-model="value" @change="selectNum" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="formInline.reportFormsTitle" placeholder="请输入报表标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>  
            </el-form-item>
        </el-form>
      </div>
      <div class="group-content" v-if="module == 'reportheme'">   
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="主题名">
                <el-input v-model="formInline.themeName" placeholder="请输入主题报表名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
export default {
  props: ["module"],
  data() {
    return {
      options: [],
      items1: [],
      items: [],
      value: "",
      value1: "",
      value2: "",
      options1: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "分组表"
        },
        {
          value: "2",
          label: "垂直柱状图"
        },
        {
          value: "4",
          label: "折线图"
        },
        {
          value: "5",
          label: "饼图"
        }
      ],
      options2: [
        {
          value: "",
          label: "全部"
        },
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
      formInline: {
        themeId: "",
        themeName: "",
        formsType: "",
        propertyType: "",
        templateName: "",
        reportFormsTitle: "",
        publishStatus: ""
      }
    };
  },
  created() {
    let self = this;
    //判断第一次页面进入
    if (window.location.href.indexOf("sessionId") != -1) {
      self.axios
        .get("/users/" + window.location.href.split("=")[1])
        .then(res => {
          localStorage.setItem("sessionId", window.location.href.split("=")[1]);
          this.themeName();
        });
    } else {
      self.axios
        .get("/users/" + localStorage.getItem("sessionId"))
        .then(res => {
          this.themeName();
        });
    }
  },
  methods: {
    themeName() {
      let self = this;
      server.reportmergerlen(function success(res) {
        let data = res.data.data;
        self.items1 = data.list;
        self.options.push({ value: "", label: "全部" });
        self.items1.map(val => {
          self.options.push({ value: val.themeId, label: val.themeName }); //获取主题名称
        });
      });
    },
    selectNum() {
      this.formInline.themeId = this.value;
    },
    selectNum1() {
      this.formInline.formsType = this.value1;
    },
    selectNum2() {
      this.formInline.propertyType = this.value2;
      //  console.log(this.options2[this.formInline.propertyType].label)
    },
    onSubmit() {
      for (let key in this.formInline) {
        //过滤空的属性
        if (this.formInline[key] == "") {
          delete this.formInline[key];
        }
      }
      this.$emit("submit-query", this.formInline);
    }
  }
};
</script>

<style scoped lang="less">
.define-select-group {
  // margin-top: 0;
  // position: fixed;
  // top: 80px;
  // left: 0;
  // width: 85%;
  // z-index: 2;
  // margin-left: 240px;
  width: calc(100% + 80px);
  float: left;
  margin-left: -40px;
  background: #4b63a7;
  //   margin-left: -40px;
  //   margin-right: -40px;
  //   margin-top: -30px;
  height: 120px;
  padding-left: 40px;
  padding-right: 40px;
  .group-content {
    height: 120px;
    display: flex;
    align-items: center;
    padding-right: 20px;
    form {
      width: 100%;
      .el-form-item:last-child button {
        padding: 6px 12px;
      }
    }
  }
}
.define-select-group .el-form-item:last-child {
  float: right;
  margin-right: 0;
}
.clearfix.content-frame div.receivelist {
  border: 0;
}
</style>
<style>
.define-select-group input.el-input__inner:last-child {
  cursor: auto;
  width: 198px;
}
</style>


