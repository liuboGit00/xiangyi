<template>
  <div class="define-select-group">
      <div class="group-content" v-if="module == 'reportwatch'" :class="{reportwatch:module == 'reportwatch'}">   
         <!-- //报告查看 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline ">
            <el-form-item label="客户端 :" class="client">
                <el-select v-model="formInline.clientType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="PC端" value="1"></el-option>
                <el-option label="移动端" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报告分类 :" class="category">
                <el-select v-model="formInline.showType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="大屏" value="1"></el-option>
                <el-option label="报告" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态 :" class="status">
                <el-select v-model="formInline.publishStatus" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="未发布" value="0"></el-option>
                <el-option label="已发布" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词 :" class="keys">
                <el-input v-model="formInline.reportTitle" placeholder="请输入报告标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="group-content" v-if="module == 'reporttemplate'" :class="{reporttemplate:module == 'reporttemplate'}">  
         <!-- //报告模板 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="客户端 :" class="client">
                <el-select v-model="formInline.clientType" placeholder="活动区域">
                <el-option label="全部" value=""></el-option>
                <el-option label="PC端" value="1"></el-option>
                <el-option label="移动端" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报告类别 :" class="category">
                <el-select v-model="formInline.showType" placeholder="模板分类">
                <el-option label="全部" value=""></el-option>
                <el-option label="大屏" value="1"></el-option>
                <el-option label="报告" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词 :" class="keys">
                <el-input v-model="formInline.templateName" placeholder="请输入模板名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="group-content" v-if="module == 'reportpublic'" :class="{reportpublic:module == 'reportpublic'}">  
         <!-- //报告发布 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" >
            <el-form-item label="客户端 :" class="client">
                <el-select v-model="formInline.clientType" placeholder="" >
                <el-option label="全部" value=""></el-option>
                <el-option label="PC端" value="1"></el-option>
                <el-option label="移动端" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报告分类 :" class="categy">
                <el-select v-model="formInline.showType" placeholder="" >
                <el-option label="全部" value=""></el-option>
                <el-option label="大屏" value="1"></el-option>
                <el-option label="报告" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词 :" class="keys">
                <el-input v-model="formInline.reportTitle" placeholder="请输入发布标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="group-content" v-if="module == 'reportreceive'" :class="{reportreceive:module == 'reportreceive'}">  
         <!-- //报告发布 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" >
            <el-form-item label="客户端 :" class="client">
                <el-select v-model="formInline.clientType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="PC端" value="1"></el-option>
                <el-option label="移动端" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="处理状态 :" class="status">
                <el-select v-model="formInline.isReply" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="已回复" value="1"></el-option>
                <el-option label="未回复" value="0"></el-option>
                <el-option label="已过期" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接收时间 :" class="timer">
                <el-date-picker
                    :class="{timePicker:module == 'reportreceive'}"
                    popper-class='datePicker timePicker'
                    v-model="formInline.time"
                    type="dates"
                    placeholder="选择多个日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="报告分类 :" class="category">
                <el-select v-model="formInline.showType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="大屏" value="0"></el-option>
                <el-option label="报告" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词 :" class="keys">
                <el-input v-model="formInline.receiveReportTitle" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="group-content ReportDashboardTemp" v-if="module == 'Report-dashboardTemp'">
        <el-form :inline="true" :model="formInline" class="demo-form-inline"  >
            <el-form-item label="搜索：" class="dashTemp-search">
                <el-input v-model="formInline.templateName" placeholder="请搜索要查询的模板名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["module"],
  data() {
    return {
      formInline: {
        clientType: "",
        showType: "",
        isRead: "",
        templateName: "",
        reportName: "",
        publishStatus: "",
        isReply: "",
        receiveReportTitle: "",
        reportTitle: "",
        time: "", //日期的数据
        templateName:"",//模板名称
      }
    };
  },
  methods: {
    onSubmit(param) {
      let formobj = Object.assign({}, this.formInline);
      for (let key in formobj) {
        //过滤空的属性
        if (formobj[key] == "") {
          delete formobj[key];
        }
      }
      this.$emit("submit-query", formobj);
      
    },
    resetData(){   //重置选择信息
      console.log('重置了')
      let formInline = this.formInline
      for(let key in formInline){
        formInline[key] = ""
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";
.define-select-group {
  width: 100%;
  background: #4b63a7;
  height: 120px;
  padding-left: 40px;
  padding-right: 40px;
  .group-content {
    height: 80px;
    width: 1046px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
    padding-left: 20px;
    form {
      width: 100%;
      .el-form-item:last-child button {
        padding: 6px 12px;
      }
    }
  }
  .underlinebtn {
    background-color: #ffffff;
    border-radius: 10px 10px 0 0;
  }
}
.define-select-group .el-form-item:last-child {
  float: right;
  margin-right: 0;
}
.clearfix.content-frame div.receivelist {
  border: 0;
}
//common
// .define-select-group .el-form-item__label {
//   font-size:18px;
//   padding:0;
//   margin-right:10px;
//   font-weight: normal;
//   font-stretch: normal;
//   letter-spacing: 0px;
//   color: #ffffff;
//   line-height: 32px;
// }
// .define-select-group .el-input{
//     font-size:14px;
// }
// .define-select-group input.el-input__inner {
//   cursor: pointer;
//   width: 123px;
//   height: 32px;
//   background-color: #435c9b;
//   box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
//   border-radius: 4px;
//   border: solid 1px #b7b7b7;
//   vertical-align: bottom;
//   color:#ffffff;
// }
// .define-select-group input::-webkit-input-placeholder {
//     font-size: 14px
// }
// .define-select-group .el-form-item__content {
//     line-height: 32px;
// }
// .define-select-group .el-form--inline .el-form-item{
//     margin-right: 2%;
//     margin-bottom:0;
// }
// .content-area{
//   width: 100%;
//   margin-top: -40px;
// }
</style>
<style lang='less'>
// 报告模板
.define-select-group .ReportDashboardTemp {
  .el-form-item:last-child {
    float: inherit;
    margin-left:60px;
  }
  input.el-input__inner {
    width: 288px;
    height: 32px;
    background-color: #4c65a4;
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    border: solid 1px #278df6;
  }
  .dashTemp-search{
    margin-left:22px;
  }
}

.el-select-dropdown__item {
  text-align: center;
}
.define-select-group {
  .el-form-item__label {
    //label文字大小
    font-size: 16px;
    padding: 0;
    margin-right: 10px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    line-height: 32px;
  }
  .el-input {
    font-size: 14px;
  }
  input.el-input__inner {
    cursor: pointer;
    width: 123px;
    height: 32px;
    vertical-align: center;
    background-color: #435c9b;
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    border: solid 1px #b7b7b7;
    color: #ffffff;
  }
  input::-webkit-input-placeholder {
    font-size: 14px;
  }
  .el-form--inline .el-form-item {
    margin-bottom: 0;
    line-height: 40px;
  }
  .content-area {
    width: 100%;
    margin-top: -40px;
  }
  //上为common样式
  .reportwatch {
    .el-form-item__label {
      //label文字大小
      font-size: 16px;
    }
    .el-form-item {
      margin-right: 35px;
    }
    .client {
      input.el-input__inner {
        width: 123px;
      }
    }
    .category {
      input.el-input__inner {
        width: 123px;
      }
    }
    .status {
      input.el-input__inner {
        width: 123px;
      }
    }
    .keys {
      input.el-input__inner {
        width: 145px;
      }
    }
  }
  .reportpublic {
    .el-form-item {
      margin-right: 60px;
    }
    .client {
      input.el-input__inner {
        width: 159px;
      }
    }
    .categy {
      input.el-input__inner {
        width: 180px;
      }
    }
    .keys {
      input.el-input__inner {
        width: 190px;
      }
    }
  }
  .reportreceive {
    .el-form-item__label {
      //label文字大小
      font-size: 16px;
    }
    .el-form-item {
      margin-right: 8px; //选择项的右偏移
    }
    .client {
      input.el-input__inner {
        width: 80px;
      }
    }
    .status {
      input.el-input__inner {
        width: 112px;
      }
    }
    .timer {
      input.el-input__inner {
        width: 160px;
      }
    }
    .category {
      input.el-input__inner {
        width: 92px;
      }
    }
    .keys {
      input.el-input__inner {
        width: 62px;
      }
    }
  }
  .reporttemplate {
    .el-form-item {
      margin-right: 45px; //选择项的右偏移
    }
    .client {
      input.el-input__inner {
        width: 189px;
      }
    }
    .category {
      input.el-input__inner {
        width: 180px;
      }
    }
    .keys {
      input.el-input__inner {
        width: 192px;
      }
    }
  }
  .selecttemplate {
    .el-form-item.selectleft {
      padding-left: 35px;
    }
    .el-form-item__label {
      //label文字大小
      font-size: 16px;
    }
    input.el-input__inner {
      width: 288px;
    }
    .el-form-item.selectright {
      margin-right: 500px;
    }
  }
}

//时间选择样式
.el-date-editor.el-input,  //时间选择输入框外部div的宽度
.el-date-editor.el-input__inner {
  width: 160px;
}

.timePicker.datePicker {
  background: #4c65a4;
  color: #ffffff;
}
.timePicker .el-picker-panel__footer {
  background: #4c65a4;
  padding: 5px;
}
.timePicker .el-button--mini,
.el-button--mini.is-round {
  background: #278df6;
  color: #ffffff;
}
.timePicker .el-date-picker__header {
  color: #ffffff;
  margin: 5px 18px;
}
.timePicker .el-date-picker__header-label {
  color: #ffffff;
  font-size: 13px;
}
.timePicker .el-picker-panel__icon-btn {
  color: #ffffff;
}
.timePicker .el-date-table th {
  color: #ffffff;
}
.timePicker.el-date-picker {
  width: 212px;
  height: 266px;
}
.timePicker.el-date-picker table {
  width: 64%;
}
.timePicker .el-date-table td div {
  height: 20px !important;
  padding: 0px;
}
.el-picker-panel {
  line-height: 2px;
}
.timePicker .el-date-table th {
  border-bottom: none;
}
.timePicker .el-picker-panel__content {
  margin: 11px 15px;
}
.timePicker .el-date-table td {
  height: 28px;
}
</style>


