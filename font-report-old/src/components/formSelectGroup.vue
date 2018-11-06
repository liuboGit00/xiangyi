<template>
  <div class="define-select-group">
      <div class="group-content" v-if="module == 'reportwatch'">   
         <!-- //报告查看 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="客户端">
                <el-select v-model="formInline.clientType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="PC端" value="1"></el-option>
                <el-option label="移动端" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报告分类">
                <el-select v-model="formInline.showType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="大屏" value="1"></el-option>
                <el-option label="报告" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.publishStatus" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="未发布" value="0"></el-option>
                <el-option label="已发布" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="formInline.reportTitle" placeholder="请输入报告标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="group-content" v-if="module == 'reporttemplate'">  
         <!-- //报告模板 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="客户端">
                <el-select v-model="formInline.clientType" placeholder="活动区域">
                <el-option label="全部" value=""></el-option>
                <el-option label="PC端" value="1"></el-option>
                <el-option label="移动端" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模板分类">
                <el-select v-model="formInline.showType" placeholder="模板分类">
                <el-option label="全部" value=""></el-option>
                <el-option label="大屏" value="1"></el-option>
                <el-option label="报告" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="formInline.templateName" placeholder="请输入模板名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="group-content" v-if="module == 'reportpublic'">  
         <!-- //报告发布 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="客户端">
                <el-select v-model="formInline.clientType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="PC端" value="1"></el-option>
                <el-option label="移动端" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报告分类">
                <el-select v-model="formInline.showType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="大屏" value="1"></el-option>
                <el-option label="报告" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="formInline.reportTitle" placeholder="请输入发布标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="group-content" v-if="module == 'reportreceive'">  
         <!-- //报告发布 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="客户端">
                <el-select v-model="formInline.clientType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="PC端" value="1"></el-option>
                <el-option label="移动端" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报告分类">
                <el-select v-model="formInline.showType" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="大屏" value="1"></el-option>
                <el-option label="报告" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="读取">
                <el-select v-model="formInline.isRead" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="未读" value="0"></el-option>
                <el-option label="已读" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="回复">
                <el-select v-model="formInline.isReply" placeholder="">
                <el-option label="全部" value=""></el-option>
                <el-option label="未回复" value="0"></el-option>
                <el-option label="已回复" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="formInline.receiveReportTitle" placeholder="请输入接收标题"></el-input>
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
        reportTitle: ""
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
    height: 80px;
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
</style>
<style>
.define-select-group input.el-input__inner:last-child {
  cursor: auto;
  width: 198px;
}
</style>

