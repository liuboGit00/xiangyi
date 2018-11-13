<template>
  <div class="page" v-cloak>
      <div class="formSelectGroup">
        <div class="form-radio">
          <el-radio v-model="radio" label="1">模糊匹配</el-radio>
          <el-radio v-model="radio" label="0">精准匹配</el-radio>
        </div>
        <div class="form-input">
           <el-input v-model="nameshuqian" placeholder="请输入数签名"></el-input>
           <el-button type="primary" @click="onDetails">进入数签</el-button>
        </div>
      </div>
      <div class="container LH">
        <el-carousel trigger="click" height="450px" :autoplay="false" indicator-position="outside" v-if="showSolid">
          <el-carousel-item v-for="(item,index) in allData" :key="index">
            <div class="slider" v-for="itemInfo in item" :key="itemInfo.typeId" @click="signList(itemInfo.typeId)" >
              <div class="title">{{itemInfo.typeName}}</div>
              <div class="lists"><span class="slider-number">{{itemInfo.tagCount}}</span><span class="slider-remark">个数签</span></div>
              <div class="lists"><span class="slider-number">{{itemInfo.tagUpdateCount}}</span><span class="slider-remark">次编辑</span></div>
              <div class="lists"><span class="slider-number">{{itemInfo.tagUserCount}}</span><span class="slider-remark">人编写</span></div>
              <div class="lists end"><span class="slider-number">{{itemInfo.tagColumnRowsAmount == null ? 0 : itemInfo.tagColumnRowsAmount}}</span><span class="slider-remark">条数据</span></div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="right-shuqian">
          <div class="title">象翌数签</div>
          <div class="small-title">让数据平等地被世界认知</div>
          <div class="list">
            <i class="el-icon-tickets"></i><span>{{allDataSizes.tagCount}}</span><span>个数签</span>
          </div>
          <div class="list">
            <i class="el-icon-edit-outline"></i><span>{{allDataSizes.tagUpdateCount}}</span><span>次编辑</span>
          </div>
          <div class="list">
            <i class="iconfont icon-renyuanguanli"></i><span>{{allDataSizes.tagUserCount}}</span><span>人编写</span>
          </div>
          <div class="btn"><el-button type="primary" @click="setSign">创建数签</el-button></div>
        </div>
      </div>
      <daLog :dialogobj="dialogobj"></daLog>
  </div>
</template>

<script>
import daLog from '../../components/dialogcomponent.vue'
import server from "./server.js"
export default {
  data() {
    return {
      radio: "1",
      nameshuqian: "",
      total:0,
      allData:[], //轮播总数据
      allDataSizes:{}, //轮播总数据
      dialogVisible:false,
      showSolid:false,
      dialogobj:{   //dalog弹窗数据
        searchData : '',
        dialogVisible:false,
        type:"",
        button:{
            ok:'',
            no:''
        }
      }
    };
  },
  created(){
    let _self = this
    //右侧总数据
    server.getAllData(function(data){
      _self.tool.close();
      let _data = data.data
      if(_data.infoCode == '0'){
        _self.allDataSizes = _data.data
      }
    })


     //左侧数据列表
    server.getAllDataList(function(res){
      _self.tool.close();
      let _data = res.data
      let newDataArr = []
      if(_data.infoCode == '0'){
        let pages = Math.ceil(parseInt(_data.data.total) / 3)
        for(let i = 0;i < pages;i ++){
          let num = parseInt(i) * 3
          let dataList = _data.data.list.slice(num,num+3)
          var newArr = []
          for(let n of dataList){
            newArr.push(n)
          }
          _self.allData[i] = newArr
        }
        _self.showSolid = true
      }
      // let allDataPages = Math.ceil(parseInt(newDataArr.length) / 10)
      // for(let m = 0;m < allDataPages;m ++){
      //   let allNum = parseInt(m) * 10
      //   _self.allData[m] = newDataArr.slice(allNum,allNum+10)
      // }
      // console.log(_self.allData,newDataArr)
    })
    
  },
  components: {
    daLog
  },
  mounted() {
    //全部数据
    let _self = this
    console.log(this.allData)
  },
  computed: {
    newArr(newData,old){
      this.newArr = newData
    }
  },
  methods: {
    //手动切换轮播下一页
    submitshow: function(message) {
      //列表查询条件提交
      // this.pagepation = {
      //   //翻页重置
      //   pageNum: 1,
      //   pageSize: 15
      // },
      // this.ajaxshow(messages);
    },
    //signList列表页面
    signList(id){
      this.$router.push({
        path:'/signList',
        query: { typeId: id }
      })
    },
    //搜索详情页
    onDetails(){
      if(!this.nameshuqian){
        return
      }
      let _self = this
      let sendData = 'tagName='+this.nameshuqian+'&isLikeQuery='+this.radio
      server.searchData(sendData,function(res){
        _self.tool.close();
        let _data = res.data
        if(_data.infoCode == '0'){
          if(_data.data.list.length == 0){
            _self.dialogobj = {
              searchData : _self.nameshuqian,
              dialogVisible:true,
              type:"set",
              button:{
                  "ok":"创建",
                  "no":"取消"
              }
            }
          }else{
            _self.$router.push({
              path:'/signDetails',
              query: { 
                tagName: _self.nameshuqian,
                isLikeQuery:_self.radio
              }
            })
          }
        }
      })
    },
    //关闭dalog弹窗
    handleClose(done){
      done();
    },
    //创建数签
    setSign(){
      // console.log('https://test-wl008.weilian.cn/front-data-menu-center/#/Numbersign-create?sessionId='+sessionStorage.getItem("testUserSessions"))
      window.location.href = 'https://test-wl008.weilian.cn/front-data-tag-center/#/Numbersign-create?sessionId='+sessionStorage.getItem("testUserSessions")
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variable.less";
[v-cloak] {
  display: none;
}
.page {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #f4f6f9;
}
.container {
  width: @width-container;
  margin: 0 auto;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 40px;
  .right-shuqian {
    width: 255px;
    height: 427px;
    background-color: #ffffff;
    box-shadow: 0px 0px 6px 1px rgba(41, 41, 41, 0.02);
    border-radius: 10px 10px 20px 20px;
    text-align: center;
    overflow: hidden;
    // display: inline-block;
    vertical-align: top;
    margin-right: 40px;
    float: right;
    .title {
      line-height: 27px;
      height: 27px;
      font-family: MicrosoftYaHei;
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #4c65a4;
      margin-top: 25px;
      margin-bottom: 10px;
    }
    .small-title {
      line-height: 19px;
      height: 19px;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #4c65a4;
      opacity: 0.8;
      margin-bottom: 50px;
    }
    .list {
      padding: 0 20px;
      clear: both;
      margin-bottom: 45px;
      height: 30px;
      line-height: 30px;
      i {
        font-size: 24px;
        display: inline-block;
      }
      span:nth-child(2) {
        height: 24px;
        line-height: 24px;
        font-family: MicrosoftYaHei;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        display: inline-block;
        width: 63%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span:nth-child(3) {
        font-family: MicrosoftYaHei;
        font-size: 18px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #666666;
        display: inline-block;
      }
    }
    .btn {
      button {
        margin-top: 15px;
        width: 108px;
        height: 42px;
        background-color: #278df6;
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
        border-radius: 6px;

        font-family: PingFangSC-Regular;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fefefe;
      }
    }
  }
}
.slider:last-child{
  margin-right:0px;
}
.slider {
  height: 405px;
  width: 230px;
  box-shadow: 0px 0px 9px 1px #8c8c8c;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  margin-right:10px;
  cursor: pointer;
  .title {
    height: 80px;
    background-color: #4c65a4;
    border-radius: 10px 10px 0px 0px;
    opacity: 0.9;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 80px;
    font-family: PingFangSC-Medium;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .lists {
    height: 80px;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
    padding: 0 39px 0 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .slider-number {
      flex: 1;
      display: inline-block;
      font-family: MicrosoftYaHei;
      font-size: 26px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #278df6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
    .slider-remark {
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #666666;
    }
  }
  .lists.end {
    height: 86px;
  }
}
.formSelectGroup {
  height: @height-formselectgroup;
  display: flex;
  align-items: center;
  background-color: #4c65a4;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 12.84%;
  justify-content: center;
  .el-radio {
    color: #fff;
  }
  .form-input {
    display: flex;
    flex-direction: row;
    .el-input {
      width: 520px;
      height: 42px;
    }
    button {
      width: 108px;
      height: 42px;
      margin-left: 30px;
    }
  }
  .form-radio {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
  }
}
</style>
<style lang="less">
.formSelectGroup .el-input__inner {
  height: 42px;
  line-height: 42px;
}
.LH{
  .el-carousel {
    width: 800px !important;
    display: inline-block;
    vertical-align: top;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
    .el-carousel__arrow--left{
      background: none;
      left: -0;
    }
    .el-carousel__arrow--right{
      background: none;
      right: 0;
    }
    .el-carousel__arrow--left:hover,.el-carousel__arrow--right:hover{
      background: none;
    }
    .el-icon-arrow-left,.el-icon-arrow-right{
      font-size: 34px;
      color: #999;
    }
    .el-carousel__button{
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #000 !important;
      opacity: 0.3!important;
    }
    .el-carousel__indicator.is-active button{
      background: #4c65a4 !important;
      opacity: 1 !important;
    }
    .el-carousel__item{
      text-align: left;
      padding: 0 45px;
    }
  }
}
</style>

