<template>
  <!-- <el-container> -->
    <el-header v-if="propobj.blankflag" class="header-nav">
      <div class="headimg">
        <div class="headphoto">
            <img :src="photos" alt="头像">
        </div>
        <span class="name">{{propobj.userinfo.userName}}</span>
        <!-- <span :class="[statusflag?'el-icon-arrow-down':'el-icon-arrow-up']"></span> -->
      </div>
      <!-- <el-dropdown> -->
        <!-- <i class="el-icon-bell"></i> -->
        <!-- <el-dropdown-menu slot="dropdown"> -->
          <!-- <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item> -->
        <!-- </el-dropdown-menu> -->
      <!-- </el-dropdown> -->
      <!-- <i class="el-icon-setting"></i> -->
      <!-- <span class="el-icon-setting"></span> -->
    </el-header>
  <!-- </el-container> -->
</template>
<script>
export default {
  props: ["propobj"],
  data(){
    return{
      statusflag:false,
      baesimgurl: "http://uc.weilian.cn/file-service/file-api.download?useOld=false&domain=user&type=photo&fileName=",
      online:{backgroundColor:"#4dff4d"},
      onleave:{backgroundColor:"#fcb316"},
      onbusy:{backgroundColor:"#bc2031"},
      onhidden:{backgroundColor:"#686868"},
      photos:''
    }   
  },
  mounted(){
    let self = this
    var time = setInterval(function(){
      self.photos = self.baesimgurl + sessionStorage.getItem("photo")
      if(sessionStorage.getItem("photo")){
        clearInterval(time)
      }
    },0)
  },
  computed:{
    
  },
  methods:{
    
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.header-nav {
  text-align: right;
  font-size: 12px;
  .headimg {
    float: left;
    height: 100%;
    width: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    background-color: #3a4051;
    position: relative;
    .headphoto{
        width:59px;
        height:59px;
        position: relative;
        img {
          width:100%;
          height:100%;
          border-radius: 50%;
          border: 2px solid #fff;
          overflow: hidden;
          display: inline-block;
        }
    }
    span {
      font-size:18px;
      color: #fff;
    }
    .name{
      margin-right: 30%;
    }
    span[class*='el-icon-arrow']{
      font-size:22px;
      cursor: pointer;
    }
    .userstatus{
        width: 100%;
        position: absolute;
        top: 80px;
        left: 0;
        z-index: 1;
        background-color: #3a3f50;
        display: flex;
        ul{
          width:100%;
          height:100%;
          li{
            color:#ffffff;
            display: flex;
            flex-direction: start;
            padding-left:10%;
            line-height: 50px;
            cursor: pointer;
            align-items: center;
              span{
              display: inline-block;
              width:10px;
              height:10px;
              margin-right: 10px;
              border-radius: 50%;
              }
          }
          li:hover{
            background-color: #4c65a4;
          }
        }
    }
  }
  .el-dropdown {
    width: 22px;
  }
  .el-icon-bell,
  .el-icon-setting {
    font-size: 22px;
    color: #fff;
    margin-right: 40px;
    margin-left: 2%;
  }
}
</style>
