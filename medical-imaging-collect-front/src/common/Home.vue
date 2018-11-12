<template>
  <div class="wrapper">
    <v-head @leftType="userList" :title="titleInfo"></v-head>
    <v-sidebar v-if="nowrap" :power='this.power' @title="newData"></v-sidebar>
    <v-user v-if="!nowrap"></v-user>
    <div class="content-box">
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view @showType="showChildMsg" :menu="this.menu" :load="loadType"  :delType="delType" @imgbolg="imgBox"></router-view>
        </transition>
      </div>
    </div>
    <errModel :type="type" @load="loadData" @delvideo="del"></errModel>
    <div class="contant">
      <div class="imgContant">
        <img src="" alt="" ref="imgbox">
        <i @click="imgHide"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios/axios'
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vUser from "./user.vue";
import errModel from './errModel.vue';
import jquery from 'jquery'

export default {
  props:["leftShow"],
  data() {
    return {
      nowrap: true,
      type:'',
      power:[],
      menu:[],
      loadType:'',
      num : 0,
      titleInfo:'',
      delType:''
    };
  },
  mounted() {
    
  },
  components: {
    vHead,
    vSidebar,
    errModel,
    vUser
  },
  created() {
    this.axiosGet('/medical-imaging-collect/menu','power')
  },
  computed: {},
  watch:{
    leftType(){
      this.nowrap = this.leftType
    }
  },
  methods:{
    imgHide(){
      jquery(".contant").hide()
    },
    imgBox(a){
      console.log(a,jquery(".contant"))
      jquery(".contant img").attr("src",a)
      jquery(".contant").show()
    },
    del(a){
      console.log(a)
      this.delType = a
    },
    newData(a){
      this.titleInfo = a
    },
    loadData(a){
      this.num ++
      this.loadType = a + this.num
    },
    userList(a){
      console.log(a)
      this.nowrap = a
    },
    //1 代表查看  2 代表
    showChildMsg(a,b,c){
      this.type = {
        type:a,
        label:b,
        id:c
      }
      console.log(this.type)
    },
    axiosGet(url,info){
      let _this = this
      axios.get(url).then((res)=>{
        if(res.data.infoCode == '0'){
          if(info == 'power'){
            _this.power = res.data.data
          }else if(info == 'menu'){
            _this.menu = res.data.data
          }
        }else{
         this.$router.push({path:"/Login"})
        }
      })
    },
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/variable.less";
.content-box {
  position: absolute;
  left: 220px;
  right: 0;
  top: 60px;
  bottom: 0;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #fff;
  overflow-y: auto; 
  .content {
    box-sizing: border-box;
    width: auto;
    height: 100%;
    // height: calc(~"100vh - 80px");
    // padding: 30px 40px;
  }
}
.contant{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: none;
  position: relative;
  z-index: 1221;
  .imgContant{
    width: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
      width: 100%;
      max-height: 100%;
    }
    i{
      width: 25px;
      height: 25px;
      display: inline-block;
      background: url(../assets/img/homeErr.png) no-repeat;
      background-size:25px 25px; 
      position: absolute;
      top: 0;
      right: 0px;
      cursor: pointer;
    }
  }
}

.content-collapse {
  left: 65px;
}
.content-box-nowrap {
  left: 0;
  top: 0;
  .content {
    height: 100%;
  }
}

</style>
