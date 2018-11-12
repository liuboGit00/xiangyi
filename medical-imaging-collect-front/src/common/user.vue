<template>
  <div class="sidebar">
      <el-menu class="sidebar-el-menu"  :default-active='onRoutes' background-color="#3a3f50" text-color="#dcdcdc" active-color="#278df6" router unique-opened >
        <el-menu-item index="">
          <i class="icon iconfont icon-qiguan"></i>
          <span slot="title" >个人账号</span>
        </el-menu-item>
        <el-menu-item index="">
            <i class="icon iconfont icon-xinxi"></i>
            <span slot="title">账号安全</span>
        </el-menu-item>
        <el-menu-item index="">
            <i class="icon iconfont icon-tuxiang"></i>
            <span slot="title">帮助与反馈</span>
        </el-menu-item>
        <el-menu-item index="">
            <i class="icon iconfont icon-xinxi"></i>
            <span slot="title">关于</span>
        </el-menu-item>
        <el-menu-item index="" @click="logOut">
            <i class="icon iconfont icon-tuxiang"></i>
            <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  props:['power'],
  data() {
    return {
      onRoutes:'logOut',
      powerList:[],
      powerListName:'',
      leftOne:false,
      leftTwo:{
        type:false,
        name:''
      },
      leftThree:false
    };
  },
  computed: {
    
  },
  watch:{
    
  },
  methods:{
    logOut(){
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem("leftList")
        this.$router.push({path:'/login'})
      }).catch(() => {
        return       
      });
    }
  },
  created() {
    
  }
};
</script>

<style lang='less' scoped>
@import "../assets/less/variable.less";

.sidebar {
  display: block;
  position: absolute;
  left: 0px;
  top: 60px;
  bottom: 0;
  overflow: hidden;
  background-color: #3a3f50;
  ul[role='menubar']>li{
    text-align:left;
  }
  .sidebar-el-menu {
    margin-top: 18px;
  }
  .el-menu-item {
    font-size: @font-nav-lv1;
    height: 42px;
    line-height: 42px;
    width: 216px;
    margin: auto;
    text-align: center;
    /*   & .is-active{
        background-color: #278df6;
        border-radius: 5px;
      } */
  }
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar > ul {
  height: 100%;
}
.sidebar > ul > li span{
  font-size:14px;
}
.icon {
  margin-right: 10px;
}
</style>
<style>
.sidebar-el-menu .el-menu-item.is-active{
    color: rgb(179, 179, 179);
    background-color: #04081e!important;
}
</style>

