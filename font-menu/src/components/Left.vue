<template>
    <div class="leftaside" v-if="blankflag">
      <div class="colecte-btn">
        <i class="iconfont icon-zuocelan"></i>
        <div class="cen">{{$route.meta.title}}</div>
      </div>
      <div class="leftpart">
        <el-menu  :default-active='activeIndex' :default-openeds="openeds" text-color="#ffffff" router  :collapse="isCollapse" @select="sends" :style="{padding:menucollapse}">
          <el-submenu index="1" >
            <template slot="title">
              <i class="iconfont icon-baogao"></i>
              <span slot="title">数据目录</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/homes">
                <span slot="title">首页</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/numSign">
                  <span slot="title">我的数签</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/forSigning">
                  <span slot="title">组织数签</span>
              </el-menu-item>
            </el-menu-item-group>
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
      iscollapsed:false,
      menucollapse:"",
      openeds: ['1'],
      activeIndex: '',
      isCollapse: false
    };
  },
  // computed:{
  //   activeIndexs(){
  //     this.sends(this.$route.path)
  //     return this.$route.path
  //   }
  // },
  mounted(){
    if(sessionStorage.getItem('indexShow')){
      this.activeIndex = sessionStorage.getItem('indexShow')
    }else{
      this.activeIndex = this.$route.path//要高亮的菜单index))
    }
    switch (this.activeIndex) {
      case "/homes":
        this.activeIndex = "/homes";
        break;
      case "/numSign":
        this.activeIndex = "/numSign";
        break;
      case "/forSigning":
        this.activeIndex = "/forSigning";
        break;
    }
  },
  watch: {
      activeIndex(newData,oldData) {
        sessionStorage.setItem('indexShow',this.activeIndex)
      }
  },
  methods: {
    collapeChange() {
      this.isCollapse = !this.isCollapse;
      this.iscollapsed=!this.iscollapsed;
      if(this.isCollapse){
        this.menucollapse = "18px 0px";
      }else{
        this.menucollapse = "";
      }
    },
    sends(index, indexpath) {
      switch (index) {
        case "/homes":
          this.activeIndex = "/homes";
          break;
        case "/numSign":
          this.activeIndex = "/numSign";
          break;
        case "/forSigning":
          this.activeIndex = "/forSigning";
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
      font-size:20px;
      margin-right:20px;
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
      margin-right:15px;
      width:auto;
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
