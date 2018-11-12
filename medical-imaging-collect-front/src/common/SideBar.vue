<template>
  <div class="sidebar">
      <el-menu class="sidebar-el-menu"  :default-active='onRoutes' background-color="#3a3f50" text-color="#dcdcdc" active-color="#278df6" router unique-opened >
        <el-menu-item index="/apparatus" v-show="leftOne">
          <i class="icon iconfont icon-qiguan"></i>
          <span slot="title" >样本创建</span>
        </el-menu-item>
        <el-menu-item index="/patient-upload" v-show="leftTwo.type">
            <i class="icon iconfont icon-xinxi"></i>
            <span slot="title">{{leftTwo.name}}</span>
        </el-menu-item>
        <el-menu-item index="/patient-search" v-show="leftThree">
            <i class="icon iconfont icon-tuxiang"></i>
            <span slot="title">样本查询</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  props:['power'],
  data() {
    return {
      onRoutes:'',
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
    $route(){
      let a = this.$route.path
      if(a == '/patient-upload'){
        console.log(this.leftTwo.name)
        this.$emit("title",this.leftTwo.name)
      }else if(a == '/apparatus'){
        this.$emit("title",'样本创建')
      }else if(a == '/patient-search'){
        this.$emit("title",'样本查询')
      }else if(a == "/patient-newForm"){
        this.$emit("title",'样本创建')
      }

      if(a == '/patient-newForm'){
        this.onRoutes = '/apparatus'
      }else if(a == '/patient-upload'){
        this.onRoutes = '/patient-upload'
      }
    },
    power(){
      this.powerList = this.power
      if(this.powerList.length == 3){
        this.powerListName = '样本提交'
      }else{
        this.powerListName = this.powerList[0].name
      }
    }
  },
  created() {
    for(let i of JSON.parse(sessionStorage.getItem("leftList"))){
      if(i.name == '样本创建'){
        this.leftOne = true
      }else if(i.name == '样本查询'){
        this.leftThree = true
      }else{
        this.leftTwo.type = true
        this.leftTwo.name = i.name
      }
    }
    if(this.$route.path == '/patient-newForm'){
      this.onRoutes = '/apparatus'
    }else{
      this.onRoutes = this.$route.path
    }
    let a = this.$route.path
    if(a == '/patient-upload'){
      this.$emit("title",this.leftTwo.name)
    }else if(a == '/apparatus'){
      this.$emit("title",'样本创建')
    }else if('/patient-search'){
      this.$emit("title",'样本查询')
    }
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

