<template>
  <div class="header">
    <div class="user">
    <span class="active">
      <img :src="userInfo.url" alt="">
    </span>
      <span class="name ">{{userInfo.user}}</span>
      <i class="more icon iconfont icon-jiantou1" @click="cut" ></i>
    </div>
    <!-- 折叠按钮 -->
    <div class="collapse-btn">
      <i title='收缩' class='icon iconfont icon-shousuo'></i>
    </div>
    <div class="header-title">{{title}}</div>

  </div>
</template>
<script>
  export default {
    props:["title"],
    data() {
      return {
        userInfo:{
          user:'',
          url:''
        },
        style:true,
        showType:{
          transform : 'rotateZ(180deg)'
        }
      }
    },
    created(){
      console.log()
      // if(this.$route.meta.title == ''){
      //   let title = JSON.parse(sessionStorage.getItem("leftList"))
      //   if(title.length === 3){
      //       this.$route.meta.title = '样本提交'
      //   }else{
      //       this.$route.meta.title = title[0].name
      //   }
      //  }
      this.userInfo.user = sessionStorage.getItem("user")
      this.userInfo.url = sessionStorage.getItem("img")
    },
    methods:{
      cut(){
        this.style = !this.style
        console.log(this.style)
        this.$emit('leftType',this.style)
      }
    },
    watch:{
      
    }
  }
</script>
<style lang='less' scoped>
  @import '../assets/less/variable.less';
  .header {
    background-color: #ffffff;
    position: absolute;
    box-sizing: border-box;
    height: 60px;
    left: 0;
    top: 0;
    right: 0;
    font-size: 22px;
    color: #fff;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    border-bottom: 1px solid #e4e2e2;
    .user{
      width: 220px;
      height: 58px;
      float: left;
      background-color: @color-nav-bg;
      box-sizing: content-box;
      border-bottom: 2px solid  @color-nav-bg*0.7;
      span{
        display: inline-block;
      }
      .active{
            width: 40px;
            height: 40px;
            border: solid 3px #d1d4dd;
            border-radius: 10px;
            margin-left: 8px;
            vertical-align: middle;
            margin-top: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .name{
        width: 120px;
        height: 9px;
        font-family: MicrosoftYaHei;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #b5b5b5;
        margin-left: 5px;
        vertical-align: middle;
      }
      .more{
          width: 16px;
          height: 16px;
          color: #ffffff;
          font-size: 30px;
          display: inline-block;
          vertical-align: middle;
          color: #b5b5b5;
          cursor: pointer;
      }
    }
    .collapse-btn{
      width: 64px;
      position: fixed;
      left: 220px;
      height: 61px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      font-size: 25px;
      font-weight: 600;
      .icon-font {
        font-size: 32px;;
      }
    }
    .header-title{
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #666;
    position: fixed;
    top: 0;
    z-index: 1200;
    left: 284px;
    }
    }
</style>
