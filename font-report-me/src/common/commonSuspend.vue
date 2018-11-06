<template>
  <div class="commonSuspend">
    <!-- 根据路由显示单页面的内容，根据对象字段状态显示icon图标是否展示 -->
    <el-row v-if="$route.name == 'Report-watch'">
      <div v-if="parentItem.publishStatus == 0">
        <el-tooltip content="编辑报告" placement="bottom">
        <el-button name="编辑报告" icon="el-icon-edit-outline" circle size='small' @click="handleClick"></el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="bottom">
          <el-button name="删除" icon="el-icon-delete" circle size='small' @click="handleClick"></el-button>
        </el-tooltip>
        <el-tooltip content="修改信息" placement="bottom">
          <el-button name="修改信息" icon="el-icon-edit" circle size='small' @click="handleClick"></el-button>
        </el-tooltip>
        <el-tooltip content="备注信息" placement="bottom">
          <el-button name="备注信息" icon="el-icon-document" circle size='small' @click="handleClick"></el-button>
        </el-tooltip>
      </div>   
      <div v-if="parentItem.publishStatus == 1">
        <el-tooltip content="备注信息" placement="bottom">
          <el-button name="备注信息" icon="el-icon-document" circle size='small' @click="handleClick"></el-button>
        </el-tooltip>
        <el-tooltip content="回复信息" placement="bottom">
          <el-button name="回复信息" icon="el-icon-message" circle size='small' @click="handleClick"></el-button>
        </el-tooltip>
      </div>
    </el-row>
    <el-row v-if="$route.name == 'Report-template'">
      <el-tooltip content="备注信息" placement="bottom">
        <el-button name="备注信息" icon="el-icon-document" circle size='small' @click="handleClick"></el-button>
      </el-tooltip>
    </el-row>
    <el-row v-if="$route.name == 'Report-public'">
      <div v-if="!parentItem.ispublish">
        <el-tooltip content="编辑报告" placement="bottom">
        <el-button name="编辑报告" icon="el-icon-edit-outline" circle size='mini'  @click="handleClick"></el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="bottom">
          <el-button name="删除" icon="el-icon-delete" circle size='mini'  @click="handleClick"></el-button>
        </el-tooltip>
        <el-tooltip content="修改信息" placement="bottom">
          <el-button name="修改信息" icon="el-icon-edit" circle size='mini'  @click="handleClick"></el-button>
        </el-tooltip>
        <el-tooltip content="备注信息" placement="bottom">
          <el-button name="备注信息" icon="el-icon-document" circle size='mini'  @click="handleClick"></el-button>
        </el-tooltip>
      </div>
      <div v-if="parentItem.ispublish">
        <el-tooltip content="备注信息" placement="bottom">
          <el-button name="备注信息" icon="el-icon-document" circle size='mini'  @click="handleClick"></el-button>
        </el-tooltip>
        <el-tooltip content="回复信息" placement="bottom">
          <el-button name="回复信息" icon="el-icon-message" circle size='mini'  @click="handleClick"></el-button>
        </el-tooltip>
      </div>
    </el-row>
    <el-row v-if="$route.name == 'Report-receive'"  :class="{R_receive:$route.name == 'Report-receive'}">
      <el-tooltip content="删除报告" placement="bottom">
        <el-button name='删除报告' icon="el-icon-delete" circle size='small' @click="handleClick"></el-button>
      </el-tooltip>
      <el-tooltip content="修改标题" placement="bottom">
        <el-button name="修改标题" icon="el-icon-edit-outline" circle size='small'  @click="handleClick"></el-button>
      </el-tooltip>
    </el-row>  
    <el-row v-if="$route.name == 'Report-dashboardTemp'">
        <el-tooltip content="备注信息" placement="bottom">
          <el-button name="备注信息" icon="el-icon-document" circle size='mini'  @click.stop="handleClick"></el-button>
        </el-tooltip>
    </el-row>
    <el-row v-if="$route.name == 'Report-editChoiceTemp'">
        <el-tooltip content="备注信息" placement="bottom">
          <el-button name="备注信息" icon="el-icon-document" circle size='mini'  @click.stop="handleClick"></el-button>
        </el-tooltip>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["parentItem"],
  data() {
    return {};
  },
  methods: {
    handleClick(el) {
      this.parentItem.handleName = el.target.parentNode.name;
      this.$emit("handClick-suspend", this.parentItem);
    }
  }
};
</script>
<style scoped lang="less">
.multipletitle {
  height: 63px;
  line-height: 63px;
  position: absolute;
  width: 100%;
  bottom: 0px;
  .el-button {
    width: 30px;
    height: 30px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 16px;
    text-align: center;
    border: 0;
  }
}
.multipletitle::before {
  content: " ";
  display: block;
  height: 1px;
  background-color: #fff;
  width: 245px;
  opacity: 0.66;
  margin: 0 auto;
}
.el-button--small.is-circle{
  padding: 7px;
}
.multipletitle.bottom {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: rgba(0, 0, 0, 0.3);
  .el-button {
    width: 30px;
    height: 30px;
    color: #fff;
    background-color: transparent;
    font-size: 14px;
    text-align: center;
    border: 0;
  }
}

.multipletitle.top {
  top: 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: rgba(0, 0, 0, 0.3);
  .el-button {
    width: 30px;
    height: 30px;
    color: #fff;
    background-color: transparent;
    font-size: 14px;
    text-align: center;
    border: 0;
  }
}
.multipletitle.top::before,
.multipletitle.bottom::before {
  display: none;
}
</style>