<template>
  <div class="page" v-cloak>
      <div class="formSelectGroup">
        <div class="form-input">
           <el-input v-model="searchData" placeholder="请输入数签名"></el-input>
           <el-button type="primary" @click="search" >搜索</el-button>
        </div>
      </div>
      <div class="container">
        <!-- <span class="left"></span> -->
        <div class="content">
            <div class="contentPage" v-for="(item,index) in items" :key="index">
                <img :src="pag" alt="">
                <h3 @click='storeId(item)'>{{item.tagName}}</h3>
                <strong :title="item.typeName">{{ item.typeName }}</strong>
                <el-tooltip class="item" effect="dark" content="取消收藏" placement="top-start">
                     <img src="../../assets/img/xingTrue.png" alt="" @click="collect(item)" v-show="item.isFavorite == 1">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="收藏" placement="top-start">
                    <img src="../../assets/img/xingFalse.png" alt="" @click="collect(item)" v-show="item.isFavorite == 0">
                </el-tooltip>                     
            </div>
        </div>
      </div>
      <div class="fenye">
        <div class='numli'>
            <!-- <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="16"
                @current-change="pages"
                prev-text="上一页"
                next-text="下一页" v-show="total">
            </el-pagination> -->
            <paging :pagination="pagination" @pagingState="pagingData" v-show="total"></paging>
        </div>
    </div>
    <daLog :dialogobj="dialogobj"></daLog>
  </div>
</template>

<script>
import daLog from '../../components/dialogcomponent.vue'
import paging from '../../components/paging.vue'
import server from "./server.js"; //本页所有接口内容集合(每个页面单独添加)
import axios from "../../axios/axios.js"

export default {
  data() {
    return {
        list:'',
        searchData:'',//搜索框内容
        total:0,
        items:[],
        options:[],
        dialogobj:{   //dalog弹窗数据
            searchData : '',
            dialogVisible:false,
            type:"",
            button:{
                ok:'',
                no:''
            }
        },
        pag:require('../../assets/img/pag.png'),
        pageNum:1,
        pageSize:16,
        total:0
    };
  },
  created(){
      let param = 'typeId='+this.$route.query.typeId+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize
      this.getListInfo(param)
  },
  computed:{
      pagination:function(){
        let data = {
            size: this.pageSize,
            page: this.pageNum,
            total: this.total
        }
        return data;    //包扣（宽度，标题，showflag）
      }
  },
  components: {
    daLog,
    paging
  },
  mounted() {

  },
  methods: {
      //获取全部数据列表
    getListInfo(data){
      let self = this
      server.signList(data,function(data){
        self.tool.close();
        let DATA = data.data
        if(DATA.infoCode == '1') return
        self.items = DATA.data.list
        self.total = DATA.data.total
      })
    },
    //收藏/取消
    collect(info){
      let self = this
      if(info.isFavorite == 1){
        server.favoritesDel(info.storeId,function(data){
             self.tool.close();
            let DATA = data.data
            if(DATA.infoCode == '0'){
                info.isFavorite = 0
                self.$message({
                    message: '取消收藏成功',
                    type: "success"
                });
            }else{
                self.$message({
                    message: '取消收藏失败',
                    type: "warning"
                });
            }
        })
      }else{
        server.favoritesPost(info.storeId,function(data){
            self.tool.close();
            let DATA = data.data
            if(DATA.infoCode == '0'){
                info.isFavorite = 1
                self.$message({
                    message: '收藏成功',
                    type: "success"
                });
            }else{
                self.$message({
                    message: '收藏失败',
                    type: "warning"
                });
            }
        })
      }
    },
    //搜索
    search(){
      let _self = this
      let sendData = 'tagName='+this.searchData+'&isLikeQuery=1&typeId='+this.$route.query.typeId
      server.signListSearch(sendData,function(res){
        _self.tool.close();
        let _data = res.data
        if(_data.infoCode == '0'){
          if(_data.data.list.length == 0){
            _self.dialogobj = {
                searchData : _self.searchData,
                dialogVisible:true,
                type:"set",
                button:{
                    "ok":'创建',
                    "no":"取消"
                }
            }
          }else{
            _self.$router.push({
              path:'/signDetails',
              query: { 
                tagName : _self.searchData,
                isLikeQuery : 1,
                typeId : _self.$route.query.typeId
              }
            })
          }
        }
      })
    },
    //分页
    // pages(val){
    //   let param = 'typeId='+this.$route.query.typeId+"&pageNum="+val+"&pageSize=16"
    //   this.getListInfo(param)
    // },
    //进入详情页
    storeId(data){
        this.$router.push({
            path:'/signDetails',
            query: {
                storeId: data.storeId,
                typeName: data.typeName
            }
        })
    },
    //分页数据
    pagingData(data){
        console.log(data)
        this.pageNum = data.page
        this.pageSize = data.size
        let param = 'typeId='+this.$route.query.typeId+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize
        this.getListInfo(param)
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variable.less";
@import "../../assets/css/reset.css";
.page {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #f4f6f9;
}
.formSelectGroup {
  height: @height-formselectgroup;
  display: flex;
  align-items: center;
  background-color: #4c65a4;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 11.54%;
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
      font-size: 14px;
    }
    button {
      width: 108px;
      height: 42px;
      color: #fefefe;
      font-size: 18px;
      margin-left: 30px;
    }
  }
  .form-radio {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
  }
}
.container{
    width: @width-container;
    margin: 0 auto;
    text-align: left;
    padding-top: 30px;
    padding-bottom: 40px;
    padding-left: 40px;
    padding-right: 40px;
    .content{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .contentPage{
            width: 514px;
            height: 50px;
            margin-bottom: 11px;
            background-color: #ffffff;     
            border-left: 4px solid #4c65a4;
            line-height: 50px;
            display: flex;
            position: relative;
            img{
                width: 18px;
                height: 19px;        
                // vertical-align: middle;
                margin-left: 14px;
                margin-top: 14px;
                cursor: pointer;
            }      
            h3{
                cursor: pointer;
                font-size: 18px;
                padding-left: 14px;
                width: 240px;
                color: #666666;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                line-height: 50px;
            }    
            p{
                cursor: pointer;
                padding-left: 19px;
                width: 188px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-size: 16px;
                color: #999999;
            } 
            strong{
                width: 99px;
                color: #2f90f3;
                margin-left: 80px;
                font-size: 15px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                cursor: pointer;
            }
        }
        div:nth-child(even){
            margin-left: 18px;
        }
    }
}
</style>
<style lang="less">
.el-select .el-input.is-disabled .el-input__inner{
    color: #278df6 !important;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.fenye{
    width: 1196px;
    height: 16px;
    position: fixed;
    bottom: 82px;
    .numli{
        padding: 16px 40px 0px 40px;
        float: right;
    }
}
</style>