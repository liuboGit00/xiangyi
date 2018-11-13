<template>
  <div class="page" v-cloak @scroll="scroll">
      <div class="formSelectGroup" v-show="titlePages == 1 ? false : true">
        <div class="title">
            <span>{{titleName}}</span>
            <span>（多义词,请在下列义项上选择浏览（共{{titlePages}}个义项））</span>
        </div>
        <div class="list" style='color: #999999'>
            <ul>
                <li v-for="(item,index) in selList" :key="index" :class="{ selcolor:changeRed == index}" @click="pitch(index)" :title="item.tagName">{{item.tagName}}</li>
            </ul>
            <p class="allList" @click="showAllList" v-show="selList.length == 15"><span>展开全部</span><i class="el-icon-arrow-right"></i></p>
            <p class="allList" @click="showAllList" v-show="selList.length > 15"><span>收起全部</span><i class="el-icon-arrow-up"></i></p>
        </div>
      </div>
      <div class="userInfo">
          <p class="title">{{newInfo.tagName}} <span class='typeName'>{{newInfo.typeName}}</span><span @click="editAll(newInfo.storeId)"><i class="el-icon-edit"></i> 编辑</span>
          <span @click="collect">
              <img src="../../assets/img/xingTrue.png" alt=""  v-if="newInfo.isFavorite == 1">
              <img src="../../assets/img/xingFalse.png" alt=""  v-else> 收藏
            </span>
            </p>
          <div class="contant">
              <signInfo v-for="(item,index) in items" :key="index" :userInfo="item"></signInfo>
              <!-- 回到顶部 -->
              <div class="baclTop" @click="backTop" v-show="backTopType">
                 <i class="el-icon-arrow-up"></i>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import signInfo from './signInfo.vue';
import server from './server.js'
export default {
  data() {
    return {
        changeRed: 0,
        items:[{
            title:"",
            edit:true,
            type:'text',
            contant:""
        },{
            title:"数据来源",
            edit:true,
            type:'text',
            contant:""
        },{
            title:"相关业务",
            edit:true,
            type:'text',
            contant:""
        },{
            title:"使用数据",
            edit:false,
            type:'tabel',
            contant:""
        }],
        newInfo:{},
        titlePages:1,
        storeId:'',
        titleName:'',
        selList:[],
        selAllList:[],
        backTopType:false,  //回到顶部按钮
        showList:true,  //显示全部列表,
        collectColor:{
            'color':'red'
        }
    }
  },
  components: {
    signInfo
  },
  mounted() {
    
  },
  created(){
    let _self = this
    console.log(this.$route.query.storeId)
    if(this.$route.query.storeId){  //通过列表页点击进来
        let sendData = this.$route.query.storeId
        server.signInfoId(sendData,function(res){
            _self.tool.close();
            let _data = res.data
            if(_data.infoCode == '0'){
                _self.selAllList.push(_data.data)
            }
            //显示信息
            _self.info(0)
        })
    }else{  //通过首页搜索进来
        var sendData;
        if(!this.$route.query.typeId){
            sendData = 'tagName='+this.$route.query.tagName+'&isLikeQuery='+this.$route.query.isLikeQuery
        }else{
            sendData = 'tagName='+this.$route.query.tagName+'&isLikeQuery=1&typeId='+this.$route.query.typeId
        }
        this.titleName = this.$route.query.tagName
        server.signInfo(sendData,function(res){  
            _self.tool.close();
            let _data = res.data
            if(_data.infoCode == '0'){
                _self.selAllList =  _data.data.list
            }
            //显示是否显示更多
            _self.titlePages = _self.selAllList.length
            if(_self.selAllList.length > 15){
                _self.selList = _self.selAllList.slice(0,15)
            }else{
                _self.selList = _self.selAllList
            }

            //显示信息
            _self.info(0)
        })
    }
  },
  methods: {
    //收藏
    collect(){
      let _self = this 
      if(this.newInfo.isFavorite == 1){
        server.favoritesDel(_self.newInfo.storeId,function(data){
            _self.tool.close();
            let DATA = data.data
            if(DATA.infoCode == '0'){
                _self.newInfo.isFavorite = 0
                _self.selAllList[_self.newInfo.index].isFavorite = 0
                _self.$message({
                    message: '取消收藏成功',
                    type: "success"
                });
            }else{
                _self.$message({
                    message: '取消收藏失败',
                    type: "warning"
                });
            }
        })
      }else{
        server.favoritesPost(_self.newInfo.storeId,function(data){
            _self.tool.close();
            let DATA = data.data
            if(DATA.infoCode == '0'){
                _self.newInfo.isFavorite = 1
                _self.selAllList[_self.newInfo.index].isFavorite = 1
                _self.$message({
                    message: '收藏成功',
                    type: "success"
                });
            }else{
                _self.$message({
                    message: '收藏失败',
                    type: "warning"
                });
            }
        })
      }
    },
    //业务信息
    info(index){
        let a = 0
        if(this.selAllList[index].other && this.selAllList[index].other.indexOf("累死我了") != -1){
            // let newData = '<p data-v-46090f24="" class="catalog"><span data-v-46090f24="" class="left"></span> <span data-v-46090f24="" class="center"><span data-v-46090f24=""><em data-v-46090f24="" contenteditable="true" class="firstTitle">自定义标111题</em></span> <i data-v-46090f24="" class="solid"></i></span> <span data-v-46090f24="" class="right" style="display: none;"><i data-v-46090f24="" class="el-icon-edit"></i>编辑</span></p> <div data-v-46090f24="" class="contantInfo" style=""> <div data-v-46090f24="" class="saveContant" style="display: none;"><p>11111</p></div></div>累死我了'
            let otherData = this.selAllList[index].other.split("累死我了")
            console.log(otherData)
            for(let a in otherData){
                if(a != (parseInt(otherData.length) -1)  ){
                    var d = document.createElement("div")
                    d.innerHTML = otherData[a]
                    this.items.push({
                        title:$(d).find(".firstTitle").html(),
                        edit:true,
                        type:'text',
                        contant:$(d).find(".saveContant").html()
                    })
                }
            }
        }
        for(let i of this.items){
            a ++
            if(i.title == ''){
                i.title = this.selAllList[index].tagName
                i.contant = this.selAllList[index].info
            }else if(i.title == '数据来源'){
                i.contant = this.selAllList[index].source
            }else if(i.title == '相关业务'){
                i.contant = this.selAllList[index].business
            }else if(i.title == '使用数据'){
                i.contant = this.selAllList[index].tagDatabase
            }
            i["index"] = a
            i["storeId"] = this.selAllList[index].storeId
        }
        this.newInfo = this.selAllList[index]
        this.newInfo["index"] = index
    },
    //检测页面滚动
    scroll(){
        if(document.getElementsByClassName("page")[0].scrollTop > 0) {
            this.backTopType = true
        }else{
            this.backTopType = false
        }
    },
      //回到顶部
    backTop(){
        document.getElementsByClassName("page")[0].scrollTop = 0
        this.backTopType = false
    },
    showAllList(){
        this.selList.length == 15 ?  this.selList = this.selAllList : this.selList = this.selAllList.slice(0,15) 
    },
    //显示对应的tagName内容
    pitch(index){
        this.changeRed = index;
        this.info(index)
    },
    editAll(id){
        this.$router.push({
            path:'/edit',
            query: { 
                storeId : id,
                index : 1,
                editAll: 1
            }
        })
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variable.less";
@import "../../assets/css/reset.css";
[v-cloak] {
  display: none;
}
.page {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #f4f6f9;
    position: relative;
}
.selcolor{
    color: #278df6;
}
.formSelectGroup {
    width:@width-container;
    // height: 210px;
    background: #fff;
    box-shadow: 0px 2px 12px 0px rgba(58, 63, 80, 0.11);
	border-radius: 10px;
    margin: 30px auto 0;
    align-items: start;
    justify-content: center;
    .title{
        height: 58px;
        line-height: 58px;
        padding-left: 34px;
        border-bottom: dashed 1px #d1d1d1;
        span:first-child{
            font-size: 24px;
            color: #606060;
        }
        span:last-child{
            font-size: 16px;
            color: #999999;
        }
    }
    .list{
        padding: 25px 50px 10px;
        ul{
            overflow: hidden;
            li{
                width: 160px;
                float: left;
                font-size: 16px;
                // color: #999999;
                line-height: 20px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                margin-right: 50px;
                margin-bottom: 20px;
                cursor: pointer;
            }
            li:before{
                content:" ";
                display: inline-block;
                width: 7px;
                height: 7px;
                background-color: #278df6;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 10px;
            }
            li:nth-child(5n){
                margin-right: 0;
            }
        }
        .allList{
            font-size: 14px;
            text-align: right;
            color: #278df6;
            i{
                font-weight:bold;
                margin-left: 10px;
                font-size: 16px;
            }
            i,span{
                cursor: pointer;
            }
        }
    }
}
.userInfo{
    width:@width-container;
    margin: 30px auto 0;
    padding: 48px 0 30px 0;
    // height: 1236px;
	background-color: #ffffff;
	box-shadow: 0px 2px 12px 0px rgba(58, 63, 80, 0.11);
    border-radius: 10px;
    .title{
        font-family: PingFangSC-Medium;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #606060;
        line-height: 30px;
        padding-left: 50px;
        padding-bottom: 26px;
        border-bottom: dashed 1px #d1d1d1;
        span:nth-child(2),span:nth-child(3){
            display: inline-block;
            width: 56px;
            height: 26px;
            box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            border: solid 1px #278df6;
            font-size: 14px;
            color: #999;
            line-height: 24px;
            text-align: center;
            cursor: pointer;
            vertical-align: middle;
        }
        span:nth-child(2):hover,span:nth-child(3):hover{
            color: #ffffff;
            background: #278df6;
        }
        span:nth-child(3){
            margin-left: 10px;
        }
        .typeName{
            font-size: 22px;
            color:#278df6;
            margin: 0 20px 0 10px;
        }
        img{
            width: 14px;
            height: 14px;
            margin-top: 3px; 
            vertical-align: text-top;
        }
    }
    .contant{
        padding-top: 40px;
    }
    .baclTop{
        width: 58px;
        height: 58px;
        text-align: center;
        background-color: #d5d5d5;
	    border-radius: 2px;
        position: fixed;
        bottom: 88px;
        right: 132px;
        i{
            margin-top: 9px;
            font-size: 40px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
        }
    }
}
</style>


