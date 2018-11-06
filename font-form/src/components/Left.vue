<template>
    <div class="leftaside" v-if="blankflag">
      <div class="colecte-btn">
        <i @click="collapeChange"  class="iconfont" :class="[iscollapsed ? 'icon-shanchu1' : 'icon-zuocelan']"></i>
        <div class="cen">{{modulestitle}}</div>
      </div>
      <div class="leftpart">
        <el-menu  :default-active='activeIndex' text-color="#ffffff" router  :collapse="isCollapse" @select="sends" :style="{padding:menucollapse}">
          <!-- <el-menu-item index="/homes">
            <i class="iconfont icon-shouye"></i>
            <span class="oneleve" slot="title" >首页</span>
          </el-menu-item> -->
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-baogao"></i>
              <span slot="title">报表中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/reportwatch">
                <span slot="title">报表查看</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/reportcreate">
                <span slot="title">报表新建</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/reportheme">
                <span slot="title">主题报表</span>
              </el-menu-item>
            </el-menu-item-group>
            <!-- <el-submenu index="1-1">
              <span slot="title" class="twoleve">报告编辑</span>
              <el-menu-item index="/editchoicetemp">
                <span slot="title">大屏</span>
              </el-menu-item>
              <el-menu-item index="/editchoicerepot">
                <span slot="title">报告</span>
              </el-menu-item>              
            </el-submenu> -->
            <!-- <el-menu-item-group>
              <el-menu-item index="/reportpublic">
                  <span slot="title"  >报告发布</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/reportreceive">
                  <span slot="title"  >报告接收</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/reporttemplate">
                  <span slot="title">报告模板</span>
              </el-menu-item>
            </el-menu-item-group> -->
          </el-submenu>
        </el-menu>
      </div>
    </div>
</template>
<script>
export default {
  props: ["blankflag"],
  data() {
    return {
      iscollapsed: false,
      menucollapse: "",
      activeIndex: this.$route.path,
      isCollapse: false,
      modulestitle: "报表查看"
    };
  },
  watch: {
    $route() {
      this.activeIndex = this.$route.params.index; //要高亮的菜单index))
    }
  },
  methods: {
    collapeChange() {
      this.isCollapse = !this.isCollapse;
      this.iscollapsed = !this.iscollapsed;
      if (this.isCollapse) {
        this.menucollapse = "18px 0px";
      } else {
        this.menucollapse = "";
      }
    },
    sends(index, indexpath) {
      switch (index) {
        case "/home":
          this.modulestitle = "首页";
          break;
        case "/reportwatch":
          this.modulestitle = "报表查看";
          break;
        case "/reportcreate":
          this.modulestitle = "报表新建";
          break;
        case "/reportheme":
          this.modulestitle = "主题报表";
          break;
        case "/editchoicetemp":
          this.modulestitle = "大屏";
          break;
        case "/editchoicerepot":
          this.modulestitle = "报告";
          break;
        case "/reportpublic":
          this.modulestitle = "报告发布";
          break;
        case "/reportreceive":
          this.modulestitle = "报告接收";
          break;
        case "/reporttemplate":
          this.modulestitle = "报告模板";
          break;
      }
    }
  }
};
</script>
<style  scoped lang="less">
.leftaside {
  .colecte-btn {
    position: absolute;
    top: 27px;
    left: 280px;
    z-index: 1;
    i {
      color: #ffffff;
      font-size: 20px;
      margin-right: 20px;
      cursor: pointer;
    }
    .el-icon-tickets:before {
      font-size: 23px;
      margin-right: 0px;
      color: white;
      cursor: pointer;
    }
    .cen {
      display: inline-block;
      line-height: 24px * 1.5;
      font-size: 24px;
      color: #ffffff;
    }
  }
  .leftpart {
    i {
      color: #ffffff;
      margin-right: 15px;
      width: auto;
    }
    span {
      font-size: 18px;
    }
    .el-menu {
      padding: 18px 12px;
    }
    // .el-menu-item {
    //   height: 42px;
    //   line-height: 42px;
    //   border-radius: 4px;
    // }
    .el-menu .el-menu-item.is-active:hover span,
    .el-menu-item:hover * {
      color: #ffffff;
    }
    .el-menu-item.is-active * {
      color: #278df6;
    }
  }
}
</style>
